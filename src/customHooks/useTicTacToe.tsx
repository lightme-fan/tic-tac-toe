import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getDrawGame,
  selectBoard,
  getScore,
  getTimer,
  setStartGame,
} from '../redux/slices/boardsSlice'
import { selectPlayers } from '../redux/slices/playersSlice'
import { getWinner, selectWinner } from '../redux/slices/winnerSlice'
import { getFirstPlayers, getSecondPlayer } from '../redux/slices/playersSlice'

function useTicTacToe() {
  const boardState = useSelector(selectBoard)
  const player = useSelector(selectPlayers)
  const winnerState = useSelector(selectWinner)
  const dispatch = useDispatch()

  const [boards, setBoards] = useState(boardState.boards)
  let time = Number(boardState.timer)

  let players = ['X', 'O']
  const randomTurn = players[Math.floor(Math.random() * players.length)]
  const [firstPlayer, setFirstPlayer] = useState<string>('')
  const [secondPlayer, setSecondPlayer] = useState<string>('')

  const [timer, setTimer] = useState<string>('0')
  const [timing, setTiming] = useState<number>(time)

  const [turn, setTurn] = useState<string>(randomTurn)

  const [winner, setWinner] = useState<string>(winnerState.winner)

  const [score, setScore] = useState<number>(Number(boardState.score))
  const [heading, setHeading] = useState<string>(
    `${turn === 'X' ? player.first_player : player.second_player}'s turn`
  )

  const handleStartButton = (event: any) => {
    event.preventDefault()
    dispatch(getFirstPlayers(firstPlayer))
    dispatch(getSecondPlayer(secondPlayer))
    dispatch(getTimer(timer))
    setTimeout(() => {
      dispatch(setStartGame())
    }, 1000)
  }

  function handleClickBoard(
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) {
    if (index < 0 || index > 9) return
    const newBoard = [...boards]
    newBoard.splice(index, 1, turn)
    setBoards(newBoard)
    setTurn(turn === 'X' ? 'O' : 'X')
    setTiming(time)
  }

  if (winner) {
    setHeading(`${winner} won the game`)
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
      setWinner(winner === 'X' ? player.first_player : player.second_player)
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
    setHeading(
      `${turn === 'X' ? player.first_player : player.second_player}'s turn`
    )
  }

  return {
    boardState,
    heading,
    boards,
    winner,
    timing,
    turn,
    score,
    firstPlayer,
    setFirstPlayer,
    secondPlayer,
    timer,
    setTimer,
    setSecondPlayer,
    handleStartButton,
    handleClickBoard,
    handleRestartButton,
  }
}

export default useTicTacToe
