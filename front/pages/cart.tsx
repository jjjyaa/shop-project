import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useAuth } from "@/context/AuthContext";

interface CartItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
}

interface CartResponse {
  cartId: number;
  memberId: number;
  items: CartItem[];
}

export default function CartPage() {
  const { member } = useAuth();
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const reloadCart = async () => {
    if (!member) {
      setCart(null);
      return;
    }
  
    try {
      const res = await axios.get(`/api/cart/${member.memberId}`);
      console.log("서버에서 받아온 cart", res.data);
  
      setCart({
        ...res.data,
        items: [...res.data.items], // 🔥 핵심 포인트
      });
    } catch (err) {
      console.error("장바구니 불러오기 실패", err);
    }
  };

  useEffect(() => {
    reloadCart();
  }, [member]);

  const handleSelect = (cartItemId: number) => {
    setSelectedItems((prev) =>
      prev.includes(cartItemId)
        ? prev.filter((id) => id !== cartItemId)
        : [...prev, cartItemId]
    );
  };

  const handleQuantityChange = async (cartItemId: number, delta: number) => {
    const item = cart?.items.find((i) => i.id === cartItemId);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) return;

    try {
      await axios.patch("/api/cart/update-quantity", {
        cartItemId,
        quantity: newQuantity,
      });
      await reloadCart(); // 화면 갱신
    } catch (err) {
      console.error("수량 변경 실패", err);
    }
  };

  const handleDelete = async (cartItemId: number) => {
    await axios.delete(`/api/cart/cart/delete/${cartItemId}`);
    reloadCart();
  };

  const totalPrice = cart
    ? cart.items
        .filter((item) => selectedItems.includes(item.id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  if (!member) return <div>로그인이 필요합니다.</div>;

  return (
    <Wrapper>
      <Title>장바구니</Title>

      {/* 헤더 라인 */}
      <Row style={{ fontWeight: "bold", borderBottom: "2px solid #333" }}>
        <Cell flex={0.5} center />
        <Cell flex={3}>상품명</Cell>
        <Cell flex={2} center>수량</Cell>
        <Cell flex={2} center>가격</Cell>
        <Cell flex={2} center>선택</Cell>
      </Row>

      {cart?.items.map((item) => (
        <Row key={item.id}>
          <Cell flex={0.5} center>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => handleSelect(item.id)}
            />
          </Cell>
          <Cell flex={3}>{item.productName}</Cell>
          <Cell flex={2} center>
            <QuantityBox>
              <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
            </QuantityBox>
          </Cell>
          <Cell flex={2} center>
            {(item.price * item.quantity).toLocaleString()}원
          </Cell>
          <Cell flex={2} center>
            <ActionButton onClick={() => alert("주문 기능은 추후 구현")}>주문</ActionButton>
            <ActionButton onClick={() => handleDelete(item.id)}>삭제</ActionButton>
          </Cell>
        </Row>
      ))}

      <Summary>
        <div>총 상품금액</div>
        <div>{totalPrice.toLocaleString()}원</div>
      </Summary>

      <OrderButtons>
        <button>전체상품주문</button>
        <button disabled={selectedItems.length === 0}>선택상품주문</button>
      </OrderButtons>
    </Wrapper>
  );
}




const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;
`;

const Cell = styled.div<{ flex?: number; center?: boolean }>`
  flex: ${(props) => props.flex || 1};
  text-align: ${(props) => (props.center ? "center" : "left")};
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.center ? "center" : "flex-start")};
  gap: 0.5rem;
`;

const QuantityBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  button {
    width: 30px;
    height: 30px;
    font-size: 1rem;
    background: white;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  span {
    min-width: 20px;
    text-align: center;
  }
`;

const ActionButton = styled.button`
  padding: 0.3rem 0.6rem;
  background: white;
  border: 1px solid #aaa;
  cursor: pointer;
`;


const Summary = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.1rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;

  div:first-child {
    margin-right: 1rem;
    font-weight: bold;
  }
`;

const OrderButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  button {
    padding: 0.7rem 1.5rem;
    font-weight: bold;
    font-size: 1rem;
    background:rgb(0, 0, 0);
    color: white;
    border: none;
    cursor: pointer;

    &:last-child {
      background: #eee;
      color: #333;
    }

    &:disabled {
      background: #ccc;
      color: #999;
      cursor: not-allowed;
    }
  }
`;

