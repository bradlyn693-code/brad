import Layout from "@/components/Layout";
import PaystackCheckout from "@/components/PaystackCheckout";
import { Ban, Check, CircleCheck, Clock3, FileSearch, ShieldCheck, Smartphone, Sparkles } from "lucide-react";
import { useState } from "react";
import { formatUsdWithKes } from "@/lib/currency";
import PriceDisplay from "@/components/PriceDisplay";

type ServicePlan = {
  name: string;
  price: number;
  priceDisplay: string;
  subtitle: string;
  description: string;
  features: string[];
  badge?: string;
  badgeClass?: string;
  cardClass: string;
  buttonClass: string;
  icon: typeof Ban;
};

const services: ServicePlan[] = [
  {
    name: "WhatsApp Ban 🪀",
    price: 780,
    priceDisplay: formatUsdWithKes(6, 780),
    subtitle: "Professional WhatsApp number banning service",
    description: "For your own testing, spammer removal, or security research. Receive educational reports on how bans happen and how to protect your number. Fast delivery 1-24h.",
    features: ["100% Success Report", "Fast 1-24h", "For Security Testing Only", "Full Reason Report", "Protection Guide Included"],
    cardClass: "hover:border-[#ef4444] hover:shadow-[0_0_36px_rgba(239,68,68,0.2)]",
    buttonClass: "bg-gradient-to-r from-[#ef4444] to-[#7c3aed] shadow-[0_10px_24px_rgba(239,68,68,0.2)]",
    icon: Ban,
  },
  {
    name: "WhatsApp Unban 🥏",
    price: 715,
    priceDisplay: formatUsdWithKes(5.5, 715),
    subtitle: "Professional recovery and appeal service",
    description: "For wrongly banned WhatsApp numbers. We help appeal and recover personal, business, or channel numbers with a high success rate. All ban types covered.",
    features: ["All Ban Types (Temp/Permanent)", "High Success 95%", "Fast Appeal 24-72h", "Works for Business & Personal", "Includes Anti-Ban Guide After Unban", "1 Week Support"],
    badge: "POPULAR • BEST",
    badgeClass: "border border-[#25D366]/45 bg-[#25D366]/15 text-[#6ee7a0] shadow-[0_0_18px_rgba(37,211,102,0.32)]",
    cardClass: "border-[#25D366]/70 shadow-[0_0_36px_rgba(37,211,102,0.18)] hover:border-[#25D366] hover:shadow-[0_0_46px_rgba(37,211,102,0.3)]",
    buttonClass: "bg-gradient-to-r from-[#25D366] to-[#7c3aed] shadow-[0_10px_24px_rgba(37,211,102,0.22)]",
    icon: ShieldCheck,
  },
];

const steps = [
  { number: "1", title: "Choose Service", text: "Select the support service that matches your WhatsApp number needs.", icon: Smartphone },
  { number: "2", title: "Enter Number + Pay", text: "Share your order details and complete the secure inline payment.", icon: CircleCheck },
  { number: "3", title: "We Deliver in 24h", text: "Receive your report, appeal update, or service result by email.", icon: Clock3 },
];

export default function WhatsAppBanUnban() {
  const [selectedService, setSelectedService] = useState<ServicePlan | null>(null);
  const checkoutPlan = selectedService ? { name: selectedService.name, price: selectedService.price, priceDisplay: selectedService.priceDisplay, currency: "KES" } : null;

  return (
    <Layout>
      <div className="mx-auto max-w-[1200px] pt-2 lg:pt-10">
        <header className="border-b border-[#2d1f4e]/75 pb-7">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#a886dd]"><Sparkles size={14} />Specialized support</div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] text-white sm:text-[32px]">WhatsApp Ban/Unban 🪀</h1>
          <p className="mt-2 text-sm text-[#a094b8]">Professional WhatsApp services</p>
        </header>

        <section className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.name} className={`fluxy-card fluxy-card-hover relative flex min-h-[500px] flex-col rounded-2xl p-6 sm:p-7 ${service.cardClass}`}>
                {service.badge && <span className={`absolute right-6 top-6 rounded-full px-2.5 py-1 text-[9px] font-extrabold tracking-[0.1em] ${service.badgeClass}`}>{service.badge}</span>}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-[#b481ff]"><Icon size={22} /></div>
                <h2 className="mt-5 text-2xl font-extrabold tracking-[-0.04em] text-white">{service.name}</h2>
                <p className="mt-1 text-xs font-semibold text-[#b8a3d7]">{service.subtitle}</p>
                <div className="mt-5 flex items-end gap-2"><PriceDisplay value={service.priceDisplay} className="text-4xl font-extrabold leading-tight tracking-[-0.06em] text-white" /><span className="mb-0.5 text-sm text-[#8f80a7]">/ service</span></div>
                <p className="mt-5 text-[13px] leading-6 text-[#a094b8]">{service.description}</p>
                <div className="my-5 h-px bg-[#2d1f4e]" />
                <ul className="space-y-3">{service.features.map((feature) => <li key={feature} className="flex items-start gap-2.5 text-[13px] leading-5 text-[#f2edfa]"><span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#7c3aed] text-white"><Check size={12} strokeWidth={3} /></span>{feature}</li>)}</ul>
                <button type="button" onClick={() => setSelectedService(service)} className={`mt-auto flex w-full items-center justify-center rounded-xl px-4 py-3.5 text-sm font-extrabold text-white transition hover:brightness-110 ${service.buttonClass}`}>BUY NOW</button>
              </article>
            );
          })}
        </section>

        <section className="mt-10 rounded-2xl border border-[#2d1f4e] bg-[#1a102e] p-6 sm:p-7">
          <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-[#b481ff]"><FileSearch size={19} /></div><div><h2 className="text-lg font-extrabold text-white">How It Works</h2><p className="mt-1 text-xs text-[#a094b8]">A clear, professional workflow from purchase to delivery.</p></div></div>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {steps.map((step) => { const Icon = step.icon; return <div key={step.number} className="rounded-xl border border-[#2d1f4e] bg-[#120b22] p-5"><div className="flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7c3aed] text-sm font-extrabold text-white">{step.number}</span><Icon size={19} className="text-[#a86dff]" /></div><h3 className="mt-5 text-sm font-extrabold text-white">{step.title}</h3><p className="mt-2 text-xs leading-5 text-[#a094b8]">{step.text}</p></div>; })}
          </div>
        </section>
      </div>
      {checkoutPlan && <PaystackCheckout plan={checkoutPlan} autoOpen onClose={() => setSelectedService(null)} onSuccess={(response) => { localStorage.setItem("fluxy_last_whatsapp_service", checkoutPlan.name); localStorage.setItem("fluxy_last_whatsapp_payment", response.reference); window.alert(`Payment success ${response.reference}`); setSelectedService(null); }} />}
    </Layout>
  );
}
