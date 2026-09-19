import Layout from "@/components/Layout";
import PaystackCheckout from "@/components/PaystackCheckout";
import { Check, Cpu, Gauge, HardDrive, MemoryStick, Network, ShieldCheck, ServerCog } from "lucide-react";
import { useState } from "react";
import { formatKesPrice } from "@/lib/currency";
import PriceDisplay from "@/components/PriceDisplay";

type VPSPlan = {
  name: string;
  price: number;
  priceDisplay: string;
  subtitle: string;
  description: string;
  features: string[];
  accent: string;
  cardClass?: string;
  badge?: string;
  icon: typeof MemoryStick;
};

const vpsPlans: VPSPlan[] = [
  {
    name: "8GB RAM VPS 🖥️",
    price: 980,
    priceDisplay: formatKesPrice(980),
    subtitle: "Reliable starter compute",
    description: "A balanced virtual server for personal projects, development environments, lightweight websites, and small business tools.",
    features: ["8GB dedicated RAM", "4 vCPU cores", "100GB NVMe SSD", "1TB monthly bandwidth", "DDoS protection"],
    accent: "#8b5cf6",
    icon: ServerCog,
  },
  {
    name: "12GB RAM VPS 🏈",
    price: 1600,
    priceDisplay: formatKesPrice(1600),
    subtitle: "Built for growing workloads",
    description: "Extra memory and processing headroom for busy websites, APIs, automation, and multi-service deployments.",
    features: ["12GB dedicated RAM", "6 vCPU cores", "160GB NVMe SSD", "2TB monthly bandwidth", "Priority network routing"],
    accent: "#a855f7",
    cardClass: "border-[#7c3aed] shadow-[0_0_34px_rgba(124,58,237,0.24)]",
    badge: "POPULAR",
    icon: Gauge,
  },
  {
    name: "24GB RAM VPS ⚾",
    price: 3500,
    priceDisplay: formatKesPrice(3500),
    subtitle: "Performance for production",
    description: "A production-ready tier for resource-intensive applications, databases, e-commerce, and high-traffic services.",
    features: ["24GB dedicated RAM", "8 vCPU cores", "240GB NVMe SSD", "4TB monthly bandwidth", "Advanced monitoring"],
    accent: "#c084fc",
    icon: Cpu,
  },
  {
    name: "48GB RAM VPS 🏓",
    price: 4900,
    priceDisplay: formatKesPrice(4900),
    subtitle: "Power for ambitious teams",
    description: "High-capacity infrastructure for large databases, container stacks, game services, and demanding business workloads.",
    features: ["48GB dedicated RAM", "12 vCPU cores", "400GB NVMe SSD", "6TB monthly bandwidth", "Dedicated support"],
    accent: "#e879f9",
    cardClass: "border-fuchsia-500/50 shadow-[0_0_34px_rgba(232,121,249,0.16)]",
    icon: Network,
  },
  {
    name: "64GB RAM VPS ⛳",
    price: 6000,
    priceDisplay: formatKesPrice(6000),
    subtitle: "Maximum virtual capacity",
    description: "Our flagship VPS for demanding production systems, large-scale platforms, analytics workloads, and power users.",
    features: ["64GB dedicated RAM", "16 vCPU cores", "600GB NVMe SSD", "10TB monthly bandwidth", "Priority 24/7 support"],
    accent: "#f59e0b",
    cardClass: "border-[#f59e0b]/60 shadow-[0_0_34px_rgba(245,158,11,0.18)]",
    badge: "MAX POWER",
    icon: HardDrive,
  },
];

export default function VPS() {
  const [selectedPlan, setSelectedPlan] = useState<VPSPlan | null>(null);
  const checkoutPlan = selectedPlan ? { name: selectedPlan.name, price: selectedPlan.price, priceDisplay: selectedPlan.priceDisplay } : null;

  return (
    <Layout>
      <div className="mx-auto max-w-[1280px] pt-2 lg:pt-10">
        <header className="border-b border-[#2d1f4e]/75 pb-7">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#b481ff]"><ServerCog size={14} />Virtual private servers</div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.05em] text-white sm:text-[38px]">VPS 🖥️</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#a094b8]">Premium virtual servers with dedicated resources, fast NVMe storage, and the flexibility to run your projects your way.</p>
        </header>

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[{ icon: MemoryStick, label: "Dedicated RAM" }, { icon: ShieldCheck, label: "DDoS protected" }, { icon: Gauge, label: "Fast deployment" }].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl border border-[#2d1f4e] bg-[#1a102e]/70 px-4 py-3 text-xs font-semibold text-[#d9ccef]"><Icon size={17} className="text-[#b481ff]" />{label}</div>
          ))}
        </div>

        <section className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {vpsPlans.map((plan) => {
            const Icon = plan.icon;
            return (
              <article key={plan.name} className={`fluxy-card fluxy-card-hover relative flex min-h-[445px] flex-col rounded-2xl p-6 hover:border-[#a855f7] hover:shadow-[0_0_34px_rgba(168,85,247,0.22)] ${plan.cardClass ?? ""}`}>
                {plan.badge && <span className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[9px] font-extrabold tracking-[0.11em] text-white">{plan.badge}</span>}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${plan.accent}20`, color: plan.accent }}><Icon size={21} /></div>
                <h2 className="mt-5 max-w-[245px] text-[24px] font-extrabold tracking-[-0.045em] text-white">{plan.name}</h2>
                <p className="mt-1 text-[13px] font-semibold" style={{ color: plan.accent }}>{plan.subtitle}</p>
                <p className="mt-3 min-h-[66px] text-[13px] leading-5 text-[#a094b8]">{plan.description}</p>
                <div className="mt-4 flex items-end gap-2"><PriceDisplay value={plan.priceDisplay} className="text-[31px] font-extrabold leading-tight tracking-[-0.06em] text-white" /><span className="mb-0.5 text-sm text-[#8f80a7]">/ month</span></div>
                <div className="my-5 h-px bg-[#2d1f4e]" />
                <ul className="space-y-2.5">{plan.features.map((feature) => <li key={feature} className="flex items-center gap-2.5 text-[13px] text-[#f2edfa]"><span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#7c3aed] text-white"><Check size={12} strokeWidth={3} /></span>{feature}</li>)}</ul>
                <button type="button" onClick={() => setSelectedPlan(plan)} className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#c026d3] px-4 py-3 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(124,58,237,0.24)] transition hover:brightness-110"><ServerCog size={16} />BUY NOW</button>
              </article>
            );
          })}
        </section>
      </div>
      {checkoutPlan && <PaystackCheckout plan={checkoutPlan} autoOpen onClose={() => setSelectedPlan(null)} onSuccess={(response) => { localStorage.setItem("fluxy_last_vps_plan", checkoutPlan.name); localStorage.setItem("fluxy_last_vps_payment", response.reference); window.alert(`Payment success ${response.reference}`); setSelectedPlan(null); }} />}
    </Layout>
  );
}
