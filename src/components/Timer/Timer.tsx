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
      <input type='number' value={value} onChange={onChange} />
    </TimerStyle>
  )
}

const TimerStyle = styled.div`
  display: flex;
  ${fontSize}
  position: relative;

  input {
    width: 8%;
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

export default Timer
