import Layout from "@/components/Layout";
import PaystackCheckout from "@/components/PaystackCheckout";
import { Activity, Bell, Check, CircleHelp, CreditCard, Database, HardDrive, Search, Server, Zap } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

type Plan = {
  name: string;
  subtitle: string;
  price: number | null;
  priceDisplay: string;
  features: string[];
  popular?: boolean;
  action?: string;
  admin?: boolean;
};

const plans: Plan[] = [
  { name: "Starter", subtitle: "For personal projects and lightweight apps", price: 50, priceDisplay: "KES 50.00", features: ["1024 MB Memory", "5120 MB Disk", "100% CPU", "1 Database", "1 Backup"] },
  { name: "Basic", subtitle: "For growing sites and small teams", price: 80, priceDisplay: "KES 80.00", features: ["1536 MB Memory", "7680 MB Disk", "150% CPU", "2 Databases", "2 Backups"] },
  { name: "Standard", subtitle: "Our most popular plan", price: 100, priceDisplay: "KES 100.00", popular: true, features: ["2048 MB Memory", "10240 MB Disk", "200% CPU", "3 Databases", "3 Backups"] },
  { name: "Pro", subtitle: "For larger high-traffic workloads", price: 150, priceDisplay: "KES 150.00", features: ["4096 MB Memory", "20480 MB Disk", "300% CPU", "5 Databases", "5 Backups"] },
  { name: "Unlimited", subtitle: "No caps on RAM, disk or CPU", price: 250, priceDisplay: "KES 250.00", features: ["0 MB Memory (Unlimited)", "0 MB Disk (Unlimited)", "0% CPU (Unlimited)", "10 Databases", "10 Backups"] },
  { name: "Admin Panel 🎯", subtitle: "For hosting providers & Pterodactyl admins", price: 450, priceDisplay: "KES 450.00", admin: true, features: ["Unlimited Memory/Disk/CPU", "Unlimited Databases/Backups/Servers", "Full Pterodactyl Admin Access", "Manage Users, Servers, Nodes, Allocations", "Nest & Egg Management", "Database & Location Management", "Server Import/Suspend/Delete", "User Impersonation & Logs", "24/7 Priority + Root Access"] },
];

