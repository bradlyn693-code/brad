import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { getSession, signIn } from "@/lib/auth";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getSession()
      .then((session) => {
        if (session.authenticated) setLocation("/dashboard");
      })
      .catch(() => undefined);
  }, [setLocation]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password || !/^\S+@\S+\.\S+$/.test(normalizedEmail)) return;

    setIsSubmitting(true);
    try {
      await signIn(normalizedEmail, password, rememberMe);
      setLocation("/dashboard");
    } catch {
      // Keep the page clean without exposing server or database details.
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0618] px-4 py-8">
      <section className="w-full max-w-md rounded-2xl border border-[#2d1f4e] bg-[#1a102e] p-6 shadow-2xl shadow-violet-950/30 sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#7c3aed] text-xl font-bold text-white shadow-lg shadow-violet-900/40">
            F
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-[#a094b8]">Sign in to your Fluxy Tech account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#d8ccec]">
              Username or email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-[#3a2a59] bg-[#0f0a1a] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#6f6087] focus:border-[#8b5cf6] focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#d8ccec]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-[#3a2a59] bg-[#0f0a1a] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#6f6087] focus:border-[#8b5cf6] focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-3 text-sm text-[#b9accb]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="h-4 w-4 rounded border-[#4b386f] bg-[#0f0a1a] accent-[#7c3aed]"
            />
            Remember me for 30 days
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#a855f7] px-4 py-3.5 text-sm font-bold text-white transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#a094b8]">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-[#b58cff] hover:text-white">
            Create one
          </Link>
        </p>
      </section>
    </main>
  );
}
