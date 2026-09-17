import Layout from "@/components/Layout";
import { ArrowRight, Box, ServerCog, Sparkles } from "lucide-react";
import { useLocation } from "wouter";

export default function Servers() {
  const [, setLocation] = useLocation();
  const lastPlan = localStorage.getItem("fluxy_last_plan");
  return (
    <Layout>
      <div className="mx-auto max-w-[1400px] pt-2 lg:pt-10">
        <header className="border-b border-[#2d1f4e]/75 pb-7"><div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#a886dd]"><Sparkles size={14} />Compute Workspace</div><h1 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] text-white sm:text-[32px]">My Servers</h1><p className="mt-2 text-sm text-[#a094b8]">Deploy, monitor, and scale your infrastructure from one place.</p></header>
        {lastPlan && <div className="mt-6 flex items-center gap-3 rounded-2xl border border-violet-500/25 bg-violet-500/[0.08] px-4 py-3.5 text-sm text-violet-100"><Box size={18} className="text-violet-300" /><span><strong>{lastPlan}</strong> payment received. Your deployment will appear here once provisioned.</span></div>}
        <section className="mt-8 flex min-h-[440px] items-center justify-center rounded-[24px] border border-dashed border-[#3b285f] bg-[#130c25]/40 px-5 text-center">
          <div className="max-w-sm"><div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] border border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-fuchsia-500/10 text-[#b481ff] shadow-[0_0_40px_rgba(124,58,237,0.14)]"><ServerCog size={35} /></div><h2 className="mt-6 text-xl font-extrabold tracking-[-0.03em] text-white">No servers yet</h2><p className="mt-2 text-sm leading-6 text-[#a094b8]">Choose a plan to provision your first high-performance Fluxy Tech server in seconds.</p><button type="button" onClick={() => setLocation("/dashboard")} className="gradient-button mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-extrabold text-white">Buy a plan from dashboard <ArrowRight size={16} /></button></div>
        </section>
      </div>
    </Layout>
  );
}
