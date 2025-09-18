import { createContext, useContext, useEffect, useMemo, useState } from "react";
const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

type User = { id: string; email: string; name?: string } | null;
type Ctx = { user: User; token: string | null; login: (t: string)=>void; logout: ()=>void; refresh: ()=>Promise<void> };
const AuthCtx = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<User>(null);

  async function refresh() {
    if (!token) { setUser(null); return; }
    const r = await fetch(`${API}/api/me`, { headers: { Authorization: `Bearer ${token}` } });
    setUser(r.ok ? await r.json() : null);
  }
  function login(t: string) { localStorage.setItem("token", t); setToken(t); }
  function logout() { localStorage.removeItem("token"); setToken(null); setUser(null); }

  useEffect(() => { void refresh(); }, [token]);
  const value = useMemo(() => ({ user, token, login, logout, refresh }), [user, token]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
