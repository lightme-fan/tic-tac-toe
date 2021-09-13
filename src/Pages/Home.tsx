import React, { Fragment, useState } from 'react'
import Input from '../components/Input/Input'
import roundIcon from '../icons/round.svg'
import crossIcon from '../icons/cross.svg'
import Timer from '../components/Timer/Timer'
import Button from '../components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import {
  getFirstPlayers,
  getSecondPlayer,
  getTimer,
  setStartGame,
  selectBoard,
} from '../redux/slices/boardsSlice'
import Game from './Game'

function Home() {
  const [firstPlayer, setFirstPlayer] = useState<string>('')
  const [secondPlayer, setSecondPlayer] = useState<string>('')
  const [timer, setTimer] = useState<string>('0')

  const boardSelector = useSelector(selectBoard)
  const dispatch = useDispatch()

  const handleStartButton = (event: any) => {
    event.preventDefault()
    dispatch(getFirstPlayers(firstPlayer))
    dispatch(getSecondPlayer(secondPlayer))
    dispatch(getTimer(timer))
    setTimeout(() => {
      dispatch(setStartGame())
    }, 1000)
  }

  return (
    <Fragment>
      {!boardSelector.isStart ? (
        <form onSubmit={handleStartButton}>
          <Input
            iconSrc={roundIcon}
            alt={'Round'}
            value={firstPlayer}
            placeholder={'Leave empty to use AI or enter player name'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFirstPlayer(e.target.value)
            }
          />
          <Input
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
          <Button label={'Start'} />
        </form>
      ) : (
        <Game />
      )}
    </Fragment>
  )
}

export default Home
