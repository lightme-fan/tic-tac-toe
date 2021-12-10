import styled from 'styled-components'
import { fontSize } from '../../container/MainContainer'


export const ButtonStyle = styled.div`
  text-align: center;

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    ${fontSize};
  }
`