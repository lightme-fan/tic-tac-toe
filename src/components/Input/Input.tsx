import React from 'react'
import styled from 'styled-components'

interface InputProps {
  iconSrc?: string
  score?: string
  alt?: string
  value?: string
  placeholder: string
  onChange?: (even: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({
  iconSrc,
  score,
  alt,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <Label>
      <img src={iconSrc} alt={alt} />
      {score !== '0' && <span>{score}</span>}
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
    max-width: 24px;
  }

  span {
    align-self: center;
  }
`

export const InputStyle = styled.input`
  width: 100%;
  border: none;
  font-size: 1rem;
  line-height: 36px;

  &:hover,
  &:focus {
    outline: none;
  }
`

export default Input
