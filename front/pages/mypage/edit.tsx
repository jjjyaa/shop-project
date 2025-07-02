import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { updateMember, deleteMember } from "@/api/member";

export default function EditProfilePage() {
    const { member, login, logout } = useAuth();
    const router = useRouter();
  
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
  
    useEffect(() => {
      if (member) {
        setName(member.name);
        setEmail(member.email);
      }
    }, [member]);
  
    const handleSubmit = async () => {
      if (!member || !member.memberId) {
        alert("로그인이 필요합니다.");
        return;
      }
    
      try {
        const res = await updateMember(member.memberId, { name, password });
        login(res); 
        alert("회원정보가 수정되었습니다.");
        router.push("/mypage");
      } catch (error) {
        alert("수정 중 오류가 발생했습니다.");
        console.error(error);
      }
    };
  
    const handleDelete = async () => {
      if (!member) return;
      if (!window.confirm("회원 탈퇴하시겠습니까?")) return;
  
      try {
        await deleteMember(member.memberId);
        alert("회원 탈퇴가 완료되었습니다.");
        logout();
      } catch (error) {
        alert("회원 탈퇴 중 오류가 발생했습니다.");
        console.error(error);
      }
    };
  
    return (
      <Wrapper>
        <Title>회원 정보 수정</Title>
        <Line />
        
        <Input 
        type="text"
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="이름" />
        <Input 
        type="email" 
        value={email} readOnly />
        <Input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="새 비밀번호" />

        <Button onClick={handleSubmit}>회원 수정</Button>
        <DangerButton onClick={handleDelete}>회원 탈퇴</DangerButton>
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

const Line = styled.div`
  height: 2px;
  width: 100%;
  background: #000;
  margin: 1rem 0 2rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-bottom: 1px solid #ccc;
  margin-bottom: 1.2rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-bottom: 1px solid #000;
  }

  &:read-only {
    background-color: #f3f3f3;
    color: #999;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: #000;
  color: #fff;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;

const DangerButton = styled(Button)`
  background: #ff4d4f;
  margin-top: 1rem;

  &:hover {
    background: #e84343;
  }
`;
