import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register(){
  const [ok,setOk]=useState(false);
  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-display mb-6">Inscription</h1>
      {!ok ? (
        <form onSubmit={(e)=>{e.preventDefault(); setOk(true);}} className="space-y-4 bg-white p-6 rounded-2xl border border-ink/10">
          <input required placeholder="Nom" className="w-full border border-ink/20 rounded-xl px-4 py-3"/>
          <input required type="email" placeholder="Email" className="w-full border border-ink/20 rounded-xl px-4 py-3"/>
          <input required type="password" placeholder="Mot de passe" className="w-full border border-ink/20 rounded-xl px-4 py-3"/>
          <button className="w-full px-4 py-3 rounded-xl bg-green text-white">Créer mon compte</button>
          <p className="text-sm text-ink/70">Déjà inscrit ? <Link to="/login" className="text-green">Connexion</Link></p>
        </form>
      ) : (<p className="p-4 rounded-xl bg-eco/30 border border-eco/60">Compte créé (mock).</p>)}
    </section>
  );
}
