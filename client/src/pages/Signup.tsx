import { AlertCircle, ArrowRight, CheckCircle2, LockKeyhole, Mail, ShieldCheck, Zap } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useLocation } from "wouter";

export default function Signup() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!email.trim() || !password || !confirmPassword) return setError("Complete all fields to create your workspace.");
    if (password.length < 6) return setError("Choose a password with at least 6 characters.");
    if (password !== confirmPassword) return setError("Your password confirmation does not match.");
    setLoading(true);
    window.setTimeout(() => {
      localStorage.setItem("fluxy_logged", "true");
      localStorage.setItem("fluxy_email", email.trim());
      setLocation("/dashboard");
    }, 600);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0618] px-4 py-10">
      <div className="soft-float pointer-events-none absolute -right-36 -top-32 h-96 w-96 rounded-full bg-fuchsia-700/15 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-44 -left-24 h-96 w-96 rounded-full bg-violet-700/20 blur-[110px]" />
      <section className="reveal-up relative w-full max-w-[440px] rounded-[24px] border border-[#2d1f4e] bg-[#1a102e]/95 p-7 shadow-[0_28px_85px_rgba(0,0,0,0.5),0_0_60px_rgba(124,58,237,0.16)] sm:p-10">
        <div className="mb-8 flex items-center justify-between"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#a855f7] shadow-[0_10px_22px_rgba(124,58,237,0.35)]"><Zap size={20} fill="currentColor" /></div><div><p className="text-xl font-extrabold tracking-[-0.04em] text-white">Fluxy Tech</p><span className="inline-flex rounded-md border border-violet-400/45 px-1.5 py-0.5 text-[8px] font-extrabold tracking-[0.16em] text-violet-300">PREMIUM</span></div></div><ShieldCheck className="text-[#a86dff]" size={21} /></div>
        <h1 className="text-2xl font-extrabold tracking-[-0.035em] text-white">Build without limits</h1>
        <p className="mt-2 text-[13px] text-[#a094b8]">Create your premium cloud workspace in minutes.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div><label htmlFor="signup-email" className="mb-2 block text-xs font-semibold text-[#d1c7e4]">Email address</label><div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b5a8a]" size={17} /><input id="signup-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="alex@company.com" className="w-full rounded-xl border border-[#2d1f4e] bg-[#0f0a1a] py-3.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-[#6b5a8a] focus:border-[#8b5cf6] focus:ring-2 focus:ring-violet-500/15" /></div></div>
          <div><label htmlFor="signup-password" className="mb-2 block text-xs font-semibold text-[#d1c7e4]">Password</label><div className="relative"><LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b5a8a]" size={17} /><input id="signup-password" type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" className="w-full rounded-xl border border-[#2d1f4e] bg-[#0f0a1a] py-3.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-[#6b5a8a] focus:border-[#8b5cf6] focus:ring-2 focus:ring-violet-500/15" /></div></div>
          <div><label htmlFor="confirm-password" className="mb-2 block text-xs font-semibold text-[#d1c7e4]">Confirm password</label><div className="relative"><CheckCircle2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b5a8a]" size={17} /><input id="confirm-password" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Repeat your password" className="w-full rounded-xl border border-[#2d1f4e] bg-[#0f0a1a] py-3.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-[#6b5a8a] focus:border-[#8b5cf6] focus:ring-2 focus:ring-violet-500/15" /></div></div>
          {error && <div className="flex gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3.5 py-3 text-xs leading-5 text-red-200"><AlertCircle className="mt-0.5 shrink-0" size={15} />{error}</div>}
          <button type="submit" disabled={loading} className="gradient-button mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-extrabold text-white">{loading ? "Creating workspace..." : <><span>Create Account</span><ArrowRight size={17} /></>}</button>
        </form>
        <p className="mt-7 text-center text-[13px] text-[#a094b8]">Already have an account? <Link href="/login" className="font-bold text-[#a86dff] hover:text-[#c5a4ff]">Sign in</Link></p>
      </section>
    </main>
  );
}
