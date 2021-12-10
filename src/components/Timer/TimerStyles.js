import styled from 'styled-components'
import { fontSize } from '../../container/MainContainer'

export const TimerStyle = styled.div`
  display: flex;
  ${fontSize}
  position: relative;

  input {
    width: 8%;
    margin-left: 10px;
    border: none;
    ${fontSize}
    color: #8B8585;

    &:hover,
    &:focus {
      outline: none;
    }
  }
`