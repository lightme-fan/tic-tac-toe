import React, { Fragment } from 'react'
import Input from '../components/Input/Input'
import roundIcon from '../icons/round.svg'
import crossIcon from '../icons/cross.svg'
import Timer from '../components/Timer/Timer'
import Button from '../components/Button/Button'
import Game from './Game'
import useTicTacToe from '../customHooks/useTicTacToe'

function Home() {
  const {
    boardState,
    player,
    firstPlayer,
    setFirstPlayer,
    secondPlayer,
    timer,
    setTimer,
    setSecondPlayer,
    handleStartButton,
    handleRebootBtn,
  } = useTicTacToe()

  return (
    <Fragment>
      {!boardState.isStart ? (
        <>
          <form onSubmit={handleStartButton}>
            <Input
              // firstPlayerScore={boardState.score}
              iconSrc={roundIcon}
              alt={'Round'}
              value={firstPlayer}
              placeholder={'Leave empty to use AI or enter player name'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFirstPlayer(e.target.value)
              }
            />
            <Input
              // secondPlayerScore={boardState.score}
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
