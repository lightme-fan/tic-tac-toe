import styled from 'styled-components'

function Header() {
  return <Text>Tic tac toe</Text>
}

const Text = styled.h1`
  text-align: center;
  margin: 0;
  font-size: 92px;
  line-height: 100px;
  font-weight: 400;
  color: #000000;
  padding-bottom: 10px;

  @media (max-width: 538px) {
    font-size: 68px;
    line-height: 68px;
    padding-bottom: 30px;
  }
`

export default Header
