import { useEffect, useState } from "react";
))}
</div>


{tab === "profile" && (
<div className="space-y-3 border rounded p-4">
<div>Email: <b>{user?.email}</b></div>
<label className="block">Nom
<input className="block border rounded px-3 py-2 w-full" value={name} onChange={e=>setName(e.target.value)} />
</label>
<button onClick={saveProfile} className="px-3 py-2 rounded bg-ink text-white">Enregistrer</button>
</div>
)}


{tab === "rentals" && (
<div className="border rounded p-4 overflow-auto">
<table className="w-full text-sm">
<thead><tr><th>Trott</th><th>Début</th><th>Fin</th><th>Prix</th></tr></thead>
<tbody>
{rentals.map(r=> (
<tr key={r._id}><td>{r.scooterId}</td><td>{new Date(r.startedAt).toLocaleString()}</td><td>{r.endedAt? new Date(r.endedAt).toLocaleString():"—"}</td><td>{r.price.toFixed(2)} €</td></tr>
))}
</tbody>
</table>
</div>
)}


{tab === "invoices" && (
<div className="border rounded p-4">
{invoices.map(i => (
<div key={i._id} className="flex items-center justify-between border-b py-2">
<div>{new Date(i.createdAt).toLocaleDateString()} · {i.provider}</div>
<div>{i.amount.toFixed(2)} € · {i.status}</div>
</div>
))}
{invoices.length===0 && <div>Aucune facture</div>}
</div>
)}


{tab === "payments" && (
<div className="space-y-3 border rounded p-4">
<div className="flex gap-2">
<button onClick={()=>addPayment("card")} className="px-3 py-2 border rounded">Ajouter carte</button>
<button onClick={()=>addPayment("paypal")} className="px-3 py-2 border rounded">Ajouter PayPal</button>
<button onClick={()=>addPayment("applepay")} className="px-3 py-2 border rounded">Ajouter Apple Pay</button>
</div>
<ul>
{pms.map(pm => (
<li key={pm._id} className="flex items-center justify-between border-b py-2">
<span>{pm.provider.toUpperCase()} {pm.label ?? ""} {pm.last4 ? `•••• ${pm.last4}`: ""}</span>
<button onClick={()=>removePayment(pm._id)} className="text-sm text-red-600">Supprimer</button>
</li>
))}
{pms.length===0 && <li>Aucun moyen de paiement</li>}
</ul>
</div>
)}
</section>
);
}
