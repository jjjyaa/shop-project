// pages/login.tsx
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { loginMember } from "@/api/member";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await loginMember({ email, password });
      login(res);
      alert("로그인 성공했습니다.");
      router.push("/");
    } catch (error) {
      alert("로그인 실패. 이메일 또는 비밀번호를 확인하세요.");
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <Title>LOGIN</Title>

      <SectionTitle>회원 로그인</SectionTitle>

      <Input 
      type="text" 
      placeholder="아이디" 
      value={email} 
      onChange={(e) => setEmail(e.target.value)} />

      <Input 
      type="password" 
      placeholder="패스워드" 
      value={password} 
      onChange={(e) => setPassword(e.target.value)} />

      <Button onClick={handleLogin}>로그인</Button>
      <Link href="/signup"><SecondaryButton>회원가입</SecondaryButton></Link>

      <SubActions>
        <Link href="#">아이디찾기</Link>|<Link href="#">비밀번호찾기</Link>
      </SubActions>

    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.div`
  font-weight: bold;
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 2px solid #000;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem;
  border: none;
  border-bottom: 1px solid #ccc;
  margin-bottom: 1rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-bottom: 1px solid #000;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: #000;
  color: #fff;
  font-weight: bold;
  border: none;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const SecondaryButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #f5f5f5;
  border: none;
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const SubActions = styled.div`
  text-align: center;
  font-size: 0.85rem;
  color: #999;

  a {
    color: #333;
    margin: 0 0.5rem;
    text-decoration: none;
  }
`;

const KakaoButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: 1px solid #ccc;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;
