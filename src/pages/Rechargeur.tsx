import { useState } from "react";

export default function Rechargeur(){
  const [sent,setSent]=useState(false);
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 space-y-10">
      <div>
        <h1 className="text-2xl font-bold">Devenir rechargeur</h1>
        <p className="mt-2 text-gray-700">
          Ramassez et rechargez des trottinettes chez vous entre 21h et 6h. Nous rémunérons à la trottinette
          et offrons des réductions sur vos trajets.
        </p>
        <ul className="mt-4 grid md:grid-cols-3 gap-4">
          {[
            {t:"Rémunération",d:"Paiement à la trottinette rechargée."},
            {t:"Flexibilité",d:"Créneaux libres selon vos disponibilités."},
            {t:"Réductions",d:"Crédits de trajets offerts."},
          ].map(x=>(
            <li key={x.t} className="p-6 rounded-2xl border">
              <div className="font-semibold">{x.t}</div>
              <p className="text-gray-600 mt-1">{x.d}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Inscription rapide</h2>
        {!sent ? (
          <form onSubmit={(e)=>{e.preventDefault(); setSent(true);}} className="grid md:grid-cols-3 gap-4">
            <input required name="nom" placeholder="Nom" className="border rounded-xl px-4 py-3"/>
            <input required type="email" name="email" placeholder="Email" className="border rounded-xl px-4 py-3"/>
            <input required name="ville" placeholder="Ville" className="border rounded-xl px-4 py-3"/>
            <button className="md:col-span-3 px-4 py-3 rounded-xl bg-blue-600 text-white">Je deviens rechargeur</button>
          </form>
        ) : (<p className="p-4 rounded-xl bg-green-50 border text-green-800">Candidature envoyée.</p>)}
      </div>
    </section>
  );
}
