import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL ?? ""; // "" si proxy Vite vers 3000

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const nav = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("login failed");
      const { token } = await res.json();
      localStorage.setItem("token", token);
      nav("/"); // redirige après succès
    } catch {
      setErr("Échec de connexion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-display mb-6">Connexion</h1>

      <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-ink/10">
        <input
          required
          type="email"
          placeholder="Email"
          className="w-full border border-ink/20 rounded-xl px-4 py-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Mot de passe"
          className="w-full border border-ink/20 rounded-xl px-4 py-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading} className="w-full px-4 py-3 rounded-xl bg-green text-white">
          {loading ? "Connexion..." : "Se connecter"}
        </button>
        <p className="text-sm text-ink/70">
          Pas de compte ? <Link to="/register" className="text-green">Inscription</Link>
        </p>
        {err && <p className="text-red-600 text-sm">{err}</p>}
      </form>
    </section>
  );
}
