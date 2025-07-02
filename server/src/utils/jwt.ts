import { sign, verify } from "hono/jwt";

// JWT secret - in production, this should come from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production";

export function generateJWT(payload: { userId: string; email?: string }) {
  return sign({ ...payload, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 }, JWT_SECRET);
}

export async function verifyJWT(token: string) {
  try {
    return await verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
