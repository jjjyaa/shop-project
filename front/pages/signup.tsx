// pages/signup.tsx
import styled from "styled-components";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { signupMember } from "@/api/member";
import Link from "next/link";

export default function SignupPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e: FormEvent) => {
      e.preventDefault();
      try{
        await signupMember({ name, email, password });
        alert("회원가입 완료 되었습니다.")
        router.push("/login");
      } catch (error: any) {
        if (error.response?.status === 409) {
          alert(error.response.data);
        } else {
          alert("회원가입 실패");
          console.error(error);
        }
      }
    };
    
  return (
    <Wrapper>
        <Title>SIGN UP</Title>
        <SectionTitle>회원가입</SectionTitle>

      <Input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={handleSignup}>회원가입</Button>

      <SubActions>
        이미 계정이 있으신가요? <Link href="/login">로그인</Link>
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

const Description = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #777;
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
  margin-top: 1rem;
  cursor: pointer;
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
