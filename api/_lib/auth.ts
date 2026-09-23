import { neon } from "@neondatabase/serverless";
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "fluxy_session";
export const SESSION_DAYS = 30;

type UserRow = { email: string; password_hash: string };

function database() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not configured.");
  return neon(url);
}

function secret() {
  const value = process.env.JWT_SECRET;
  if (!value) throw new Error("JWT_SECRET is not configured.");
  return new TextEncoder().encode(value);
}

export async function ensureUsersTable() {
  const sql = database();
  await sql`CREATE TABLE IF NOT EXISTS fluxy_users (
    email TEXT PRIMARY KEY,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
}

export async function findUser(email: string) {
  const sql = database();
  const rows = await sql`SELECT email, password_hash FROM fluxy_users WHERE email = ${email} LIMIT 1` as UserRow[];
  return rows[0] ?? null;
}

export async function createUser(email: string, passwordHash: string) {
  const sql = database();
  const rows = await sql`INSERT INTO fluxy_users (email, password_hash) VALUES (${email}, ${passwordHash}) RETURNING email` as { email: string }[];
  return rows[0];
}

export async function createSessionToken(email: string, remember: boolean) {
  const builder = new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt();
  return builder.setExpirationTime(remember ? `${SESSION_DAYS}d` : "2h").sign(secret());
}

export async function readSessionToken(token: string) {
  const { payload } = await jwtVerify(token, secret(), { algorithms: ["HS256"] });
  if (typeof payload.email !== "string" || typeof payload.sub !== "string") throw new Error("Invalid session.");
  return { email: payload.email };
}

export function cookieHeader(token: string, remember: boolean) {
  const secure = process.env.NODE_ENV === "production" || process.env.VERCEL === "1" ? "; Secure" : "";
  const maxAge = remember ? `; Max-Age=${SESSION_DAYS * 24 * 60 * 60}` : "";
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax${secure}${maxAge}`;
}

export function clearCookieHeader() {
  const secure = process.env.NODE_ENV === "production" || process.env.VERCEL === "1" ? "; Secure" : "";
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax${secure}; Max-Age=0`;
}

export function readCookie(cookieHeaderValue: string | undefined, name: string) {
  const found = cookieHeaderValue?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return found ? decodeURIComponent(found.slice(name.length + 1)) : null;
}

export function normalizeEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function isValidEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email);
}

export function json(res: { status: (code: number) => { json: (body: unknown) => void } }, status: number, body: unknown) {
  res.status(status).json(body);
}
