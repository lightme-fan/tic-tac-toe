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
  @font-face {
    font-family: 'Usuazi Hosomozi';
    src: url('.../fonts/Usuazi-Hosomozi.woff2') format('woff2'),
      url('.../fonts/Usuazi-Hosomozi.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  font-family: 'sans-serif';
  max-width: 900px;
  margin: auto;
  padding: 16px;
`

const Wrapper = styled.div`
  transition: all 1s ease-out;
  display: flex;
  flex-direction: column;
  gap: 4px;

  form {
    max-width: 634px;
    width: 100%;
    align-self: center;
  }
`

export default MainContainer
