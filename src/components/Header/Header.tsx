import React from 'react'
import styled from 'styled-components'

function Header() {
  return <Text>Tic tac toe</Text>
}

const Text = styled.h1`
  text-align: center;
  margin: 0;
  font-size: 72px;
  font-weight: 400;
  color: #000000;
  padding-bottom: 10px;

  @media (max-width: 538px) {
    font-size: 2rem;
    line-height: 47px;
    padding-bottom: 48px;
  }
`

export default Header
