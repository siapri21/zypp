import { Euro, Leaf, MapPin, Plug, ShieldCheck, HandMetal } from "lucide-react";



export default function AdvantagesAndAbout() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      {/* --- Nos avantages --- */}
      <h2 className="text-2xl font-bold mb-6">Nos avantages</h2>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {/* Prix */}
        <div className="rounded-2xl border px-6 py-5">
          <div className="flex items-center gap-3">
            <Euro className="h-6 w-6 text-[#7ED957]" />
            <span className="font-semibold">Prix</span>
          </div>
          <p className="mt-3 text-gray-600">1€ + 0,15€/min. Pas d’engagement.</p>
        </div>

        {/* Écologie */}
        <div className="rounded-2xl border px-6 py-5">
          <div className="flex items-center gap-3">
            <Leaf className="h-6 w-6 text-[#7ED957]" />
            <span className="font-semibold">Écologie</span>
          </div>
          <p className="mt-3 text-gray-600">Moins d’émissions sur les petits trajets.</p>
        </div>

        {/* Liberté */}
        <div className="rounded-2xl border px-6 py-5">
          <div className="flex items-center gap-3">
            <MapPin className="h-6 w-6 text-[#7ED957]" />
            <span className="font-semibold">Liberté</span>
          </div>
          <p className="mt-3 text-gray-600">Zones de dépose nombreuses et visibles.</p>
        </div>
      </div>

      <div className="h-px bg-gray-100 my-6" />

      {/* --- Qui sommes-nous ? (layout 1 grande colonne + 3 colonnes) --- */}
      <section className="grid md:grid-cols-4 gap-10 md:gap-12 items-start">
        {/* Colonne gauche */}
        <div>
          <h2 className="text-4xl md:text-greenxl font-extrabold tracking-tight text-[#7ED957]">
            Qui sommes-nous&nbsp;?
          </h2>

          <p className="mt-6 text-2xl leading-snug font-semibold text-[#0F2554]-600">
            Nous sommes un service<br />
            d’autopartage flexible,<br />
            pensé pour s’adapter à vos<br />
            besoins.
          </p>

          <p className="mt-8 text-lg text-[#0F2554]-600">
            Réservez une de nos trottinettes depuis votre smartphone,
            conduisez aussi longtemps que vous le souhaitez, faites une pause
            autant de fois que vous en avez envie. C’est simple.
          </p>

          <a
            href="#download"
            className="mt-8 inline-block rounded-full bg-[#FFAA75] px-6 py-3 text-white font-semibold"
          >
            Télécharger l’application
          </a>
        </div>

        {/* Durabilité */}
        <div>
          <Plug className="h-12 w-12 text-[#7ED957 ]-600 mb-4" />
          <h3 className="text-3xl font-extrabold tracking-wide text-[#0F2554]">
            DURABILITÉ
          </h3>
          <p className="mt-4 text-[#7ED957 ]-600">
            Nos trottinettes 100% électriques avec
            <span className="text-[#7ED957 ]-600 font-semibold"> 0 émissions</span>.
            Idéales pour les petits trajets du quotidien.
          </p>
        </div>

        {/* Sécurité */}
        <div>
          <ShieldCheck className="h-12 w-12 text-[#7ED957] mb-4" />
          <h3 className="text-3xl font-extrabold tracking-wide text-[#0F2554]">
            SÉCURITÉ
          </h3>
          <p className="mt-4 text-[#0F2554]-600">
            Freins performants, éclairage intégré et zones de circulation
            recommandées pour rouler plus sereinement.
          </p>
        </div>

        {/* Liberté */}
        <div>
          <HandMetal className="h-12 w-12 text-[#7ED957] mb-4" />
          <h3 className="text-3xl font-extrabold tracking-wide text-[#0F2554]">
            LIBERTÉ
          </h3>
          <p className="mt-4 text-[#0F2554]-600">
            Sans clés ni contraintes, tarifs clairs et
            zones de dépose
            <span className="text-[#0F2554] font-semibold"> nombreuses</span>
            &nbsp;pour vous arrêter quand vous le voulez.
          </p>
        </div>
      </section>
    </main>
  );
}
