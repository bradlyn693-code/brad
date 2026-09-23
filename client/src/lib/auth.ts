export type AuthUser = { email: string };

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options?.headers ?? {}) },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "Authentication request failed.");
  return payload as T;
}

export function signIn(email: string, password: string, remember: boolean) {
  return request<{ user: AuthUser }>("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password, remember }) });
}

export function signUp(email: string, password: string) {
  return request<{ user: AuthUser }>("/api/auth/signup", { method: "POST", body: JSON.stringify({ email, password }) });
}

export function getSession() {
  return request<{ authenticated: boolean; user?: AuthUser }>("/api/auth/session");
}

export function signOut() {
  return request<{ authenticated: false }>("/api/auth/logout", { method: "POST" });
}
