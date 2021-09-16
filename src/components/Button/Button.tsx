import React from 'react'
import styled from 'styled-components'
import { fontSize } from '../../container/MainContainer'

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
    ${fontSize}
  }
`

export default Button
