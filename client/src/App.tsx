import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Redirect, Route, Switch } from "wouter";
import { useEffect, useState } from "react";
import { getSession } from "@/lib/auth";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Servers from "./pages/Servers";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import Wallet from "./pages/Wallet";
import WhatsAppChannels from "./pages/WhatsAppChannels";
import WhatsAppBanUnban from "./pages/WhatsAppBanUnban";
import VPS from "./pages/VPS";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<"checking" | "authenticated" | "unauthenticated">("checking");
  useEffect(() => {
    let active = true;
    getSession().then((session) => { if (active) setState(session.authenticated ? "authenticated" : "unauthenticated"); }).catch(() => { if (active) setState("unauthenticated"); });
    return () => { active = false; };
  }, []);
  if (state === "checking") return <div className="flex min-h-screen items-center justify-center bg-[#0a0618] text-sm text-[#a094b8]">Checking your secure session…</div>;
  return state === "authenticated" ? <>{children}</> : <Redirect to="/login" />;
}

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/reset-password" component={Login} />
      <Route path="/dashboard">
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      </Route>
      <Route path="/servers">
        <ProtectedRoute><Servers /></ProtectedRoute>
      </Route>
      <Route path="/wallet">
        <ProtectedRoute><Wallet /></ProtectedRoute>
      </Route>
      <Route path="/vps">
        <ProtectedRoute><VPS /></ProtectedRoute>
      </Route>
      <Route path="/whatsapp-channels">
        <ProtectedRoute><WhatsAppChannels /></ProtectedRoute>
      </Route>
      <Route path="/whatsapp-ban-unban">
        <ProtectedRoute><WhatsAppBanUnban /></ProtectedRoute>
      </Route>
      <Route path="/settings">
        <ProtectedRoute><Settings /></ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster richColors position="top-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
