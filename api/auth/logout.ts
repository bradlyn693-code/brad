import { clearCookieHeader, json } from "../_lib/auth";

type Request = { method?: string };
type Response = { setHeader: (name: string, value: string) => void; status: (code: number) => { json: (body: unknown) => void } };

export default async function handler(req: Request, res: Response) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed." });
  res.setHeader("Set-Cookie", clearCookieHeader());
  return json(res, 200, { authenticated: false });
}
