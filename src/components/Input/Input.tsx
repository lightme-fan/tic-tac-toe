import React from 'react'
import { Label, InputStyle } from './InputStyles';

interface InputProps {
  iconSrc?: string
  firstPlayerScore?: string
  secondPlayerScore?: string
  alt?: string
  value?: string
  placeholder: string
  onChange?: (even: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({
  iconSrc,
  firstPlayerScore,
  secondPlayerScore,
  alt,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <Label>
      <img src={iconSrc} alt={alt} />
      {firstPlayerScore !== '0' && <span>{firstPlayerScore}</span>}
      {secondPlayerScore !== '0' && <span>{secondPlayerScore}</span>}
      <InputStyle
        type='text'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Label>
  )
}

export default Input
