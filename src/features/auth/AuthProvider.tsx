import { createContext, useContext, useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { deleteCookie, getCookie, setCookie } from "@/shared/lib/cookies";
import { login } from "../auth/authApi";
import type { LoginFields } from "../auth/authSchema";

type AuthContextProps = {
  isAuthenticated: boolean;
  accessToken: string | null;
  role: string | null;
  username: string | null;
  userId: number | null;
  loginUser: (fields: LoginFields) => Promise<void>;
  logoutUser: () => void;
};


const ROLE_CLAIM = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
const NAME_CLAIM = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
const ID_CLAIM = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";

type RawJwtPayload = {
  [ROLE_CLAIM]?: string;
  [NAME_CLAIM]?: string;
  [ID_CLAIM]?: string;
};

function readClaimFromToken(token: string | null, claim: string): string | null {
  if (!token) return null;
  try {
    return jwtDecode<RawJwtPayload>(token)[claim as keyof RawJwtPayload] ?? null;
  } catch {
    return null;
  }
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const TOKEN_COOKIE_NAME = "neromylos_access_token";

const deriveUserId = (token: string | null): number | null => {
  const rawId = readClaimFromToken(token, ID_CLAIM);
  return rawId ? Number(rawId) : null;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const cookieAccessToken = getCookie(TOKEN_COOKIE_NAME);

  const [accessToken, setAccessToken] = useState<string | null>(
    () => cookieAccessToken ?? null
  );

  const [role, setRole] = useState<string | null>(
    readClaimFromToken(cookieAccessToken ?? null, ROLE_CLAIM)
  );

  const [username, setUsername] = useState<string | null>(
    readClaimFromToken(cookieAccessToken ?? null, NAME_CLAIM)
  );

  const [userId, setUserId] = useState<number | null>(
    deriveUserId(cookieAccessToken ?? null)
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
    setRole(readClaimFromToken(res.token, ROLE_CLAIM));
    setUsername(readClaimFromToken(res.token, NAME_CLAIM));
    setUserId(deriveUserId(res.token));
  };

  const logoutUser = () => {
    deleteCookie(TOKEN_COOKIE_NAME);
    setAccessToken(null);
    setRole(null);
    setUsername(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!accessToken,
        accessToken,
        role,
        username,
        userId,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
