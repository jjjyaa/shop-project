import styled from "styled-components";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function MyPage() {
  const { member } = useAuth();
  const router = useRouter();

  return (
    <Wrapper>
      <Title>MY PAGE</Title>
      <SubTitle>회원 마이페이지</SubTitle>
      <Line />
      <Welcome>{member?.name}님 환영합니다</Welcome>

      <InfoBox onClick={() => router.push("/mypage/edit")}>
        <strong>회원정보</strong>
        회원가입하신 고객님의 개인정보를 관리하는 공간입니다.
      </InfoBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const SubTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Line = styled.div`
  height: 2px;
  width: 100%;
  background: #000;
  margin: 1rem 0 2rem;
  margin-bottom: 1rem;
`;

const Welcome = styled.div`
  font-size: 0.8rem;
  margin-bottom: 2rem;
`;

const InfoBox = styled.div`
  background: #f5f5f5;
  padding: 1.5rem;
  text-align: left;
  font-size: 0.95rem;
  color: #333;
  cursor: pointer; 
  transition: background 0.2s;

  &:hover {
    background: #e8e8e8; 
  }

  strong {
    display: block;
    font-weight: bold;
    margin-bottom: 0.3rem;
  }
`;

