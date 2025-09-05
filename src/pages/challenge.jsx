import styled from "styled-components";
import Header from "../components/header";

export default function Challenge() {
  return (
    <Container>
      <Header points={50} maxPoints={100} />
      <Content>
        <h1>Challenge Page</h1>
      </Content>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const Content = styled.div`
  padding: 40px 36px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;