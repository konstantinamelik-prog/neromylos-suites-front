import { createContext, useContext, useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { deleteCookie, getCookie, setCookie } from "@/shared/lib/cookies";
import {login} from "@/features/auth/authApi";
import type { LoginFields } from "@/features/auth/authSchema";

type AuthContextProps = {
  isAuthenticated: boolean;
  accessToken: string | null;
  role: string | null;
  loginUser: (fields: LoginFields) => Promise<void>;
  logoutUser: () => void;
}

const ROLE_CLAIM = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

type RawJwtPayload = {
  [ROLE_CLAIM]?: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function readRoleFromToken(token: string | null): string | null {
  if (!token) return null;
  try {
    return jwtDecode<RawJwtPayload>(token)[ROLE_CLAIM] ?? null;
  } catch {
      return null;
  }
}

const TOKEN_COOKIE_NAME = "neromylos_access_token";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const cookieAccessToken = getCookie(TOKEN_COOKIE_NAME);

  const [accessToken, setAccessToken] = useState<string | null>(
    () => cookieAccessToken ?? null
  );

  const [role, setRole] = useState<string | null>(
    readRoleFromToken(cookieAccessToken ?? null)
  );

  const loginUser = async (fields: LoginFields) => {
    const res = await login(fields);
    setCookie(TOKEN_COOKIE_NAME, res.token, {
      expires: 1,
      sameSite: "Lax",
      secure: false,
      path: "/",
    });
    setAccessToken(res.token);
    setRole(readRoleFromToken(res.token));
  }

  const logoutUser = () => {
    deleteCookie(TOKEN_COOKIE_NAME);
    setAccessToken(null);
    setRole(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!accessToken,
        accessToken,
        role,
        loginUser,
        logoutUser,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}