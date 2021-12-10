import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getDrawGame,
  selectBoard,
  getBoards,
  setStartGame,
  getTimer,
} from '../redux/slices/boardsSlice'
import {
  getDiagonal,
  getHorizontal,
  getPosition,
  getVertical,
  selectCrossBars,
} from '../redux/slices/crossBarSlice'
import {
  getButtonLabel,
  getFirstPlayers,
  getSecondPlayer,
  selectPlayers,
} from '../redux/slices/playersSlice'
import {
  getFirstPlayerScore,
  getSecondPlayerScore,
  getWinner,
  selectWinner,
} from '../redux/slices/winnerSlice'
import { horizontalLine, verticalLine, diagonalLine } from './lines';

function useTicTacToe() {
  // Getting data from redux selector
  const boardState = useSelector(selectBoard)
  const player = useSelector(selectPlayers)
  const winnerState = useSelector(selectWinner)
  const crossBar = useSelector(selectCrossBars)
  const dispatch = useDispatch()

  let time = Number(boardState.timer)
  let players = ['X', 'O']
  const randomTurn = players[Math.floor(Math.random() * players.length)]
 
  const [isBoardFilled, setIsBoardFilled] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  // Boards state
  const [boards, setBoards] = useState(boardState.boards)
  
  // Players State
  const [firstPlayer, setFirstPlayer] = useState<string>(player.first_player)
  const [secondPlayer, setSecondPlayer] = useState<string>(player.second_player)
  
  // Turn State
  const [timer, setTimer] = useState<string>(boardState.timer)
  const [turn, setTurn] = useState<string>(randomTurn)
  
  // Timing start
  const [timing, setTiming] = useState<number>(time)
  
  // Winner and draw State
  const [winner, setWinner] = useState<string | null>(winnerState.winner)
  const [isDraw, setIsDraw] = useState<boolean>(boardState.drawGame)
  
  // Players Score State
  const [firstPlayerScore, setFirstPlayerScore] = useState<number>(
    winnerState.firstPlayerScore
  )
  const [secondPlayerScore, setSecondPlayerScore] = useState<number>(
    winnerState.secondPlayerScore
  )

  // Position State
  const [isHorizontal, setIsHorizontal] = useState<boolean>(
    crossBar.isHorizontal
  )
  const [isVertical, setIsVertical] = useState<boolean>(crossBar.isVertical)
  const [isDiagonal, setIsDiagonal] = useState<boolean>(crossBar.isDiagonal)
  const [position, setPosition] = useState(crossBar.position)

  // Handle click on Start button
  const handleStartButton = (event: React.FormEvent) => {
    event.preventDefault()
    timer === '0' && setTimer('5')
    firstPlayer === '' && setFirstPlayer('X')
    secondPlayer === '' && setSecondPlayer('O')
    dispatch(getFirstPlayers(firstPlayer === '' ? 'X' : firstPlayer))
    dispatch(getSecondPlayer(secondPlayer === '' ? 'O' : secondPlayer))
    dispatch(getTimer(timer === '0' ? '5' : timer))
    setTimeout(() => {
      dispatch(setStartGame())
    }, 1000)
  }

  // Handle click on each square
  function handleClickBoard(
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) {
    if (index < 0 || index > 9 || winner) return
    let newBoard = [...boards]
    newBoard.splice(index, 1, turn)
    setBoards(newBoard)
    dispatch(getBoards(newBoard))
    setTurn(turn === 'X' ? 'O' : 'X')
    setTiming(time)
    return event.currentTarget.disabled = true

  }

  // A function that checks whether the squares are filled or not
  function isSquaresFilled(squares: string[]) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === '') {
        return false
      }
    }
    return true
  }

  // Check the winner
  function winningFunc() {
    let winningPositionsIndex = 0
    let winner: string | null = ''

    while (winningPositionsIndex < winnerState.winPosition.length && !winner) {
      const boardPositionsToCheck =
        winnerState.winPosition[winningPositionsIndex]
      const boardValuesToCheck = boardPositionsToCheck.map(
        (index) => boards[index]
      )

      const checkingValue = boardValuesToCheck[0]
      let isFinished = boardValuesToCheck.every(
        (value) => value === checkingValue && checkingValue
      )

      winner = !isFinished ? null : checkingValue
      winningPositionsIndex++
    }

    if (winner) {
      setWinner(winner === 'X' ? player.first_player : player.second_player)
      dispatch(getWinner(winner))
      setIsDisabled(true)
    }
  }

  // A function for lines
  function setLinePosition(position: string, lineType: any, getLineType: any) {
    lineType(true)
    dispatch(getLineType(true))
    setPosition(position)
    dispatch(getPosition(position))
  }

  // Set Lines
  const horizontal = (positionValue: string) => setLinePosition(positionValue, setIsHorizontal, getHorizontal)
  const vertical = (positionValue: string) => setLinePosition(positionValue, setIsVertical, getVertical)
  const diagonal = (positionValue: string) => setLinePosition(positionValue, setIsDiagonal, getDiagonal)
  
  // Check if the game is draw
  function drawGame() {
    const squares = isSquaresFilled(boards)
    
    if (squares && winner === '') {
      setIsBoardFilled(true)
      setIsDraw(true)
      dispatch(getDrawGame())
      setWinner('No winner')
      setIsDisabled(true)
    }
  }

  // Handle restart button to go back to home page
  function handleRestartButton(heading: string) {
    dispatch(setStartGame())

    setBoards(Array(9).fill(''))
    dispatch(getBoards(Array(9).fill('')))
    dispatch(getButtonLabel('Play again'))

    setWinner('')
    dispatch(getWinner(''))

    setIsHorizontal(false)
    setIsVertical(false)
    setIsDiagonal(false)
    dispatch(getHorizontal(false))
    dispatch(getVertical(false))
    dispatch(getDiagonal(false))

    setTiming(time)
    heading = `${
      turn === 'X' ? player.first_player : player.second_player
    }'s turn`
    dispatch(getTimer(timing.toString()))

    if (winner === 'X') {
      setFirstPlayerScore((score) => score + 1)
      dispatch(getFirstPlayerScore(firstPlayerScore))
    }
    if (winner === 'O') {
      setSecondPlayerScore((score) => score + 1)
      dispatch(getSecondPlayerScore(secondPlayerScore))
    }
  }

  // Handle reboot button
  const handleRebootBtn = () => {
    setFirstPlayer('')
    setSecondPlayer('')
    setTimer('0')
    dispatch(getButtonLabel('Start'))
  }

  // UeEffect
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (time > 0) {
        setTiming((prevTime) => {
          return prevTime >= 0 ? prevTime - 1 : 0
        })
      }
    }, 1000)

    if (timing <= 0) {
      setIsDisabled(true)
    }

    winningFunc()
    horizontalLine(boards, horizontal)
    verticalLine(boards, vertical)
    diagonalLine(boards, diagonal)
    drawGame()

    return () => {
      clearInterval(myInterval)
    }
    // eslint-disable-next-line
  }, [
    boards,
    turn,
    timing,
    winner,
    firstPlayerScore,
    secondPlayerScore,
    player.first_player,
    player.second_player,
    isHorizontal,
    isDiagonal,
    isVertical,
  ])
  
  return {
    isDisabled,
    boardState,
    player,
    crossBar,
    position,
    boards,
    winner,
    winnerState,
    timing,
    isBoardFilled,
    isDraw,
    turn,
    firstPlayer,
    setFirstPlayer,
    secondPlayer,
    firstPlayerScore,
    secondPlayerScore,
    timer,
    setTimer,
    setSecondPlayer,
    handleStartButton,
    handleClickBoard,
    handleRestartButton,
    handleRebootBtn,
  }
}

export default useTicTacToe
