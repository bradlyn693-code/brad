import { readCookie, readSessionToken, SESSION_COOKIE, json } from "../_lib/auth";

type Request = { method?: string; headers?: { cookie?: string } };
type Response = { status: (code: number) => { json: (body: unknown) => void } };

export default async function handler(req: Request, res: Response) {
  if (req.method !== "GET") return json(res, 405, { error: "Method not allowed." });
  const token = readCookie(req.headers?.cookie, SESSION_COOKIE);
  if (!token) return json(res, 401, { authenticated: false });
  try {
    const session = await readSessionToken(token);
    return json(res, 200, { authenticated: true, user: session });
  } catch {
    return json(res, 401, { authenticated: false });
  }
}
