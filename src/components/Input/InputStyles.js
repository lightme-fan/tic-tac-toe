import styled from 'styled-components'
import { fontSize } from '../../container/MainContainer'

export const Label = styled.label`
  display: flex;
  flex-direction: row;
  gap: 2%;

  img {
    max-width: 44px;

    @media (max-width: 538px) {
      max-width: 22px;
    }
  }

  span {
    align-self: center;
  }
`

export const InputStyle = styled.input`
  width: 100%;
  border: none;
  ${fontSize}
  text-overflow: ellipsis;

  &:hover,
  &:focus {
    outline: none;
  }
`