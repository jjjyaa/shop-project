import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export interface Member {
  memberId: number;
  email: string;
  name: string;
}

interface AuthContextType {
  member: Member | null;
  login: (user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [member, setMember] = useState<Member | null>(null);
  const router = useRouter();

  // 앱이 실행될 때 localStorage에 저장된 유저 정보 로드
  useEffect(() => {
    const stored = localStorage.getItem("member");
    if (stored) {
      setMember(JSON.parse(stored));
    }
  }, []);

  const login = (user: any) => {
    const formattedUser: Member = {
      memberId: user.id,
      email: user.email,
      name: user.name,
    };

    setMember(formattedUser);
    localStorage.setItem("member", JSON.stringify(formattedUser));
  };

  const logout = () => {
    setMember(null);
    localStorage.removeItem("member");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ member, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
