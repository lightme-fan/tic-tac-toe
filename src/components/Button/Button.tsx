import React from 'react'
import { ButtonStyle } from './ButtonStyle'

interface ButtonProp {
  label: string
  onClick?: () => void
}

const Button: React.FC<ButtonProp> = ({ label, onClick }) => {
  return (
    <ButtonStyle>
      <button onClick={onClick}>{label}</button>
    </ButtonStyle>
  )
}

export default Button