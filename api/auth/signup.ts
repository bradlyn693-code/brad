import bcrypt from "bcryptjs";
import { createSessionToken, cookieHeader, createUser, ensureUsersTable, findUser, isValidEmail, json, normalizeEmail } from "../_lib/auth";

type Request = { method?: string; body?: { email?: unknown; password?: unknown } };
type Response = { setHeader: (name: string, value: string) => void; status: (code: number) => { json: (body: unknown) => void } };

export default async function handler(req: Request, res: Response) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed." });
  const email = normalizeEmail(req.body?.email);
  const password = typeof req.body?.password === "string" ? req.body.password : "";
  if (!isValidEmail(email)) return json(res, 400, { error: "Enter a valid email address." });
  if (password.length < 6) return json(res, 400, { error: "Choose a password with at least 6 characters." });

  try {
    await ensureUsersTable();
    if (await findUser(email)) return json(res, 409, { error: "An account with that email already exists." });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await createUser(email, passwordHash);
    const token = await createSessionToken(user.email, true);
    res.setHeader("Set-Cookie", cookieHeader(token, true));
    return json(res, 201, { user: { email: user.email } });
  } catch (error) {
    console.error("Signup error", error);
    return json(res, 500, { error: "Unable to create your account right now. Check your database configuration." });
  }
}
