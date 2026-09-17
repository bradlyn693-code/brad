import Layout from "@/components/Layout";
import { Check, Palette, Save, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type ThemeKey = "purple" | "black" | "blue" | "green" | "red" | "gold";

type ThemeDefinition = {
  key: ThemeKey;
  name: string;
  bg: string;
  accent: string;
  card: string;
  border: string;
  description: string;
};

const themes: ThemeDefinition[] = [
  { key: "purple", name: "Deep Purple Premium", bg: "#0a0618", accent: "#7c3aed", card: "#1a102e", border: "#2d1f4e", description: "Current theme" },
  { key: "black", name: "Midnight Black", bg: "#000000", accent: "#ffffff", card: "#101010", border: "#303030", description: "AMOLED" },
  { key: "blue", name: "Ocean Blue", bg: "#020617", accent: "#0ea5e9", card: "#0b1730", border: "#183b5c", description: "Cool and focused" },
  { key: "green", name: "Forest Green", bg: "#020a03", accent: "#22c55e", card: "#0c1e10", border: "#1c4a27", description: "Calm and grounded" },
  { key: "red", name: "Crimson Red", bg: "#0a0202", accent: "#ef4444", card: "#241010", border: "#542020", description: "Bold and energetic" },
  { key: "gold", name: "Sunset Gold", bg: "#0a0802", accent: "#f59e0b", card: "#241b08", border: "#59400f", description: "Warm and luminous" },
];

function getTheme(value: string | null): ThemeDefinition {
  return themes.find((theme) => theme.key === value || theme.name === value) ?? themes[0];
}

export function applyTheme(theme: ThemeDefinition) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme.name);
  root.style.setProperty("--bg-main", theme.bg);
  root.style.setProperty("--card-bg", theme.card);
  root.style.setProperty("--border", theme.border);
  root.style.setProperty("--accent", theme.accent);
  document.body.style.backgroundColor = theme.bg;
}

export default function Settings() {
  const [theme, setTheme] = useState<ThemeKey>(() => getTheme(localStorage.getItem("fluxy_theme")).key);

  useEffect(() => {
    applyTheme(getTheme(localStorage.getItem("fluxy_theme")));
  }, []);

  const selectTheme = (nextTheme: ThemeDefinition) => {
    setTheme(nextTheme.key);
    localStorage.setItem("fluxy_theme", nextTheme.name);
    applyTheme(nextTheme);
  };

  const saveAppearance = () => {
    const selected = themes.find((item) => item.key === theme) ?? themes[0];
    localStorage.setItem("fluxy_theme", selected.name);
    applyTheme(selected);
    toast.success("Appearance saved", { description: `${selected.name} is now active across Fluxy Tech.` });
  };

  return (
    <Layout>
      <div className="mx-auto max-w-[1100px] pt-2 lg:pt-10">
        <header className="border-b border-[#2d1f4e]/75 pb-7">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#a886dd]"><Sparkles size={14} />Workspace settings</div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] text-white sm:text-[32px]">Appearance</h1>
          <p className="mt-2 text-sm text-[#a094b8]">Personalize the way your Fluxy Tech workspace looks and feels.</p>
        </header>

        <section className="mt-8 rounded-2xl border border-[#2d1f4e] bg-[#1a102e] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.2)] sm:p-6">
          <div className="flex items-start gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-[#b481ff]"><Palette size={19} /></div><div><h2 className="text-base font-extrabold text-white">Color theme</h2><p className="mt-1 text-xs leading-5 text-[#a094b8]">Choose an accent and background combination for your workspace.</p></div></div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((item) => {
              const active = theme === item.key;
              return (
                <button type="button" key={item.key} onClick={() => selectTheme(item)} aria-pressed={active} className={`group relative rounded-2xl border p-4 text-left transition duration-200 hover:-translate-y-0.5 ${active ? "border-[#7c3aed] bg-[#25153f] shadow-[0_0_24px_rgba(124,58,237,0.22)]" : "border-[#2d1f4e] bg-[#120b22] hover:border-[#62418f]"}`}>
                  <div className="flex items-center justify-between"><div className="flex items-center gap-2.5"><span className="h-8 w-8 rounded-full border-2 border-white/20 shadow-inner" style={{ background: `linear-gradient(135deg, ${item.bg} 0 50%, ${item.accent} 50% 100%)` }} /><span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.accent, boxShadow: `0 0 12px ${item.accent}` }} /></div>{active && <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7c3aed] text-white"><Check size={14} strokeWidth={3} /></span>}</div>
                  <p className="mt-4 text-sm font-extrabold text-white">{item.name}</p><p className="mt-1 text-[11px] text-[#a094b8]">{item.description}</p>
                  <div className="mt-4 flex gap-1.5"><span className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: item.bg }} /><span className="h-1.5 w-10 rounded-full" style={{ backgroundColor: item.accent }} /></div>
                </button>
              );
            })}
          </div>
          <div className="mt-7 flex flex-col gap-3 border-t border-[#2d1f4e] pt-5 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-[#8f80a7]">Theme changes preview instantly and are saved to this browser.</p><button type="button" onClick={saveAppearance} className="gradient-button inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-extrabold text-white"><Save size={16} />Save Appearance</button></div>
        </section>
      </div>
    </Layout>
  );
}
