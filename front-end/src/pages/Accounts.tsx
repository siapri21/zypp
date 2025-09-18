import { useEffect, useState } from "react";

/** Types **/
type Tab = "profile" | "rentals" | "invoices" | "payments";

type User = {
  email: string;
  name?: string;
};

type Rental = {
  _id: string;
  scooterId: string;
  startedAt: string | number | Date;
  endedAt?: string | number | Date | null;
  price: number;
};

type Invoice = {
  _id: string;
  createdAt: string | number | Date;
  provider: string;
  amount: number;
  status: "paid" | "unpaid" | "pending" | string;
};

type PaymentMethod = {
  _id: string;
  provider: "card" | "paypal" | "applepay" | string;
  label?: string | null;
  last4?: string | null;
};

/** Composant **/
export default function Account() {
  const [tab, setTab] = useState<Tab>("profile");

  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");

  const [rentals, setRentals] = useState<Rental[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [pms, setPms] = useState<PaymentMethod[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  /** Helpers **/
  const fetchJSON = async <T,>(url: string, init?: RequestInit): Promise<T> => {
    const res = await fetch(url, init);
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(text || `HTTP ${res.status}`);
    }
    return res.json() as Promise<T>;
  };

  /** Initial load **/
  useEffect(() => {
    let alive = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [u, r, i, pm] = await Promise.all([
          fetchJSON<User>("/api/me"),
          fetchJSON<Rental[]>("/api/rentals"),
          fetchJSON<Invoice[]>("/api/invoices"),
          fetchJSON<PaymentMethod[]>("/api/payment-methods"),
        ]);
        if (!alive) return;
        setUser(u);
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
      const updated = await fetchJSON<User>("/api/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      setUser(updated);
    } catch (e: any) {
      setError(e.message ?? "Impossible d’enregistrer le profil");
    } finally {
      setSaving(false);
    }
  };

  const addPayment = async (provider: PaymentMethod["provider"]) => {
    setError(null);
    try {
      const created = await fetchJSON<PaymentMethod>("/api/payment-methods", {
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
      await fetchJSON<void>(`/api/payment-methods/${id}`, { method: "DELETE" });
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
      {/* Tabs */}
      <div className="flex gap-2">
        {(["profile", "rentals", "invoices", "payments"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1 rounded ${
              tab === t ? "bg-green text-white" : "border"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Profile */}
      {tab === "profile" && (
        <div className="space-y-3 border rounded p-4">
          <div>
            Email: <b>{user?.email ?? "—"}</b>
          </div>
          <label className="block">
            Nom
            <input
              className="block border rounded px-3 py-2 w-full mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

      {/* Rentals */}
      {tab === "rentals" && (
        <div className="border rounded p-4 overflow-auto">
          {rentals.length === 0 ? (
            <div className="text-sm text-gray-600">Aucune location</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="py-1 pr-2">Trott</th>
                  <th className="py-1 pr-2">Début</th>
                  <th className="py-1 pr-2">Fin</th>
                  <th className="py-1 pr-2">Prix</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((r) => (
                  <tr key={r._id} className="border-t">
                    <td className="py-2 pr-2">{r.scooterId}</td>
                    <td className="py-2 pr-2">
                      {new Date(r.startedAt).toLocaleString()}
                    </td>
                    <td className="py-2 pr-2">
                      {r.endedAt
                        ? new Date(r.endedAt).toLocaleString()
                        : "—"}
                    </td>
                    <td className="py-2 pr-2">{r.price.toFixed(2)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Invoices */}
      {tab === "invoices" && (
        <div className="border rounded p-4">
          {invoices.length === 0 ? (
            <div className="text-sm text-gray-600">Aucune facture</div>
          ) : (
            invoices.map((i) => (
              <div
                key={i._id}
                className="flex items-center justify-between border-b py-2"
              >
                <div>
                  {new Date(i.createdAt).toLocaleDateString()} · {i.provider}
                </div>
                <div>
                  {i.amount.toFixed(2)} € · {i.status}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Payments */}
      {tab === "payments" && (
        <div className="space-y-3 border rounded p-4">
          <div className="flex gap-2">
            <button
              onClick={() => addPayment("card")}
              className="px-3 py-2 border rounded"
            >
              Ajouter carte
            </button>
            <button
              onClick={() => addPayment("paypal")}
              className="px-3 py-2 border rounded"
            >
              Ajouter PayPal
            </button>
            <button
              onClick={() => addPayment("applepay")}
              className="px-3 py-2 border rounded"
            >
              Ajouter Apple Pay
            </button>
          </div>

          <ul>
            {pms.length === 0 ? (
              <li className="text-sm text-gray-600">Aucun moyen de paiement</li>
            ) : (
              pms.map((pm) => (
                <li
                  key={pm._id}
                  className="flex items-center justify-between border-b py-2"
                >
                  <span>
                    {pm.provider.toUpperCase()} {pm.label ?? ""}{" "}
                    {pm.last4 ? `•••• ${pm.last4}` : ""}
                  </span>
                  <button
                    onClick={() => removePayment(pm._id)}
                    className="text-sm text-red-600"
                  >
                    Supprimer
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </section>
  );
}
