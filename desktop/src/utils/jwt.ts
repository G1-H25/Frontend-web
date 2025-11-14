// src/utils/jwt.ts
import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  sub: number;
  username: string;
  role: string;
  iat?: number;
  exp?: number;
}


export function parseJwt(token: string): JwtPayload | null {
  if (!token) return null;
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}

// get exp from token
export const getTokenExpiration = (token: string): number | null => {
  try {
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return null;

    const payload = JSON.parse(atob(payloadBase64));
    return payload.exp || null;
  } catch {
    return null;
  }
};

// check if token is expired
export const isTokenExpired = (exp: number): boolean => {
  return Date.now() >= exp * 1000;
};
