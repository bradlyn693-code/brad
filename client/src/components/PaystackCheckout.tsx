import { CreditCard, LockKeyhole, Loader2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { formatKesPrice, USD_TO_KES } from "@/lib/currency";
import PriceDisplay from "@/components/PriceDisplay";
import { loadPaystack } from "@/lib/paystack";

type PaystackResponse = { reference: string; [key: string]: unknown };

type CheckoutPlan = {
  name: string;
  price: number;
  priceDisplay: string;
  currency?: string;
  allowCustomAmount?: boolean;
};

type PaystackCheckoutProps = {
  plan: CheckoutPlan;
  onClose: () => void;
  onSuccess: (response: PaystackResponse, actualAmount: number) => void;
  autoOpen?: boolean;
};

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        metadata: { plan_name: string };
        callback: (response: PaystackResponse) => void;
        onClose: () => void;
      }) => { openIframe: () => void };
    };
  }
}

const publicKey = "pk_live_746fa4cd031258a58692b35c6f73e79ca330c873";

export default function PaystackCheckout({ plan, onClose, onSuccess, autoOpen = false }: PaystackCheckoutProps) {
  const [email, setEmail] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState("");
  const [paystackOpen, setPaystackOpen] = useState(false);
  const [paystackReady, setPaystackReady] = useState(() => Boolean(window.PaystackPop));
  const [paystackLoading, setPaystackLoading] = useState(() => !window.PaystackPop);
  const autoOpened = useRef(false);
  const hasCustomAmount = plan.allowCustomAmount === true;
  const actualAmount = useMemo(() => hasCustomAmount ? Number(customAmount) : plan.price, [customAmount, hasCustomAmount, plan.price]);
  const priceDisplay = hasCustomAmount && actualAmount > 0
    ? formatKesPrice(actualAmount)
    : plan.priceDisplay;

  useEffect(() => {
    setEmail(localStorage.getItem("fluxy_email") ?? "");
    let cancelled = false;
    loadPaystack()
      .then(() => { if (!cancelled) { setPaystackReady(true); setPaystackLoading(false); } })
      .catch((loadError: Error) => { if (!cancelled) { setPaystackLoading(false); setError(loadError.message); } });
    return () => { cancelled = true; };
  }, []);

  const handlePayment = () => {
    setError("");
    if (!email.trim()) {
      setError("Enter the email address where Paystack should send your receipt.");
      return;
    }
    if (!Number.isFinite(actualAmount) || actualAmount <= 0) {
      setError("Enter a valid amount greater than KES 0.00.");
      return;
    }
    if (!window.PaystackPop || !paystackReady) {
      setError("Secure checkout is still loading. Please wait a moment and try again.");
      return;
    }

    try {
      const handler = window.PaystackPop.setup({
        key: publicKey,
        email: email.trim(),
        amount: Math.round(actualAmount * 100),
        currency: plan.currency ?? "KES",
        ref: `FLUXY_${Date.now()}`,
        metadata: { plan_name: plan.name },
        callback: (response) => onSuccess(response, actualAmount),
        onClose: () => {
          setPaystackOpen(false);
          toast("Payment window closed", { description: "No payment was completed." });
        },
      });
      // Paystack appends its Inline iframe to document.body. Hide the Fluxy
      // layer only after setup succeeds so a failed initialization is recoverable.
      handler.openIframe();
      setPaystackOpen(true);
    } catch {
      setPaystackOpen(false);
      setError("Paystack could not open the payment page. Please try again.");
    }
  };

  useEffect(() => {
    if (autoOpen && !hasCustomAmount && !autoOpened.current && paystackReady && email.trim()) {
      autoOpened.current = true;
      handlePayment();
    }
  }, [autoOpen, email, hasCustomAmount, paystackReady]);

  return (
    <div className={`fixed inset-0 z-[9999] ${paystackOpen ? "pointer-events-none invisible" : "flex"} items-center justify-center overflow-y-auto bg-black/80 px-4 py-6 backdrop-blur-md`} role="dialog" aria-modal="true" aria-label={`Checkout for ${plan.name}`}>
      <div className="reveal-up relative w-full max-w-[420px] rounded-[24px] border border-[#3e286a] bg-[#1a102e] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.56),0_0_50px_rgba(124,58,237,0.18)] sm:p-8">
        <button type="button" onClick={onClose} aria-label="Close checkout" className="absolute right-5 top-5 rounded-xl border border-[#2d1f4e] bg-[#0f0a1a] p-2 text-[#a094b8] transition hover:border-[#7c3aed] hover:text-white"><X size={17} /></button>
        <div className="flex items-start gap-3 pr-10">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-[#b481ff]"><CreditCard size={20} /></div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a786df]">Secure checkout</p>
            <h2 className="mt-1 text-xl font-extrabold tracking-[-0.03em] text-white">Checkout — {plan.name}</h2>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-[#2d1f4e] bg-[#0f0a1a] p-4">
          <div className="flex items-center justify-between gap-4">
            <div><p className="text-sm font-bold text-white">{plan.name}</p><p className="mt-1 text-xs text-[#a094b8]">Billed securely through Paystack</p></div>
            <PriceDisplay value={priceDisplay} className="shrink-0 text-right text-lg font-extrabold leading-tight text-white" />
          </div>
          <p className="mt-3 text-[10px] text-[#75658e]">USD equivalents are approximate · 1 USD ≈ KES {USD_TO_KES.toFixed(2)}</p>
          {hasCustomAmount && (
            <div className="mt-4">
              <label htmlFor="custom-amount" className="mb-2 block text-xs font-medium text-[#a094b8]">Amount (KES)</label>
              <input id="custom-amount" type="number" min="1" step="1" inputMode="decimal" value={customAmount} onChange={(event) => setCustomAmount(event.target.value)} placeholder="e.g. 250" className="w-full rounded-xl border border-[#2d1f4e] bg-[#160e29] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-[#6b5a8a] focus:border-[#8b5cf6] focus:ring-2 focus:ring-violet-500/15" />
            </div>
          )}
        </div>

        <div className="mt-5">
          <label htmlFor="checkout-email" className="mb-2 block text-xs font-medium text-[#a094b8]">Receipt email</label>
          <input id="checkout-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" className="w-full rounded-xl border border-[#2d1f4e] bg-[#0f0a1a] px-3.5 py-3.5 text-sm text-white outline-none transition placeholder:text-[#6b5a8a] focus:border-[#8b5cf6] focus:ring-2 focus:ring-violet-500/15" />
        </div>

        {error && <div className="mt-4 rounded-xl border border-red-500/25 bg-red-500/10 px-3.5 py-3 text-xs leading-5 text-red-200">{error}</div>}

        <button type="button" onClick={handlePayment} disabled={paystackLoading} className="gradient-button mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-extrabold text-white disabled:cursor-wait disabled:opacity-70">
          {paystackReady ? <LockKeyhole size={16} /> : <Loader2 size={16} className="animate-spin" />} {paystackReady ? `Pay ${priceDisplay} with Paystack` : "Loading secure checkout…"}
        </button>
        <p className="mt-4 text-center text-[11px] text-[#8f80ab]"><LockKeyhole className="mr-1 inline-block h-3 w-3" />Secure payment inside Fluxy Tech • No redirect</p>
      </div>
    </div>
  );
}
