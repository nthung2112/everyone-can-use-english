import jwt from "jsonwebtoken";

// JWT secret - in production, this should come from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production";

export interface JWTPayload {
  userId: string;
  email?: string;
  iat?: number;
  exp?: number;
}

export function generateJWT(payload: { userId: string; email?: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyJWT(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}

export function extractUserIdFromToken(authHeader: string): string {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Invalid authorization header");
  }

  const token = authHeader.substring(7);
  const decoded = verifyJWT(token);
  return decoded.userId;
}
