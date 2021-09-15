import styled from 'styled-components'
import Button from '../components/Button/Button'
import Squares from '../components/Square/Squares'
import useTicTacToe from '../customHooks/useTicTacToe'

const Game = () => {
  const {
    boardState,
    player,
    crossBar,
    position,
    boards,
    winner,
    timing,
    turn,
    score,
    handleClickBoard,
    handleRestartButton,
  } = useTicTacToe()

  let heading = `${
    turn === 'X' ? player.first_player : player.second_player
  }'s turn`
  if (timing <= 0) {
    heading = `Time out - ${winner} won!`
  }
  if (winner) {
    heading = `${winner} won the game`
  }

  return (
    <Gaming>
      <h4>
        {heading} <span>{boardState.score === '0' ? '' : score}</span>
      </h4>
      <Squares
        handleClick={handleClickBoard}
        boards={boards}
        crossBar={crossBar}
        leftPosition={{ left: position }}
        topPosition={{ top: position }}
        diagonalPosition={{
          transform: `rotate(${position})`,
        }}
      />
      {winner || timing <= 0 ? (
        <Button
          label={'Restart'}
          onClick={() => handleRestartButton(heading)}
        />
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
  position: relative;

  h4,
  p {
    text-align: center;
  }

  img {
    width: 300px;
  }
`

export default Game
