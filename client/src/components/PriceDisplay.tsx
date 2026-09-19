type PriceDisplayProps = {
  value: string;
  className?: string;
  secondaryClassName?: string;
};

export default function PriceDisplay({ value, className = "", secondaryClassName = "" }: PriceDisplayProps) {
  const [primary, secondary] = value.split("\n");
  return (
    <span className={`block ${className}`}>
      <span className="block">{primary}</span>
      {secondary && <span className={`mt-1 block text-[0.42em] font-semibold leading-tight tracking-normal text-[#a094b8] ${secondaryClassName}`}>{secondary}</span>}
    </span>
  );
}
