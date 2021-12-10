import React from 'react'
import { TimerStyle } from './TimerStyles' 

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

export default Timer
