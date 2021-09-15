import React from 'react'
import styled from 'styled-components'

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

const Label = styled.label`
  display: flex;
  flex-direction: row;
  gap: calc(39px / 2);

  img {
    max-width: 44px;
  }

  span {
    align-self: center;
  }
`

export const InputStyle = styled.input`
  width: 100%;
  border: none;
  font-size: 28px;
  line-height: 58px;

  &:hover,
  &:focus {
    outline: none;
  }
`

export default Input
