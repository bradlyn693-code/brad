import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Ban,
  Boxes,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  Megaphone,
  Rocket,
  Server,
  Settings,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

type MenuItem = {
  label: string;
  path?: string;
  icon: LucideIcon;
  color?: string;
};

const primaryNavigation: MenuItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "My Servers", path: "/servers", icon: Server },
  { label: "Wallet", path: "/wallet", icon: Wallet },
  { label: "WhatsApp Channels 📢", path: "/whatsapp-channels", icon: Megaphone, color: "#25D366" },
  { label: "WhatsApp Ban/Unban 🪀", path: "/whatsapp-ban-unban", icon: Ban, color: "#ef4444" },
];

const secondaryNavigation: MenuItem[] = [
  { label: "Deployments", icon: Rocket },
  { label: "Analytics", icon: BarChart3 },
  { label: "Team", icon: Users },
  { label: "Settings", path: "/settings", icon: Settings },
];

function Brand() {
  return (
    <div className="flex items-center gap-3 px-5 py-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-[0_10px_24px_rgba(124,58,237,0.35)]">
        <Zap size={20} fill="currentColor" />
      </div>
      <div className="min-w-0">
        <div className="text-[17px] font-extrabold tracking-[-0.03em] text-white">Fluxy Tech</div>
        <div className="mt-0.5 text-[9px] font-bold tracking-[0.18em] text-violet-300">PREMIUM CLOUD</div>
      </div>
    </div>
  );
}

function Navigation({ onNavigate }: { onNavigate?: () => void }) {
  const [location, setLocation] = useLocation();
  const handleComingSoon = (label: string) => {
    toast(`${label} is coming soon`, { description: "This preview is focused on the core billing and server workspace." });
    onNavigate?.();
  };

  return (
    <nav className="px-3">
      <p className="px-3 pb-2 pt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6b5a8a]">Workspace</p>
      <div className="space-y-1">
        {primaryNavigation.map((item) => {
          const Icon = item.icon;
          const active = location === item.path;
          const iconClass = item.color ? "group-hover:brightness-110" : active ? "text-[#b481ff]" : "text-[#87769f] group-hover:text-[#c6a4ff]";
          return (
            <Link
              key={item.label}
              href={item.path!}
              onClick={onNavigate}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-semibold transition ${active ? "bg-[#1a102e] text-white" : "text-[#a094b8] hover:bg-[#1a102e]/60 hover:text-white"}`}
            >
              {active && <span className="absolute -left-3 h-7 w-1 rounded-r-full bg-[#7c3aed] shadow-[0_0_12px_rgba(124,58,237,0.9)]" />}
              <Icon size={18} className={iconClass} color={item.color} />
              {item.label}
            </Link>
          );
        })}
      </div>
      <p className="px-3 pb-2 pt-8 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6b5a8a]">Manage</p>
      <div className="space-y-1">
        {secondaryNavigation.map((item) => {
          const Icon = item.icon;
          const active = location === item.path;
          if (item.path) {
            return (
              <Link
                key={item.label}
                href={item.path}
                onClick={onNavigate}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-semibold transition ${active ? "bg-[#1a102e] text-white" : "text-[#a094b8] hover:bg-[#1a102e]/60 hover:text-white"}`}
              >
                {active && <span className="absolute -left-3 h-7 w-1 rounded-r-full bg-[#7c3aed] shadow-[0_0_12px_rgba(124,58,237,0.9)]" />}
                <Icon size={18} className={active ? "text-[#b481ff]" : "text-[#87769f] group-hover:text-[#c6a4ff]"} />
                {item.label}
              </Link>
            );
          }
          return (
            <button
              type="button"
              key={item.label}
              onClick={() => handleComingSoon(item.label)}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-semibold text-[#a094b8] transition hover:bg-[#1a102e]/60 hover:text-white"
            >
              <Icon size={18} className="text-[#87769f] group-hover:text-[#c6a4ff]" />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function AccountCard() {
  const [, setLocation] = useLocation();
  const signOut = () => {
    localStorage.clear();
    setLocation("/login");
    toast.success("Signed out securely");
  };

  return (
    <div className="mx-3 mb-4 rounded-2xl border border-[#2d1f4e] bg-[#140d27] p-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-xs font-extrabold text-white">FT</div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold text-white">Alex Morgan</p>
          <p className="mt-0.5 text-[11px] text-[#a094b8]">Pro Plan</p>
        </div>
        <Boxes size={16} className="text-[#755d9f]" />
      </div>
      <button type="button" onClick={signOut} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/15 bg-red-500/[0.06] py-2 text-[11px] font-bold text-red-400 transition hover:bg-red-500/10 hover:text-red-300">
        <LogOut size={14} /> Sign Out
      </button>
    </div>
  );
}

function Sidebar({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  return (
    <aside className={mobile ? "flex h-full w-[280px] flex-col bg-[#0e0a1a]" : "fixed inset-y-0 left-0 z-40 hidden w-[260px] flex-col border-r border-[#2d1f4e] bg-[#0e0a1a] lg:flex"}>
      <Brand />
      <div className="flex-1 overflow-y-auto pb-5"><Navigation onNavigate={onNavigate} /></div>
      <AccountCard />
    </aside>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="fluxy-shell">
      <Sidebar />
      <button
        type="button"
        aria-label="Open navigation"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-xl border border-[#2d1f4e] bg-[#1a102e]/95 text-white shadow-lg backdrop-blur lg:hidden"
      >
        <Menu size={20} />
      </button>
      {mobileOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button type="button" aria-label="Close navigation" onClick={() => setMobileOpen(false)} className="absolute inset-0 bg-black/65 backdrop-blur-sm" />
          <div className="relative h-full shadow-[25px_0_60px_rgba(0,0,0,0.45)]">
            <button type="button" aria-label="Close navigation" onClick={() => setMobileOpen(false)} className="absolute right-3 top-4 z-10 rounded-lg p-2 text-[#a094b8] hover:bg-[#1a102e] hover:text-white"><X size={19} /></button>
            <Sidebar mobile onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
      <main className="min-h-screen px-4 pb-10 pt-20 lg:ml-[260px] lg:px-10 lg:pb-14 lg:pt-0">{children}</main>
    </div>
  );
}
