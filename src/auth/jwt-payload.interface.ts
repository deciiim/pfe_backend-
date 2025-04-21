// src/auth/interfaces/jwt-payload.interface.ts

export interface JwtPayload {
    sub: number;   // User's ID
    name: string;  // User's name
    role: string;  // User's role
  }
  