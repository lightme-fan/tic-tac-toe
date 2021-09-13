import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Squares from '../components/Square/Squares'
import EndContainer from '../container/EndContainer'
import { selectBoard } from '../redux/slices/boardsSlice'

const EndedGame = () => {
  const boardState = useSelector(selectBoard)

  return (
    <EndContainer title={'Draw game'} label={'Restart'}>
      <Squares boards={boardState.boards} handleClick={() => {}} />
    </EndContainer>
  )
}

export default EndedGame
