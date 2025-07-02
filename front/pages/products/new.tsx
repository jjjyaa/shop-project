import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { createProduct } from "@/api/product";

const NewProductPage = () => {
  const router = useRouter();

  // 입력값 상태 관리
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // 등록 요청 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price) {
      alert("상품명과 가격은 필수 항목입니다.");
      return;
    }

    try {
      await createProduct({ name, price: Number(price), description, imageUrl });
      alert("상품이 등록되었습니다.");
      router.push("/products");
    } catch (error) {
      console.error("상품 등록 실패:", error);
      alert("상품 등록에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Title>상품 등록</Title>
      <Line />
      <Form onSubmit={handleSubmit}>
        <Label>상품명*</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />

        <Label>가격*</Label>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
          required
        />

        <Label>설명</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <Label>이미지 URL</Label>
        <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

        <Button type="submit">등록하기</Button>
      </Form>
    </Container>
  );
};

export default NewProductPage;

// Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-top: 1rem;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-top: 0.5rem;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  margin-top: 0.5rem;
  resize: vertical;
`;

const Button = styled.button`
  margin-top: 2rem;
  padding: 0.8rem;
  background-color:rgba(1, 5, 10, 0.87);
  color: white;
  border: none;
  cursor: pointer;
`;

