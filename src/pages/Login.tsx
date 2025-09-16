import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login(){
  const [ok,setOk]=useState(false);
  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-display mb-6">Connexion</h1>
      {!ok ? (
        <form onSubmit={(e)=>{e.preventDefault(); setOk(true);}} className="space-y-4 bg-white p-6 rounded-2xl border border-ink/10">
          <input required type="email" placeholder="Email" className="w-full border border-ink/20 rounded-xl px-4 py-3"/>
          <input required type="password" placeholder="Mot de passe" className="w-full border border-ink/20 rounded-xl px-4 py-3"/>
          <button className="w-full px-4 py-3 rounded-xl bg-green text-white">Se connecter</button>
          <p className="text-sm text-ink/70">Pas de compte ? <Link to="/register" className="text-green">Inscription</Link></p>
        </form>
      ) : (<p className="p-4 rounded-xl bg-eco/30 border border-eco/60">Connexion simulée.</p>)}
    </section>
  );
}
