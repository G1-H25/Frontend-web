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
