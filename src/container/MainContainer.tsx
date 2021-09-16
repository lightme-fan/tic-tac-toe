import styled, { css } from 'styled-components'
import Header from '../components/Header/Header'

export const fontSize = css`
  font-size: 28px;
  line-height: 58px;
  @media (max-width: 538px) {
    font-size: 1rem;
    line-height: 47px;
  }
`

const MainContainer: React.FC = ({ children }) => {
  return (
    <Container>
      <Header />
      <section>
        <Wrapper>{children}</Wrapper>
      </section>
    </Container>
  )
}

const Container = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 16px;
`

const Wrapper = styled.div`
  transition: all 1s ease-out;
  display: flex;
  flex-direction: column;
  gap: 44px;

  form {
    max-width: 634px;
    width: 100%;
    align-self: center;
  }
`

export default MainContainer
