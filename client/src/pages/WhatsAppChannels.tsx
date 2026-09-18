import Layout from "@/components/Layout";
import PaystackCheckout from "@/components/PaystackCheckout";
import { Check, Megaphone, Sparkles, Target } from "lucide-react";
import { useState } from "react";

type ChannelPlan = {
  name: string;
  subtitle: string;
  price: number;
  priceDisplay: string;
  features: string[];
  badge?: string;
  badgeClass?: string;
  cardClass?: string;
  buttonClass: string;
  icon: typeof Target;
};

const channelPlans: ChannelPlan[] = [
  {
    name: "1K Followers ❤️",
    subtitle: "For new channels",
    price: 670,
    priceDisplay: "KES 670.00",
    features: ["1000 Real Followers", "Fast Delivery 24-48h", "No Drop Guarantee", "Safe & Organic", "1K Post Views Bonus"],
    buttonClass: "bg-gradient-to-r from-[#25D366] to-[#18a94e] shadow-[0_10px_24px_rgba(37,211,102,0.22)]",
    icon: Megaphone,
  },
  {
    name: "2K Followers 😃",
    subtitle: "Most popular for growth",
    price: 1390,
    priceDisplay: "KES 1,390.00",
    features: ["2000 Real Followers", "Fast Delivery 24-72h", "No Drop Guarantee", "Monetization Ready", "2K Post Views + 100 Reactions Bonus"],
    badge: "POPULAR",
    badgeClass: "bg-[#7c3aed] text-white shadow-[0_0_18px_rgba(124,58,237,0.7)]",
    cardClass: "border-[#7c3aed] shadow-[0_0_34px_rgba(124,58,237,0.24)]",
    buttonClass: "bg-gradient-to-r from-[#25D366] to-[#7c3aed] shadow-[0_10px_24px_rgba(124,58,237,0.28)]",
    icon: Sparkles,
  },
  {
    name: "5K Followers 🎯",
    subtitle: "For viral channels",
    price: 2250,
    priceDisplay: "KES 2,250.00",
    features: ["5000 Real Followers", "Fast Delivery 3-5 Days", "No Drop Lifetime", "Monetization Ready", "5K Views + 300 Reactions + Comments"],
    badge: "BEST VALUE",
    badgeClass: "border border-[#f59e0b]/60 bg-[#f59e0b]/15 text-[#fbbf24] shadow-[0_0_18px_rgba(245,158,11,0.3)]",
    cardClass: "border-[#f59e0b]/60 shadow-[0_0_34px_rgba(245,158,11,0.16)]",
    buttonClass: "bg-gradient-to-r from-[#f59e0b] to-[#25D366] shadow-[0_10px_24px_rgba(37,211,102,0.24)]",
    icon: Target,
  },
];

export default function WhatsAppChannels() {
  const [selectedPlan, setSelectedPlan] = useState<ChannelPlan | null>(null);
  const checkoutPlan = selectedPlan ? { name: selectedPlan.name, price: selectedPlan.price, priceDisplay: selectedPlan.priceDisplay } : null;

  return (
    <Layout>
      <div className="mx-auto max-w-[1200px] pt-2 lg:pt-10">
        <header className="border-b border-[#2d1f4e]/75 pb-7">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#25D366]"><Megaphone size={14} />Growth marketplace</div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] text-white sm:text-[32px]">WhatsApp Channels 📢</h1>
          <p className="mt-2 text-sm text-[#a094b8]">Boost your channel fast</p>
        </header>

        <section className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {channelPlans.map((plan) => {
            const Icon = plan.icon;
            return (
              <article key={plan.name} className={`fluxy-card fluxy-card-hover relative flex min-h-[430px] flex-col rounded-2xl p-6 hover:border-[#25D366] hover:shadow-[0_0_34px_rgba(37,211,102,0.22)] ${plan.cardClass ?? ""}`}>
                {plan.badge && <span className={`absolute right-5 top-5 rounded-full px-2.5 py-1 text-[9px] font-extrabold tracking-[0.11em] ${plan.badgeClass}`}>{plan.badge}</span>}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366]"><Icon size={21} /></div>
                <h2 className="mt-5 max-w-[220px] text-[25px] font-extrabold tracking-[-0.045em] text-white">{plan.name}</h2>
                <p className="mt-2 text-[13px] text-[#a094b8]">{plan.subtitle}</p>
                <div className="mt-6 flex items-end gap-2"><p className="text-[32px] font-extrabold leading-none tracking-[-0.06em] text-white">{plan.priceDisplay}</p><span className="mb-0.5 text-sm text-[#8f80a7]">/ one-time</span></div>
                <div className="my-5 h-px bg-[#2d1f4e]" />
                <ul className="space-y-3">{plan.features.map((feature) => <li key={feature} className="flex items-start gap-2.5 text-[13px] leading-5 text-[#f2edfa]"><span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#7c3aed] text-white"><Check size={12} strokeWidth={3} /></span>{feature}</li>)}</ul>
                <button type="button" onClick={() => setSelectedPlan(plan)} className={`mt-auto flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold text-white transition hover:brightness-110 ${plan.buttonClass}`}>BUY NOW</button>
              </article>
            );
          })}
        </section>
      </div>
      {checkoutPlan && <PaystackCheckout plan={checkoutPlan} autoOpen onClose={() => setSelectedPlan(null)} onSuccess={(response) => { localStorage.setItem("fluxy_last_channel_plan", checkoutPlan.name); localStorage.setItem("fluxy_last_channel_payment", response.reference); window.alert(`Payment success ${response.reference}`); setSelectedPlan(null); }} />}
    </Layout>
  );
}
