import React from 'react'
import { SquareWrapper, Board, Button, VerticalBar, HorizontalBar, DiagonalBar } from './SquareStyles';

interface PropType {
  index?: number
  handleClick(event: React.MouseEvent<HTMLButtonElement>, index: number): void
  value?: string
  boards: string[]
  disabled?: boolean
  crossBarStyle?: any
  crossBar?: any
  leftPosition?: any
  topPosition?: any
  diagonalPosition?: any
}

const Squares: React.FC<PropType> = ({
  handleClick,
  boards,
  disabled,
  crossBar,
  leftPosition,
  topPosition,
  diagonalPosition,
}) => {
  return (
    <SquareWrapper>
      {boards.map((item, index) => {
        return (
          <Board key={`${index}`}>
            <Button
              onClick={(e) => handleClick(e, index)}
              value={item}
              disabled={disabled === true ? true : false}>
              {item.split('')[0]}
            </Button>
          </Board>
        )
      })}
      {crossBar.isVertical === true ? (
        <VerticalBar style={leftPosition}></VerticalBar>
      ) : null}
      {crossBar.isHorizontal === true ? (
        <HorizontalBar style={topPosition}></HorizontalBar>
      ) : null}
      {crossBar.isDiagonal === true ? (
        <DiagonalBar style={diagonalPosition}></DiagonalBar>
      ) : null}
    </SquareWrapper>
  )
}


export default Squares
