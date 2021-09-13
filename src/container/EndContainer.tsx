import React from 'react'
import styled from 'styled-components'
import Button from '../components/Button/Button'

interface PropType {
  title: string
  label: string
}
const EndContainer: React.FC<PropType> = ({ children, title, label }) => {
  return (
    <Gaming>
      <h4>{title}</h4>
      {children}
      <Button label={label} />
    </Gaming>
  )
}

const Gaming = styled.div`
  align-self: center;
  display: grid;
  gap: 30px;

  h4,
  button {
    text-align: center;
  }
`

export default EndContainer
