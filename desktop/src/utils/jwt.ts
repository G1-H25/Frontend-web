// src/utils/jwt.ts
import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  name?: string;
  role?: string;
  userId?: string;
  [key: string]: unknown; // istället för any
}

export function parseJwt(token: string): JwtPayload | null {
  if (!token) return null;
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}

// desktop/src/utils/jwt.ts
export const isTokenExpired = (token: string): boolean => {
  try {
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return true;

    const payload = JSON.parse(atob(payloadBase64));
    const exp = payload.exp;
    if (!exp) return true;

    return Date.now() >= exp * 1000;
  } catch {
    return true; // Felaktig token = betraktas som utgången
  }
};
