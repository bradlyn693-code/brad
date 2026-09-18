export const USD_TO_KES = 129.38;

export function formatKesPrice(kes: number) {
  const usd = kes / USD_TO_KES;
  return `KES ${kes.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} · ≈ $${usd.toFixed(2)}`;
}

export function formatUsdWithKes(usd: number, kes: number) {
  return `$${usd.toFixed(2)} · ≈ KES ${kes.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatKesWithUsd(kes: number) {
  const usd = kes / USD_TO_KES;
  return `KES ${kes.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} · ≈ $${usd.toFixed(2)}`;
}
