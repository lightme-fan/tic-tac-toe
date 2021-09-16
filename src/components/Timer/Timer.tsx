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
    </TimerStyle>
  )
}

const TimerStyle = styled.div`
  display: flex;
  ${fontSize}

  input {
    width: 18%;
    margin-left: 10px;
    border: none;
    ${fontSize}

    &:hover,
    &:focus {
      outline: none;
    }
  }
`

export default Timer
