import { useState } from "react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL ?? ""; // si proxy Vite, laisse vide

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // le back attend email/password
      });
      if (!res.ok) throw new Error("register failed");
      setOk(true);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-display mb-6">Inscription</h1>

      {!ok ? (
        <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-ink/10">
          <input
            placeholder="Nom"
            className="w-full border border-ink/20 rounded-xl px-4 py-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            {loading ? "Création..." : "Créer mon compte"}
          </button>
          <p className="text-sm text-ink/70">
            Déjà inscrit ? <Link to="/login" className="text-[#7ED957 ]">Connexion</Link>
          </p>
          {err && <p className="text-red-600 text-sm">{err}</p>}
        </form>
      ) : (
        <p className="p-4 rounded-xl bg-eco/30 border border-eco/60">Compte créé.</p>
      )}
    </section>
  );
}
