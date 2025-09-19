import { useEffect, useState } from "react";

/** Types **/
type Tab = "profile" | "rentals" | "invoices" | "payments";

const tabs: { key: Tab; label: string }[] = [
  { key: "profile", label: "Profil" },
  { key: "rentals", label: "Locations" },
  { key: "invoices", label: "Factures" },
  { key: "payments", label: "Paiements" },
];

type User = { email: string; name?: string };
type Rental = { _id: string; scooterId: string; startedAt: string | number | Date; endedAt?: string | number | Date | null; price: number };
type Invoice = { _id: string; createdAt: string | number | Date; provider: string; amount: number; status: "paid" | "unpaid" | "pending" | string };
type PaymentMethod = { _id: string; provider: "card" | "paypal" | "applepay" | string; label?: string | null; last4?: string | null };

/** Helper fetch avec token **/
const apiFetch = async <T,>(url: string, init: RequestInit = {}): Promise<T> => {
  const token = localStorage.getItem("token");
  const headers = { ...init.headers, Authorization: token ? `Bearer ${token}` : "" };
  const res = await fetch(url, { ...init, headers });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
};

/** Composant **/
export default function Account() {
  const [tab, setTab] = useState<Tab>("profile");

  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [rentals, setRentals] = useState<Rental[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [pms, setPms] = useState<PaymentMethod[]>([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Initial load **/
  useEffect(() => {
    let alive = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [u, r, i, pm] = await Promise.all([
          apiFetch<User>("/api/me"),
          apiFetch<Rental[]>("/api/me/rentals"),
          apiFetch<Invoice[]>("/api/me/invoices"),
          apiFetch<PaymentMethod[]>("/api/me/payment-methods"),
        ]);
        if (!alive) return;
        setUser(u);
        setEmail(u.email ?? "");
        setName(u.name ?? "");
        setRentals(r);
        setInvoices(i);
        setPms(pm);
      } catch (e: any) {
        if (alive) setError(e.message ?? "Erreur inattendue");
      } finally {
        if (alive) setLoading(false);
      }
    };
    load();
    return () => {
      alive = false;
    };
  }, []);

  /** Actions **/
  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await apiFetch<User>("/api/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,                          // utilise l’état email
          password: password || undefined // vide => pas de changement
        }),
      });
      setUser(updated);
      setEmail(updated.email ?? "");
      setName(updated.name ?? "");
      setPassword("");
    } catch (e: any) {
      setError(e.message ?? "Impossible d’enregistrer le profil");
    } finally {
      setSaving(false);
    }
  };

  const addPayment = async (provider: PaymentMethod["provider"]) => {
    setError(null);
    try {
      const created = await apiFetch<PaymentMethod>("/api/me/payment-methods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider }),
      });
      setPms((prev) => [created, ...prev]);
    } catch (e: any) {
      setError(e.message ?? "Ajout du moyen de paiement échoué");
    }
  };

  const removePayment = async (id: string) => {
    setError(null);
    try {
      await apiFetch<void>(`/api/me/payment-methods/${id}`, { method: "DELETE" });
      setPms((prev) => prev.filter((p) => p._id !== id));
    } catch (e: any) {
      setError(e.message ?? "Suppression échouée");
    }
  };

  /** UI **/
  if (loading) {
    return (
      <section className="mx-auto max-w-3xl p-4">
        <div className="animate-pulse text-sm text-gray-500">Chargement…</div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl p-4 space-y-6">
      {/* Onglets */}
      <div className="flex gap-2">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-3 py-1 rounded ${tab === key ? "bg-green text-white" : "border"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Profil */}
      {tab === "profile" && (
        <div className="space-y-3 border rounded p-4">
          <label className="block">
            Email
            <input
              type="email"
              className="block border rounded px-3 py-2 w-full mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="block">
            Nom
            <input
              type="text"
              className="block border rounded px-3 py-2 w-full mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="block">
            Nouveau mot de passe
            <input
              type="password"
              className="block border rounded px-3 py-2 w-full mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button
            onClick={saveProfile}
            disabled={saving}
            className="px-3 py-2 rounded bg-ink text-white disabled:opacity-50"
          >
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      )}

      {/* Locations */}
      {tab === "rentals" && (
        <div className="border rounded p-4 overflow-auto">
          {rentals.length === 0 ? (
            <div className="text-sm text-gray-600">Aucune location</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="py-1 pr-2">Trottinette</th>
                  <th className="py-1 pr-2">Début</th>
                  <th className="py-1 pr-2">Fin</th>
                  <th className="py-1 pr-2">Prix</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((r) => (
                  <tr key={r._id} className="border-t">
                    <td className="py-2 pr-2">{r.scooterId}</td>
                    <td className="py-2 pr-2">{new Date(r.startedAt).toLocaleString()}</td>
                    <td className="py-2 pr-2">{r.endedAt ? new Date(r.endedAt).toLocaleString() : "—"}</td>
                    <td className="py-2 pr-2">{r.price.toFixed(2)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Factures */}
      {tab === "invoices" && (
        <div className="border rounded p-4">
          {invoices.length === 0 ? (
            <div className="text-sm text-gray-600">Aucune facture</div>
          ) : (
            invoices.map((i) => (
              <div key={i._id} className="flex items-center justify-between border-b py-2">
                <div>{new Date(i.createdAt).toLocaleDateString()} · {i.provider}</div>
                <div>{i.amount.toFixed(2)} € · {i.status}</div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Paiements */}
      {tab === "payments" && (
        <div className="space-y-3 border rounded p-4">
          <div className="flex gap-2">
            <button onClick={() => addPayment("card")} className="px-3 py-2 border rounded">Ajouter carte</button>
            <button onClick={() => addPayment("paypal")} className="px-3 py-2 border rounded">Ajouter PayPal</button>
            <button onClick={() => addPayment("applepay")} className="px-3 py-2 border rounded">Ajouter Apple Pay</button>
          </div>

          <ul>
            {pms.length === 0 ? (
              <li className="text-sm text-gray-600">Aucun moyen de paiement</li>
            ) : (
              pms.map((pm) => (
                <li key={pm._id} className="flex items-center justify-between border-b py-2">
                  <span>{pm.provider.toUpperCase()} {pm.label ?? ""} {pm.last4 ? `•••• ${pm.last4}` : ""}</span>
                  <button onClick={() => removePayment(pm._id)} className="text-sm text-red-600">Supprimer</button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </section>
  );
}
