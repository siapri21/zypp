import { useState } from "react";

export default function Rechargeur() {
  const [sent, setSent] = useState(false);

  return (
    <section className="min-h-screen bg-[#F1E9E2]">
      {/* Hero */}
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* gradient blotches */}
          <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-[#BBECA5] opacity-60 blur-3xl"/>
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[#FFAA75] opacity-50 blur-3xl"/>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2">
          <header>
            <p className="inline-block rounded-full bg-[#BBECA5] px-3 py-1 text-sm font-medium text-[#343232]">Rejoignez le réseau</p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-[#343232] md:text-5xl">Devenir rechargeur</h1>
            <p className="mt-4 max-w-xl text-[#343232]/80">
              Ramassez et rechargez des trottinettes chez vous entre 21h et 6h. Rémunération à la
              trottinette et réductions sur vos trajets.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#7ED957]"/>
              <span className="text-sm text-[#343232]/70">Processus d'inscription en moins de 2 minutes</span>
            </div>
          </header>

          {/* Inline SVG illustration to avoid external assets */}
          <div className="mx-auto w-full max-w-md">
           <img src="/communityIcon_q9f94omolyf91-removebg-preview.png" alt="" />
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="mx-auto max-w-6xl px-4">
        <ul className="grid gap-4 md:grid-cols-3">
          {[
            { t: "Rémunération", d: "Paiement à la trottinette rechargée." },
            { t: "Flexibilité", d: "Créneaux libres selon vos disponibilités." },
            { t: "Réductions", d: "Crédits de trajets offerts." },
          ].map((x) => (
            <li key={x.t} className="rounded-2xl border border-[#343232]/10 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#BBECA5] text-[#343232]">✓</span>
                <div className="font-semibold text-[#343232]">{x.t}</div>
              </div>
              <p className="mt-2 text-[#343232]/70">{x.d}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Form */}
     {/* Form */}
<div className="mx-auto max-w-lg px-4 py-12">
<h2 className="text-xl font-semibold text-[#343232]">Inscription rapide</h2>


{!sent ? (
<form
onSubmit={(e) => {
e.preventDefault();
setSent(true);
}}
className="mt-6 space-y-4"
>
<div className="grid gap-4 md:grid-cols-3">
<input
required
name="nom"
placeholder="Nom"
className="w-full rounded-lg border border-[#343232]/15 bg-white px-4 py-2 text-[#343232] shadow-sm outline-none focus:border-[#7ED957] focus:ring-2 focus:ring-[#7ED957]/30"
/>
<input
required
type="email"
name="email"
placeholder="Email"
className="w-full rounded-lg border border-[#343232]/15 bg-white px-4 py-2 text-[#343232] shadow-sm outline-none focus:border-[#7ED957] focus:ring-2 focus:ring-[#7ED957]/30"
/>
<input
required
name="ville"
placeholder="Ville"
className="w-full rounded-lg border border-[#343232]/15 bg-white px-4 py-2 text-[#343232] shadow-sm outline-none focus:border-[#7ED957] focus:ring-2 focus:ring-[#7ED957]/30"
/>
</div>


<button
className="w-full rounded-lg bg-[#FFAA75] px-4 py-3 font-medium text-[#343232] shadow-sm transition hover:brightness-95 focus:outline-none focus:ring-4 focus:ring-[#BBECA5]/40"
>
Je deviens rechargeur
</button>


<label className="flex items-start gap-2 text-xs text-[#343232]/70">
  <input
    type="checkbox"
    required
    className="mt-0.5 h-4 w-4 rounded border-[#343232]/30 text-[#7ED957] focus:ring-[#7ED957]/40"
  />
  <span>
    J’accepte de recevoir des informations par email. Mes données resteront privées.
  </span>
</label>

</form>
) : (
<div className="mt-4 rounded-xl border border-[#343232]/10 bg-white p-4 text-[#1f5130] shadow-sm">
Candidature envoyée.
</div>
)}
</div>
    </section>
  );
}
