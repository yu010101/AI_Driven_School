import { SignJWT, jwtVerify } from "jose";
import { headers } from "next/headers";

function getSecret() {
  return new TextEncoder().encode(
    process.env.JWT_SECRET || "ai-dojo-secret-change-in-production"
  );
}

export async function createToken(userId: number, email: string, role?: string): Promise<string> {
  return new SignJWT({ userId, email, role: role || "free" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(getSecret());
}

export async function verifyToken(): Promise<{ userId: number; email: string } | null> {
  try {
    // Get cookie from request headers
    const headersList = headers();
    const cookieHeader = headersList.get("cookie") || "";
    const match = cookieHeader.match(/ai-dojo-token=([^;]+)/);
    const token = match?.[1];

    if (!token) return null;

    const { payload } = await jwtVerify(token, getSecret());
    return { userId: payload.userId as number, email: payload.email as string };
  } catch (e) {
    console.error("Token verification failed:", e);
    return null;
  }
}
