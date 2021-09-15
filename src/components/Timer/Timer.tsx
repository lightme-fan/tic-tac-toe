import React from 'react'
import styled from 'styled-components'

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
  font-size: 28px;
  line-height: 58px;

  input {
    width: 30%;
    margin-left: 10px;
    border: none;
    font-size: 28px;
    line-height: 58px;

    &:hover,
    &:focus {
      outline: none;
    }
  }
`

export default Timer
