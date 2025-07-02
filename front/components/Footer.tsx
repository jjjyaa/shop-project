// components/Footer.tsx
import styled from "styled-components";

const FooterWrapper = styled.footer`
  width: 100%;
  background-color: #f8f8f8;
  padding: 1rem 1rem;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  border-top: 1px solid #ddd;
  font-size: 0.85rem;
  color: #333;
`;

const FooterColumn = styled.div`
  flex: 1;
  min-width: 200px;
  margin: 1.5rem;
`;

const FooterTitle = styled.h4`
  font-weight: bold;
  margin-bottom: 1rem;
`;

const FooterText = styled.p`
  margin: 0.3rem 0;
`;

const BankButton = styled.select`
  padding: 0.3rem;
  width: 100%;
  margin-top: 0.5rem;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterColumn>
        <FooterTitle>ABOUT US</FooterTitle>
        <FooterText>company. MINI SHOP</FooterText>
        <FooterText>owner.  최희주</FooterText>
        <FooterText>tel. 010-4873-2595 email. scouwn5@naver.com</FooterText>
        <FooterText>address. 경상남도 진주시</FooterText>
      </FooterColumn>

      <FooterColumn>
        <FooterTitle>C/S CENTER</FooterTitle>
        <FooterText style={{ fontWeight: "bold", fontSize: "1.2rem" }}>010-4873-2595</FooterText>
        <FooterText>mon-fri pm13:00~pm17:00</FooterText>
        <FooterText>sat, sun, holiday off</FooterText>
      </FooterColumn>

      <FooterColumn>
        <FooterTitle>BANK ACCOUNT</FooterTitle>
        <FooterText>농협 356-0000-0000-00</FooterText>
        <FooterText>예금주 : 최희주</FooterText>
        <BankButton>
          <option>인터넷뱅킹 바로가기</option>
        </BankButton>
        <FooterText style={{ fontSize: "0.6rem", marginTop: "0.5rem" }}>
          주문자와 입금자명이 다를 경우 입금확인이 지연될 수 있습니다.
        </FooterText>
      </FooterColumn>

      <FooterColumn>
        <FooterTitle>RETURN</FooterTitle>
        <FooterText>[교환/반품 주소지]</FooterText>
        <FooterText>경상남도 진주시</FooterText>
        <FooterText>CJ대한통운 고객센터:1588-1255</FooterText>
      </FooterColumn>
    </FooterWrapper>
  );
}
