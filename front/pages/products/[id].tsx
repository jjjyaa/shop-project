// pages/products/[id].tsx
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from "@/context/AuthContext";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { member } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // 상품 정보 가져오기
  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("상품 상세 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;
  if (!member) return <div>로그인이 필요합니다.</div>;
  
  const handleAddToCart = async () => {
    try {
      await axios.post('/api/cart/add', {
        productId: product.id,
        quantity: 1,
        memberId: member.memberId,
      });
      alert('장바구니에 추가되었습니다!');
      router.push('/cart');
    } catch (error) {
      console.error(error);
      alert('장바구니 추가 실패!');
    }
  };

  return (
    <Wrapper>
      <Container>
        <ImageWrapper>
          <img src={product.imageUrl} alt={product.name} />
        </ImageWrapper>
        <InfoWrapper>
          <Name>{product.name}</Name>
          <Price>{product.price.toLocaleString()}원</Price>
          <Description>{product.description}</Description>

          <ButtonWrapper>
            <Button onClick={handleAddToCart}>장바구니</Button>
            <BuyButton>바로구매</BuyButton>
          </ButtonWrapper>
        </InfoWrapper>
      </Container>
      <Divider />
      <DetailSection>
        <SectionTitle>상품 상세 설명</SectionTitle>
        <DetailContent>
          이 가방은 심플한 디자인과 실용성을 갖춘 데일리 아이템입니다.<br/>
          소재: PU Leather<br/>
          크기: 30cm x 40cm x 15cm<br/>
          무게: 600g
        </DetailContent>
      </DetailSection>
      <Divider />
      <ReviewSection>
        <SectionTitle>상품 후기</SectionTitle>
        <ReviewList>
          <ReviewItem>너무 예뻐요! 배송도 빠르고 만족합니다.</ReviewItem>
          <ReviewItem>가방 퀄리티 진짜 좋아요. 재구매 의사 있음!</ReviewItem>
        </ReviewList>
      </ReviewSection>
    </Wrapper>
  );
}

// 스타일 컴포넌트
const Wrapper = styled.div`
  padding: 4rem;
`;

const Container = styled.div`
  display: flex;
  gap: 3rem;
`;

const ImageWrapper = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 18px;
  }
`;

const InfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Price = styled.p`
  font-size: 1rem;
  color:rgb(240, 160, 40);
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 0.85rem;
  color: #777;
  margin-bottom: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 1rem;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

const BuyButton = styled(Button)`
  background: #ff8c00;
`;

const DetailSection = styled.div`
  margin-top: 1rem;
`;

const ReviewSection = styled.div`
  margin-top: 1rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const DetailContent = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #555;
`;

const ReviewList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ReviewItem = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  font-size: 0.95rem;
  color: #666;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px dashed #ccc;
  margin: 2rem 0;
`;

