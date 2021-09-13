import styled from 'styled-components'
import Header from '../components/Header/Header'

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
    align-self: center;
  }
`

export default MainContainer
