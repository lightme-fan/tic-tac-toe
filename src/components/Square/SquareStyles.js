import styled from 'styled-components'

export const SquareWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 300px;
`

export const Board = styled.div`
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

export const Button = styled.button`
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

  &[disabled]{
    color: #000;
    cursor: not-allowed;
  }
`

export const VerticalBar = styled.div`
  width: 4px;
  height: 344px;
  background: #000;
  position: absolute;
  top: 102px;
  background-color: green;
`

export const HorizontalBar = styled.div`
  width: 344px;
  height: 4px;
  background: #000;
  position: absolute;
  left: -7%;
  background-color: green;
`

export const DiagonalBar = styled.div`
  width: 4px;
  height: 344px;
  background: #000;
  position: absolute;
  top: 18%;
  left: 153px;
  background-color: green;
`