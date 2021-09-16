import React, { useRef } from 'react'
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

function useTicTacToe() {
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

  const [boards, setBoards] = useState(boardState.boards)
  const [firstPlayer, setFirstPlayer] = useState<string>(player.first_player)
  const [secondPlayer, setSecondPlayer] = useState<string>(player.second_player)
  const [timer, setTimer] = useState<string>(boardState.timer)

  const [turn, setTurn] = useState<string>(randomTurn)
  const [timing, setTiming] = useState<number>(time)
  const [winner, setWinner] = useState<string | null>(winnerState.winner)
  const [isDraw, setIsDraw] = useState<boolean>(boardState.drawGame)
  const [firstPlayerScore, setFirstPlayerScore] = useState<number>(
    winnerState.firstPlayerScore
  )
  const [secondPlayerScore, setSecondPlayerScore] = useState<number>(
    winnerState.secondPlayerScore
  )
  const [isHorizontal, setIsHorizontal] = useState<boolean>(
    crossBar.isHorizontal
  )
  const [isVertical, setIsVertical] = useState<boolean>(crossBar.isVertical)
  const [isDiagonal, setIsDiagonal] = useState<boolean>(crossBar.isDiagonal)
  const [position, setPosition] = useState(crossBar.position)

  const handleStartButton = (event: any) => {
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
  }

  function isSquaresFilled(squares: any) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === '') {
        return false
      }
    }
    return true
  }

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

  function horizontalLine() {
    if (boards[0] === 'X' && boards[1] === 'X' && boards[2] === 'X') {
      setIsHorizontal(true)
      dispatch(getHorizontal(true))
      setPosition('142px')
      dispatch(getPosition('142px'))
    } else if (boards[3] === 'X' && boards[4] === 'X' && boards[5] === 'X') {
      setIsHorizontal(true)
      dispatch(getHorizontal(true))
      setPosition('245px')
      dispatch(getPosition('245px'))
    } else if (boards[6] === 'X' && boards[7] === 'X' && boards[8] === 'X') {
      setIsHorizontal(true)
      dispatch(getHorizontal(true))
      setPosition('350px')
      dispatch(getPosition('350px'))
    } else if (boards[0] === 'O' && boards[1] === 'O' && boards[2] === 'O') {
      setIsHorizontal(true)
      dispatch(getHorizontal(true))
      setPosition('142px')
      dispatch(getPosition('142px'))
    } else if (boards[3] === 'O' && boards[4] === 'O' && boards[5] === 'O') {
      setIsHorizontal(true)
      dispatch(getHorizontal(true))
      setPosition('245px')
      dispatch(getPosition('245px'))
    } else if (boards[6] === 'O' && boards[7] === 'O' && boards[8] === 'O') {
      setIsHorizontal(true)
      dispatch(getHorizontal(true))
      setPosition('350px')
      dispatch(getPosition('350px'))
    }
  }

  function verticalLine() {
    if (boards[0] === 'X' && boards[3] === 'X' && boards[6] === 'X') {
      setIsVertical(true)
      dispatch(getVertical(true))
      setPosition('16%')
      dispatch(getPosition('16%'))
    } else if (boards[1] === 'X' && boards[4] === 'X' && boards[7] === 'X') {
      setIsVertical(true)
      dispatch(getVertical(true))
      setPosition('50%')
      dispatch(getPosition('50%'))
    } else if (boards[2] === 'X' && boards[5] === 'X' && boards[8] === 'X') {
      setIsVertical(true)
      dispatch(getVertical(true))
      setPosition('84%')
      dispatch(getPosition('84%'))
    } else if (boards[0] === 'O' && boards[3] === 'O' && boards[6] === 'O') {
      setIsVertical(true)
      dispatch(getVertical(true))
      setPosition('16%')
      dispatch(getPosition('18%'))
    } else if (boards[1] === 'O' && boards[4] === 'O' && boards[7] === 'O') {
      setIsVertical(true)
      dispatch(getVertical(true))
      setPosition('50%')
      dispatch(getPosition('50%'))
    } else if (boards[2] === 'O' && boards[5] === 'O' && boards[8] === 'O') {
      setIsVertical(true)
      dispatch(getVertical(true))
      setPosition('84%')
      dispatch(getPosition('84%'))
    }
  }

  function drawGame() {
    const squares = isSquaresFilled(boards)
    if (squares) {
      setIsBoardFilled(true)
      setIsDraw(true)
      dispatch(getDrawGame())
      setWinner('No winner')
      setIsDisabled(true)
    }
  }

  function diagonalLine() {
    if (boards[0] === 'X' && boards[4] === 'X' && boards[8] === 'X') {
      setIsDiagonal(true)
      dispatch(getDiagonal(true))
      setPosition('-45deg')
      dispatch(getPosition('-45deg'))
    } else if (boards[2] === 'X' && boards[4] === 'X' && boards[6] === 'X') {
      setIsDiagonal(true)
      dispatch(getDiagonal(true))
      setPosition('45deg')
      dispatch(getPosition('45deg'))
    } else if (boards[0] === 'O' && boards[4] === 'O' && boards[8] === 'O') {
      setIsDiagonal(true)
      dispatch(getDiagonal(true))
      setPosition('-45deg')
      dispatch(getPosition('-45deg'))
    } else if (boards[2] === 'O' && boards[4] === 'O' && boards[6] === 'O') {
      setIsDiagonal(true)
      dispatch(getDiagonal(true))
      setPosition('45deg')
      dispatch(getPosition('45deg'))
    }
  }

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

  const handleRebootBtn = () => {
    setFirstPlayer('')
    setSecondPlayer('')
    setTimer('0')
    dispatch(getButtonLabel('Start'))
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
      setIsDisabled(true)
    }

    winningFunc()
    horizontalLine()
    verticalLine()
    diagonalLine()
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
