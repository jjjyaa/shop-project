import styled from "styled-components";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

// 전체 헤더 래퍼
const HeaderWrapper = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 0 2rem;
  box-sizing: border-box;
`;

// 각 영역을 동일한 너비로 분배
const Section = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  &:nth-child(1) {
    justify-content: flex-start;
    gap: 1rem;
  }

  &:nth-child(2) {
    justify-content: center;
  }

  &:nth-child(3) {
    justify-content: flex-end;
    gap: 1rem;
  }
`;

const MenuItem = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  color: #222;
  

  &:hover {
    color: #000;
  }
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
`;

export default function Header() {

  const { member, logout } = useAuth();

  return (
    <HeaderWrapper>
      {/* 왼쪽 메뉴 */}
      <Section>
        <Link href="/products"><MenuItem>PRODUCT</MenuItem></Link>
        <Link href="#"><MenuItem>BEST</MenuItem></Link>
        <Link href="#"><MenuItem>COMMUNITY</MenuItem></Link>
      </Section>

      {/* 가운데 로고 */}
      <Section>
        <Link href="/"><Logo>MINI SHOP</Logo></Link>
      </Section>

      {/* 오른쪽 아이콘 */}
      <Section>
        {member ? (
          <>
            <MenuItem>{member.name}님 환영합니다</MenuItem>
            <MenuItem onClick={logout}>로그아웃</MenuItem>
            <Link href="#"><MenuItem>장바구니</MenuItem></Link>
            <Link href="/mypage"><MenuItem>마이페이지</MenuItem></Link>
          </>
        ) : (
          <>
            <Link href="/login"><MenuItem>로그인</MenuItem></Link>
            <Link href="/signup"><MenuItem>회원가입</MenuItem></Link>
            <Link href="#"><MenuItem>장바구니</MenuItem></Link>
          </>
        )}
      </Section>
    </HeaderWrapper>
  );
}