const stats = [
  { label: "Active Servers", value: "12/20", note: "+2 added this month", icon: Server, color: "bg-violet-500/15 text-violet-300" },
  { label: "Wallet Balance", value: "$1,240.50", note: "Available for renewals", icon: CreditCard, color: "bg-fuchsia-500/15 text-fuchsia-300" },
  { label: "Monthly Usage", value: "78%", note: "of Pro plan limit", icon: Activity, color: "bg-indigo-500/15 text-indigo-300" },
];

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const checkoutPlan = selectedPlan && selectedPlan.price !== null
    ? { name: selectedPlan.name, price: selectedPlan.price, priceDisplay: selectedPlan.priceDisplay }
    : null;

  const handlePlan = (plan: Plan) => {
    if (plan.price === null) {
      toast("Sales concierge", { description: "Custom plan requests are ready for your account manager." });
      return;
    }
    setSelectedPlan(plan);
  };

  return (
    <Layout>
      <div className="mx-auto max-w-[1400px] pt-2 lg:pt-10">
        <header className="flex flex-col gap-6 border-b border-[#2d1f4e]/75 pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="reveal-up">
            <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#a886dd]"><Zap size={14} fill="currentColor" />Infrastructure Workspace</div>
            <h1 className="text-4xl font-extrabold tracking-[-0.055em] text-white sm:text-5xl">Pricing &amp; Plans</h1>
            <p className="mt-3 text-sm text-[#a094b8]">Choose the perfect plan for your infrastructure <span className="mx-1 text-[#6b5a8a]">•</span> Upgrade anytime, cancel anytime</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <label className="relative hidden w-[205px] sm:block"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b5a8a]" /><input type="search" placeholder="Search plans..." className="w-full rounded-xl border border-[#2d1f4e] bg-[#1a102e] py-2.5 pl-10 pr-3 text-xs text-white outline-none transition placeholder:text-[#6b5a8a] focus:border-[#7c3aed]" /></label>
            <button type="button" aria-label="Notifications" onClick={() => toast("You’re all caught up") } className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#2d1f4e] bg-[#1a102e] text-[#a094b8] transition hover:border-[#7c3aed] hover:text-white"><Bell size={18} /><span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-violet-400" /></button>
            <button type="button" aria-label="Help" onClick={() => toast("Fluxy Help Center", { description: "Plan selection, payments and deployment guidance are one click away." })} className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#2d1f4e] bg-[#1a102e] text-[#a094b8] transition hover:border-[#7c3aed] hover:text-white"><CircleHelp size={18} /></button>
          </div>
        </header>

        <section className="reveal-up-delay mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return <article key={stat.label} className="fluxy-card fluxy-card-hover rounded-2xl p-4"><div className="flex items-start justify-between"><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}><Icon size={19} /></div><span className="rounded-full bg-violet-500/10 px-2 py-1 text-[10px] font-bold text-[#af85e8]">Live</span></div><p className="mt-4 text-[13px] font-medium text-[#a094b8]">{stat.label}</p><p className="mt-1 text-[30px] font-extrabold tracking-[-0.05em] text-white">{stat.value}</p><p className="mt-1 text-[11px] text-[#827195]">{stat.note}</p></article>;
          })}
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between"><div><p className="text-sm font-extrabold text-white">Launch-ready capacity</p><p className="mt-1 text-xs text-[#8f80a7]">All plans include DDoS protection and instant deployment.</p></div><div className="hidden items-center gap-1.5 text-xs text-[#a094b8] sm:flex"><Database size={14} className="text-[#a86dff]" /> Kenya region</div></div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.name} className={`fluxy-card fluxy-card-hover relative flex min-h-[410px] flex-col rounded-2xl p-6 ${plan.popular ? "border-[#7c3aed] shadow-[0_18px_45px_rgba(124,58,237,0.25)]" : ""} ${plan.admin ? "border-[#f59e0b]/80 shadow-[0_0_32px_rgba(245,158,11,0.22),0_18px_45px_rgba(124,58,237,0.18)]" : ""}`}>
                {plan.popular && <span className="absolute right-5 top-5 rounded-full bg-[#7c3aed] px-2.5 py-1 text-[9px] font-extrabold tracking-[0.11em] text-white shadow-[0_0_18px_rgba(124,58,237,0.75)]">POPULAR</span>}
                {plan.admin && <span className="absolute right-5 top-5 rounded-full border border-[#f59e0b]/60 bg-gradient-to-r from-[#f59e0b]/25 to-[#7c3aed]/35 px-2.5 py-1 text-[9px] font-extrabold tracking-[0.1em] text-[#fbbf24] shadow-[0_0_18px_rgba(245,158,11,0.25)]">ADMIN POWER</span>}
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${plan.admin ? "bg-[#f59e0b]/15 text-[#fbbf24]" : "bg-violet-500/15 text-[#b481ff]"}`}><HardDrive size={19} /></div>
                <h2 className="mt-5 text-[26px] font-extrabold tracking-[-0.045em] text-white">{plan.name}</h2>
                <p className="mt-1 h-10 max-w-[225px] text-[13px] leading-5 text-[#a094b8]">{plan.subtitle}</p>
                <div className="mt-5 flex items-end gap-2"><p className="text-[34px] font-extrabold leading-none tracking-[-0.06em] text-white">{plan.priceDisplay}</p>{plan.price !== null && <span className="mb-0.5 text-sm text-[#8f80a7]">/ month</span>}</div>
                <div className="my-5 h-px bg-[#2d1f4e]" />
                <ul className="space-y-3">{plan.features.map((feature) => <li key={feature} className="flex items-center gap-2.5 text-[13px] text-[#f2edfa]"><span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#7c3aed] text-white"><Check size={12} strokeWidth={3} /></span>{feature}</li>)}</ul>
                <button type="button" onClick={() => handlePlan(plan)} className={`mt-auto w-full rounded-xl px-4 py-3 text-sm font-extrabold text-white transition hover:brightness-110 ${plan.admin ? "bg-gradient-to-r from-[#f59e0b] to-[#7c3aed] shadow-[0_10px_24px_rgba(245,158,11,0.2)]" : "gradient-button"}`}>{plan.action ?? "BUY NOW"}</button>
              </article>
            ))}
          </div>
        </section>
      </div>
      {checkoutPlan && <PaystackCheckout plan={checkoutPlan} onClose={() => setSelectedPlan(null)} onSuccess={(response) => { localStorage.setItem("fluxy_last_plan", checkoutPlan.name); localStorage.setItem("fluxy_last_payment", response.reference); window.alert(`Payment success ${response.reference}`); setSelectedPlan(null); setLocation("/servers"); }} />}
    </Layout>
  );
}
