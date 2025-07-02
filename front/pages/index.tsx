// pages/index.tsx
import styled from "styled-components";

const Container = styled.div`
  padding: 3rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-top: 1rem;
`;

export default function HomePage() {
  return (
    <Container>
      <Title>MiniShop에 오신 것을 환영합니다 </Title>
      <Subtitle>React + Next.js 기반 쇼핑몰 프로젝트</Subtitle>
    </Container>
  );
}
