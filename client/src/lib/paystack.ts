const PAYSTACK_SRC = "https://js.paystack.co/v1/inline.js";

export function loadPaystack(): Promise<void> {
  if (window.PaystackPop) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${PAYSTACK_SRC}"]`);
    const script = existing ?? document.createElement("script");
    let settled = false;

    const finish = (error?: Error) => {
      if (settled) return;
      settled = true;
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
      if (error) reject(error);
      else if (window.PaystackPop) resolve();
      else reject(new Error("Paystack loaded without its checkout API."));
    };
    const onLoad = () => finish();
    const onError = () => finish(new Error("Paystack checkout could not be loaded."));

    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener("error", onError, { once: true });
    if (!existing) {
      script.src = PAYSTACK_SRC;
      script.async = true;
      script.id = "paystack-inline-script";
      document.head.appendChild(script);
    }

    window.setTimeout(() => {
      if (!window.PaystackPop) finish(new Error("Paystack checkout timed out. Check your connection and try again."));
      else finish();
    }, 15000);
  });
}
