import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getDrawGame,
  selectBoard,
  getScore,
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
import { getWinner, selectWinner } from '../redux/slices/winnerSlice'

function useTicTacToe() {
  const boardState = useSelector(selectBoard)
  const player = useSelector(selectPlayers)
  const winnerState = useSelector(selectWinner)
  const crossBar = useSelector(selectCrossBars)
  const dispatch = useDispatch()

  let time = Number(boardState.timer)
  let players = ['X', 'O']
  const randomTurn = players[Math.floor(Math.random() * players.length)]

  const [boards, setBoards] = useState(boardState.boards)
  const [firstPlayer, setFirstPlayer] = useState<string>(player.first_player)
  const [secondPlayer, setSecondPlayer] = useState<string>(player.second_player)
  const [timer, setTimer] = useState<string>(boardState.timer)

  const [turn, setTurn] = useState<string>(randomTurn)
  const [timing, setTiming] = useState<number>(time)
  const [winner, setWinner] = useState<string | null>(winnerState.winner)
  const [looser, setLooser] = useState<string>('')
  const [score, setScore] = useState<number>(Number(boardState.score))
  const [isHorizontal, setIsHorizontal] = useState<boolean>(
    crossBar.isHorizontal
  )
  const [isVertical, setIsVertical] = useState<boolean>(crossBar.isVertical)
  const [isDiagonal, setIsDiagonal] = useState<boolean>(crossBar.isDiagonal)
  const [position, setPosition] = useState(crossBar.position)

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
  }

  function horizontalBar() {
    if (boards[0] === 'X' && boards[1] === 'X' && boards[2] === 'X') {
      setIsHorizontal(true)
      dispatch(getHorizontal())
      setPosition('142px')
      dispatch(getPosition('142px'))
    }
    if (boards[3] === 'X' && boards[4] === 'X' && boards[5] === 'X') {
      setIsHorizontal(true)
      dispatch(getHorizontal())
      setPosition('245px')
      dispatch(getPosition('245px'))
    }
    if (boards[6] === 'X' && boards[7] === 'X' && boards[8] === 'X') {
      setIsHorizontal(true)
      dispatch(getHorizontal())
      setPosition('350px')
      dispatch(getPosition('350px'))
    }
    if (boards[0] === 'O' && boards[1] === 'O' && boards[2] === 'O') {
      setIsHorizontal(true)
      dispatch(getHorizontal())
      setPosition('142px')
      dispatch(getPosition('142px'))
    }
    if (boards[3] === 'O' && boards[4] === 'O' && boards[5] === 'O') {
      setIsHorizontal(true)
      dispatch(getHorizontal())
      setPosition('245px')
      dispatch(getPosition('245px'))
    }
    if (boards[6] === 'O' && boards[7] === 'O' && boards[8] === 'O') {
      setIsHorizontal(true)
      dispatch(getHorizontal())
      setPosition('350px')
      dispatch(getPosition('350px'))
    }
  }

  function verticalBar() {
    if (boards[0] === 'X' && boards[3] === 'X' && boards[6] === 'X') {
      setIsVertical(true)
      dispatch(getVertical())
      setPosition('16%')
      dispatch(getPosition('16%'))
    }
    if (boards[1] === 'X' && boards[4] === 'X' && boards[7] === 'X') {
      setIsVertical(true)
      dispatch(getVertical())
      setPosition('50%')
      dispatch(getPosition('50%'))
    }
    if (boards[2] === 'X' && boards[5] === 'X' && boards[8] === 'X') {
      setIsVertical(true)
      dispatch(getVertical())
      setPosition('84%')
      dispatch(getPosition('84%'))
    }
    if (boards[0] === 'O' && boards[3] === 'O' && boards[6] === 'O') {
      setIsVertical(true)
      dispatch(getVertical())
      setPosition('16%')
      dispatch(getPosition('18%'))
    }
    if (boards[1] === 'O' && boards[4] === 'O' && boards[7] === 'O') {
      setIsVertical(true)
      dispatch(getVertical())
      setPosition('50%')
      dispatch(getPosition('50%'))
    }
    if (boards[2] === 'O' && boards[5] === 'O' && boards[8] === 'O') {
      setIsVertical(true)
      dispatch(getVertical())
      setPosition('84%')
      dispatch(getPosition('84%'))
    }
  }

  function diagonalBar() {
    if (boards[0] === 'X' && boards[4] === 'X' && boards[8] === 'X') {
      setIsDiagonal(true)
      dispatch(getDiagonal())
      setPosition('-45deg')
      dispatch(getPosition('-45deg'))
    }
    if (boards[2] === 'X' && boards[4] === 'X' && boards[6] === 'X') {
      setIsDiagonal(true)
      dispatch(getDiagonal())
      setPosition('45deg')
      dispatch(getPosition('45deg'))
    }
    if (boards[0] === 'O' && boards[4] === 'O' && boards[8] === 'O') {
      setIsDiagonal(true)
      dispatch(getDiagonal())
      setPosition('-45deg')
      dispatch(getPosition('-45deg'))
    }
    if (boards[2] === 'O' && boards[4] === 'O' && boards[6] === 'O') {
      setIsDiagonal(true)
      dispatch(getDiagonal())
      setPosition('45deg')
      dispatch(getPosition('45deg'))
    }
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
    horizontalBar()
    verticalBar()
    diagonalBar()

    return () => {
      clearInterval(myInterval)
    }
  }, [boards, turn, timing, winner, player.first_player, player.second_player])

  function handleRestartButton(heading: string) {
    let title = heading
    dispatch(setStartGame())
    dispatch(getTimer(timing.toString()))
    dispatch(getBoards(Array(9).fill('')))
    dispatch(getButtonLabel('Play again'))
    dispatch(getScore(score.toString()))
    setBoards(Array(9).fill(''))
    setWinner('')
    setTiming(time)
    title = `${
      turn === 'X' ? player.first_player : player.second_player
    }'s turn`
  }

  const handleStartButton = (event: any) => {
    event.preventDefault()
    timer === '0' && setTimer('5')
    firstPlayer === '' && setFirstPlayer('O')
    secondPlayer === '' && setSecondPlayer('X')
    dispatch(getFirstPlayers(firstPlayer))
    dispatch(getSecondPlayer(secondPlayer))
    dispatch(getTimer(timer === '0' ? '5' : timer))
    setTimeout(() => {
      dispatch(setStartGame())
    }, 1000)
  }

  const handleRebootBtn = () => {
    setFirstPlayer('')
    setSecondPlayer('')
    setTimer('0')
    dispatch(getButtonLabel('Start'))
    dispatch(getScore('0'))
  }

  return {
    boardState,
    player,
    crossBar,
    position,
    boards,
    winner,
    timing,
    turn,
    looser,
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
    handleRebootBtn,
  }
}

export default useTicTacToe
