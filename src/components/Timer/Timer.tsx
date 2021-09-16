import React from 'react'
import styled from 'styled-components'
import { fontSize } from '../../container/MainContainer'

interface TimerProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Timer: React.FC<TimerProps> = ({ value, onChange }) => {
  return (
    <TimerStyle>
      <span>Turn time limit in seconds:</span>
      <input type='text' value={value} onChange={onChange} />
      <SecondUnit>s</SecondUnit>
    </TimerStyle>
  )
}

const TimerStyle = styled.div`
  display: flex;
  ${fontSize}
  position: relative;

  input {
    width: 18%;
    margin-left: 10px;
    border: none;
    ${fontSize}
    color: #8B8585;

    &:hover,
    &:focus {
      outline: none;
    }
  }
`
const SecondUnit = styled.span`
  position: absolute;
  left: 352px;
  color: #8b8585;

  @media (max-width: 538px) {
    left: 222px;
  }
`

export default Timer
