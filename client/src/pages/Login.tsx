import { ArrowRight, Check, Eye, EyeOff, LockKeyhole, Mail, Zap } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { getSession, signIn } from "@/lib/auth";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSession().then((session) => { if (session.authenticated) setLocation("/dashboard"); }).catch(() => undefined);
  }, [setLocation]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      return;
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      return;
    }
    setLoading(true);
    try {
      await signIn(normalizedEmail, password, remember);
      setLocation("/dashboard");
    } catch {
      // Keep the sign-in screen clean without exposing server or deployment details.
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0618] px-4 py-10">
      <div className="soft-float pointer-events-none absolute -left-32 -top-36 h-96 w-96 rounded-full bg-violet-700/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-48 -right-24 h-96 w-96 rounded-full bg-fuchsia-700/15 blur-[110px]" />
      <section className="reveal-up relative w-full max-w-[400px] rounded-[24px] border border-[#2d1f4e] bg-[#1a102e]/95 p-7 shadow-[0_28px_85px_rgba(0,0,0,0.5),0_0_60px_rgba(124,58,237,0.16)] sm:p-10">
        <div className="mb-9 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#a855f7] shadow-[0_10px_22px_rgba(124,58,237,0.35)]"><Zap size={20} fill="currentColor" /></div>
          <div><p className="text-xl font-extrabold tracking-[-0.04em] text-white">Fluxy Tech</p><span className="inline-flex rounded-md border border-violet-400/45 px-1.5 py-0.5 text-[8px] font-extrabold tracking-[0.16em] text-violet-300">PREMIUM</span></div>
        </div>
        <h1 className="text-2xl font-extrabold tracking-[-0.035em] text-white">Welcome back</h1>
        <p className="mt-2 text-[13px] text-[#a094b8]">Sign in to your dashboard</p>

        <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="mb-2 block text-xs font-semibold text-[#d1c7e4]">Email address</label>
            <div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b5a8a]" size={17} /><input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" className="w-full rounded-xl border border-[#2d1f4e] bg-[#0f0a1a] py-3.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-[#6b5a8a] focus:border-[#8b5cf6] focus:ring-2 focus:ring-violet-500/15" /></div>
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between"><label htmlFor="password" className="block text-xs font-semibold text-[#d1c7e4]">Password</label><Link href="/reset-password" className="text-xs font-semibold text-[#9f6cff] hover:text-[#c09cff]">Forgot password?</Link></div>
            <div className="relative"><LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b5a8a]" size={17} /><input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="w-full rounded-xl border border-[#2d1f4e] bg-[#0f0a1a] py-3.5 pl-10 pr-11 text-sm text-white outline-none transition placeholder:text-[#6b5a8a] focus:border-[#8b5cf6] focus:ring-2 focus:ring-violet-500/15" /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6b5a8a] hover:text-[#c5b1e5]">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>
          </div>
          <label className="flex items-center gap-2.5 pt-0.5 text-xs text-[#a094b8]"><span className={`flex h-[18px] w-[18px] items-center justify-center rounded-md border ${remember ? "border-[#7c3aed] bg-[#7c3aed] text-white" : "border-[#4b386f] bg-[#0f0a1a]"}`}><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="sr-only" />{remember && <Check size={13} strokeWidth={3} />}</span>Remember me</label>
          <button type="submit" disabled={loading} className="gradient-button mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-extrabold text-white">{loading ? "Signing in..." : <><span>Sign In</span><ArrowRight size={17} /></>}</button>
        </form>
        <p className="mt-7 text-center text-[13px] text-[#a094b8]">Don&apos;t have an account? <Link href="/signup" className="font-bold text-[#a86dff] hover:text-[#c5a4ff]">Create one</Link></p>
      </section>
    </main>
  );
}
