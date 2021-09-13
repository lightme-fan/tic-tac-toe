import React from 'react'
import styled from 'styled-components'

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

const ButtonStyle = styled.div`
  text-align: center;

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }
`

export default Button
