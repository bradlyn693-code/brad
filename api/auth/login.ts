import bcrypt from "bcryptjs";
import { createSessionToken, cookieHeader, ensureUsersTable, findUser, isValidEmail, json, normalizeEmail } from "../_lib/auth";

type Request = { method?: string; body?: { email?: unknown; password?: unknown; remember?: unknown } };
type Response = { setHeader: (name: string, value: string) => void; status: (code: number) => { json: (body: unknown) => void } };

export default async function handler(req: Request, res: Response) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed." });
  const email = normalizeEmail(req.body?.email);
  const password = typeof req.body?.password === "string" ? req.body.password : "";
  const remember = req.body?.remember === true;
  if (!isValidEmail(email) || password.length < 6) return json(res, 400, { error: "Enter a valid email and password." });

  try {
    await ensureUsersTable();
    const user = await findUser(email);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) return json(res, 401, { error: "Incorrect email or password." });
    const token = await createSessionToken(user.email, remember);
    res.setHeader("Set-Cookie", cookieHeader(token, remember));
    return json(res, 200, { user: { email: user.email } });
  } catch (error) {
    console.error("Login error", error);
    return json(res, 500, { error: "Unable to sign in right now. Check your database configuration." });
  }
}
