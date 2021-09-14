import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Squares from '../components/Square/Squares'
import { useSelector, useDispatch } from 'react-redux'
import {
  getDrawGame,
  selectBoard,
  getScore,
  getBoards,
  setStartGame,
  getTimer,
} from '../redux/slices/boardsSlice'
import Button from '../components/Button/Button'
import {
  getButtonLabel,
  getFirstPlayers,
  getSecondPlayer,
  selectPlayers,
} from '../redux/slices/playersSlice'
import { getWinner, selectWinner } from '../redux/slices/winnerSlice'
import { start } from 'repl'

const Game = () => {
  const boardState = useSelector(selectBoard)
  const player = useSelector(selectPlayers)
  const winnerState = useSelector(selectWinner)
  const dispatch = useDispatch()

  let time = Number(boardState.timer)
  let players = ['X', 'O']
  const randomTurn = players[Math.floor(Math.random() * players.length)]

  const [boards, setBoards] = useState(boardState.boards)
  const [turn, setTurn] = useState<string>(randomTurn)
  const [timing, setTiming] = useState<number>(time)
  const [winner, setWinner] = useState<string | null>(winnerState.winner)
  const [looser, setLooser] = useState<string>('')
  const [score, setScore] = useState<number>(Number(boardState.score))

  function handleClickBoard(
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) {
    if (index < 0 || index > 9) return
    const newBoard = [...boards]
    newBoard.splice(index, 1, turn)
    setBoards(newBoard)
    dispatch(getBoards(newBoard))
    setTurn(turn === 'X' ? 'O' : 'X')
    setTiming(time)
  }

  function winningFunc() {
    if (timing <= 0) {
      dispatch(getDrawGame())
    }

    let winningPositionsIndex = 0
    let winner: string | null = null

    while (winningPositionsIndex < winnerState.winPosition.length && !winner) {
      const boardPositionsToCheck =
        winnerState.winPosition[winningPositionsIndex]
      const boardValuesToCheck = boardPositionsToCheck.map(
        (index) => boards[index]
      )

      const checkingValue = boardValuesToCheck[0]
      const isFinished = boardValuesToCheck.every(
        (value) => value === checkingValue && checkingValue
      )

      winner = !isFinished ? null : checkingValue
      winningPositionsIndex++
    }

    if (winner) {
      setWinner(winner === 'X' ? player.second_player : player.first_player)
      dispatch(getWinner(winner))
    }
    // setLooser(winner === 'X' ? player.second_player : player.first_player)
  }

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (time > 0) {
        setTiming((prevTime) => {
          return prevTime >= 0 ? prevTime - 1 : 0
        })
      }
    }, 1000)
    winningFunc()
    if (winner) {
      setScore(score + 1)
    }
    return () => {
      clearInterval(myInterval)
    }
  }, [boards, turn, timing, winner, player.first_player, player.second_player])

  let heading = `${
    turn === 'X' ? player.first_player : player.second_player
  }'s turn`
  if (timing <= 0) {
    heading = `Time out - ${looser} won!`
  }
  if (winner) {
    heading = `${winner} won the game`
  }

  function handleRestartButton() {
    dispatch(setStartGame())
    dispatch(getFirstPlayers(player.first_player))
    dispatch(getSecondPlayer(player.second_player))
    dispatch(getTimer(timing.toString()))
    dispatch(getBoards(Array(9).fill('')))
    dispatch(getButtonLabel('Play again'))
    dispatch(getScore(score.toString()))
    setBoards(Array(9).fill(''))
    setWinner('')
    setTiming(time)
    heading = `${
      turn === 'X' ? player.first_player : player.second_player
    }'s turn`
  }

  return (
    <Gaming>
      <h4>
        {heading} <span>{boardState.score === '0' ? '' : score}</span>
      </h4>
      <Squares handleClick={handleClickBoard} boards={boards} />
      {winner || timing <= 0 ? (
        <Button label={'Restart'} onClick={handleRestartButton} />
      ) : (
        <p>Time left: {timing}s</p>
      )}
    </Gaming>
  )
}

const Gaming = styled.div`
  align-self: center;
  display: grid;
  gap: 30px;

  h4,
  p {
    text-align: center;
  }

  img {
    width: 300px;
  }
`

export default Game
