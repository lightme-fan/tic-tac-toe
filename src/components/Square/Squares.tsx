import React from 'react'
import styled from 'styled-components'

interface PropType {
  index?: number
  handleClick(event: React.MouseEvent<HTMLButtonElement>, index: number): void
  value?: string
  boards: string[]
  disabled?: boolean
}

const Squares: React.FC<PropType> = ({ handleClick, boards, disabled }) => {
  return (
    <SquareWrapper>
      {boards.map((item, index) => {
        return (
          <div key={`${index}`}>
            <Button
              onClick={(e) => handleClick(e, index)}
              value={item}
              disabled={disabled}>
              {item}
            </Button>
          </div>
        )
      })}
    </SquareWrapper>
  )
}

const SquareWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 300px;

  div {
    border-bottom: 2px solid black;

    &:last-child,
    &:nth-child(7),
    &:nth-child(8) {
      border-bottom: none;
    }

    &:nth-child(2),
    &:nth-child(5),
    &:nth-child(8) {
      border-right: 2px solid black;
      border-left: 2px solid black;
    }
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

export default Squares
