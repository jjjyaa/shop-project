import axios from "axios";

// 회원가입 요청
export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export const signupMember = async (data: SignupRequest) => {
  const response = await axios.post("/api/members/signup", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// 로그인 요청
export interface LoginRequest {
  email: string;
  password: string;
}

export const loginMember = async (data: LoginRequest) => {
  const response = await axios.post("/api/members/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

// 회원 정보 수정 요청
export interface MemberUpdateRequest {
  name: string;
  password: string;
}

export const updateMember = async (id: number, data: MemberUpdateRequest) => {
  const res = await axios.patch(`http://localhost:8081/api/members/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

// 회원 탈퇴 요청
export const deleteMember = async (id: number) => {
  await axios.delete(`http://localhost:8081/api/members/${id}`);
};