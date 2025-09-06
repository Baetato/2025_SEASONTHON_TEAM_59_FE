//src/pages/homeStage.jsx

import { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/header.jsx';
import HomeMenuButton from '../components/homeMenuBtn.jsx';

export default function HomeStage() {
  const [alert, setAlert] = useState(null);

  return (
    <Container>
      <Header points={100} maxPoints={200} />
      <Content>
        <HomeMenuButton
          type="location"
          onClick={() => setAlert({ title: '안내', body: '내 주변(미구현)' })}
        />
        <HomeMenuButton
          type="community"
          onClick={() => setAlert({ title: '안내', body: '메시지(미구현)' })}
        />
        <HomeMenuButton
          type="setting"
          onClick={() => setAlert({ title: '설정', body: '설정(미구현)' })}
        />
      </Content>
    </Container>
  );
}


// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #43714F 0%, #92C39D 100%);
`;

const Content = styled.div`
  padding: 30px 7px;
`;