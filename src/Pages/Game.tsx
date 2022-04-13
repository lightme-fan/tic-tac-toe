import styled from 'styled-components'
import Button from '../components/Button/Button'
import Squares from '../components/Square/Squares'
import { fontSize } from '../container/MainContainer'
import useTicTacToe from '../customHooks/useTicTacToe'

const Game = () => {
  const {
    isDisabled,
    player,
    crossBar,
    position,
    isBoardFilled,
    isDraw,
    boards,
    winner,
    timing,
    turn,
    handleClickBoard,
    handleRestartButton,
  } = useTicTacToe()

  let heading = `${
    turn === 'X' ? player.first_player : player.second_player
  }'s turn`
  if (timing <= 0) {
    heading = `Time out - ${
      turn === 'X' ? player.second_player : player.first_player
    } won !`
  }
  if (winner) {
    heading = `${winner} won the game !`
  }

  if (isBoardFilled === true && isDraw === true && winner === 'No winner') {
    heading = `It's a draw !`
  }
  
  return (
    <Gaming>
      <h4>
        {heading} <span></span>
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
        disabled={isDisabled}
      />
      {winner ||
      timing <= 0 ||
      (isBoardFilled === true && isDraw === true && winner === 'No winner') ? (
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

  h4, p {
    ${fontSize}
    font-weight: 400;
    margin: 0;
    text-align: center;
  }
  
  p {
    font-size: 37px;
    line-height: 50px;
    text-align: center;
    margin: 0
  }
  img {
    width: 300px;
  }
`

export default Game
