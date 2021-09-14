import React, { Fragment, useState } from 'react'
import Input from '../components/Input/Input'
import roundIcon from '../icons/round.svg'
import crossIcon from '../icons/cross.svg'
import Timer from '../components/Timer/Timer'
import Button from '../components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import {
  getScore,
  getTimer,
  selectBoard,
  setStartGame,
} from '../redux/slices/boardsSlice'
import {
  getButtonLabel,
  getFirstPlayers,
  getSecondPlayer,
  selectPlayers,
} from '../redux/slices/playersSlice'
import Game from './Game'

function Home() {
  const boardSelector = useSelector(selectBoard)
  const player = useSelector(selectPlayers)
  const dispatch = useDispatch()

  const [firstPlayer, setFirstPlayer] = useState<string>(player.first_player)
  const [secondPlayer, setSecondPlayer] = useState<string>(player.second_player)
  const [timer, setTimer] = useState<string>('0')

  const handleStartButton = (event: any) => {
    event.preventDefault()
    firstPlayer === '' && setFirstPlayer('O')
    secondPlayer === '' && setSecondPlayer('X')
    timer === '0' && setTimer('5')
    dispatch(getFirstPlayers(firstPlayer))
    dispatch(getSecondPlayer(secondPlayer))
    dispatch(getTimer(timer))
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

  return (
    <Fragment>
      {!boardSelector.isStart ? (
        <>
          <form onSubmit={handleStartButton}>
            <Input
              score={boardSelector.score}
              iconSrc={roundIcon}
              alt={'Round'}
              value={firstPlayer}
              placeholder={'Leave empty to use AI or enter player name'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFirstPlayer(e.target.value)
              }
            />
            <Input
              score={boardSelector.score}
              iconSrc={crossIcon}
              value={secondPlayer}
              placeholder={'Leave empty to use AI or enter player name'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSecondPlayer(e.target.value)
              }
            />
            <Timer
              value={timer}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTimer(e.target.value)
              }
            />
            <Button label={player.buttonLabel} />
          </form>
          {player.buttonLabel === 'Play again' && (
            <Button label={'Reboot'} onClick={handleRebootBtn} />
          )}
        </>
      ) : (
        <Game />
      )}
    </Fragment>
  )
}

export default Home
