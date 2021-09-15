import React, { Fragment } from 'react'
import styled from 'styled-components'
import bar from '../../icons/isVertical.svg'
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
              disabled={disabled}>
              {item}
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

const SquareWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 300px;
`

const Board = styled.div`
  border-bottom: 2px solid black;

  &:nth-child(7),
  &:nth-of-type(8),
  &:nth-of-type(9) {
    border-bottom: none;
  }

  &:nth-child(2),
  &:nth-child(5),
  &:nth-child(8) {
    border-right: 2px solid black;
    border-left: 2px solid black;
  }
`

const Button = styled.button`
  width: 100px;
  height: 100px;
  font-size: 46px;
  border: none;
  cursor: pointer;
  background-color: transparent;

  &:hover,
  &:focus {
    outline: none;
  }
`

const VerticalBar = styled.div`
  width: 2px;
  height: 300px;
  background: #000;
  position: absolute;
  top: 102px;
`

const HorizontalBar = styled.div`
  width: 300px;
  height: 2px;
  background: #000;
  position: absolute;
  left: 0%;
`

const DiagonalBar = styled.div`
  width: 2px;
  height: 300px;
  background: #000;
  position: absolute;
  top: 22%;
  left: 153px;
`
export default Squares
