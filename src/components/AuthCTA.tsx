import { Link } from "react-router-dom";
export default function AuthCTA(){
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold">Votre espace Zypp</h2>
        <p className="mt-2 text-ink/70">Gérez vos trajets, factures et moyens de paiement.</p>
        <div className="mt-6 flex gap-4">
          <Link to="/login" className="px-4 py-3 rounded-xl bg-green text-white">Connexion</Link>
          <Link to="/register" className="px-4 py-3 rounded-xl border border-ink/20">Créer un compte</Link>
        </div>
      </div>
    </section>
  );
}
