// pages/products/index.tsx
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function ProductListPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('상품 목록 불러오기 실패:', err);
      }
    };
    fetchData();
  }, []);

  const handleClick = (id: number) => {
    router.push(`/products/${id}`);
  };

  return (
    <Wrapper>
      <Title>상품 리스트</Title>
      <Line />
      <ProductGrid>
        {products.map(product => (
          <ProductCard key={product.id} onClick={() => handleClick(product.id)}>
            <ImageWrapper>
              <img src={product.imageUrl} alt={product.name} />
            </ImageWrapper>
            <Info>
              <Name>{product.name}</Name>
              <Price>{product.price.toLocaleString()}원</Price>
              <Description>{product.description}</Description>
            </Info>
          </ProductCard>
        ))}
      </ProductGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;
const Line = styled.div`
  height: 2px;
  width: 100%;
  background: #000;
  margin: 1rem 0 2rem;
  margin-bottom: 1rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
`;

const ProductCard = styled.div`
  border: 1px solid #eee;
  border-radius: 16px; /* 둥글게 */
  overflow: hidden;
  background: #fff;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  background: #f9f9f9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Info = styled.div`
  padding: 1rem;
  text-align: center;
`;

const Name = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.3rem;
`;

const Price = styled.p`
  font-size: 0.8rem;
  color:rgb(240, 160, 40);
  font-weight: bold;
  margin-bottom: 0.3rem;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #777;
`;
