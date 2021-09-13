import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Squares from '../components/Square/Squares'
import { useSelector, useDispatch } from 'react-redux'
import {
  getDrawGame,
  getWinner,
  selectBoard,
  getScore,
} from '../redux/slices/boardsSlice'
import Button from '../components/Button/Button'

const Game = () => {
  const boardState = useSelector(selectBoard)
  const dispatch = useDispatch()
  const [boards, setBoards] = useState(boardState.boards)
  let time = Number(boardState.timer)
  let players = ['X', 'O']
  const randomTurn = players[Math.floor(Math.random() * players.length)]
  const [turn, setTurn] = useState<string>(randomTurn)
  const [timing, setTiming] = useState<number>(time)
  const [winner, setWinner] = useState<string>(boardState.winner)
  const [looser, setLooser] = useState<string>('')
  const [score, setScore] = useState<number>(Number(boardState.score))

  function handleClickBoard(
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) {
    let button = event.target as HTMLButtonElement
    if (index < 0 || index > 9) return
    const newBoard = [...boards]
    newBoard.splice(index, 1, turn)
    setBoards(newBoard)
    setTurn(turn === 'X' ? 'O' : 'X')
    setTiming(time)
  }

  let heading = `${
    turn === 'X' ? boardState.first_player : boardState.second_player
  }'s turn`

  if (winner) {
    heading = `${winner} won the game`
  }

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (time > 0) {
        setTiming((prevTime) => {
          return prevTime >= 0 ? prevTime - 1 : 0
        })
      }
    }, 1000)

    if (timing <= 0) {
      dispatch(getDrawGame())
    }

    let winningPositionsIndex = 0
    let winner: string | null = null
    while (winningPositionsIndex < boardState.winPosition.length && !winner) {
      const boardPositionsToCheck =
        boardState.winPosition[winningPositionsIndex]
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
      setWinner(
        winner === 'X' ? boardState.first_player : boardState.second_player
      )
      dispatch(getWinner(winner))
      setScore((prevNum) => prevNum + 1)
      dispatch(getScore(score.toString()))
    }

    return () => {
      clearInterval(myInterval)
    }
  }, [boards, turn, timing, winner])

  function handleRestartButton() {
    setBoards(Array(9).fill(''))
    setWinner('')
    setTiming(time)
    heading = `${
      turn === 'X' ? boardState.first_player : boardState.second_player
    }'s turn`
  }

  console.log(boardState.score)

  return (
    <Gaming>
      <h4>
        {heading} <span>{score === 0 ? '' : score}</span>
      </h4>
      <Squares handleClick={handleClickBoard} boards={boards} />
      {winner ? (
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
