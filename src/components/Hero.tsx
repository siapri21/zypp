import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Image en fond */}
        <motion.img
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          src="/public/personne-qui-marche-par-son-scooter-electrique.jpg"
          alt="Trottinette en ville"
          className="absolute inset-0 h-full w-full object-cover -z-10"
        />

        {/* Voile sombre */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent -z-10" />

        {/* Contenu slogan */}
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 min-h-[360px] grid items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              La ville, à portée de trottinette
            </h1>
            <p className="mt-4 text-lg text-white/90">
              1€ départ puis 0,15€/min. Montpellier dès janvier 2025.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CARDS qui chevauchent */}
      <div className="mx-auto max-w-6xl px-4 -mt-16 md:-mt-24 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Carte Connexion */}
          <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 flex flex-col items-start">
            <h3 className="text-xl font-semibold">Déjà inscrit ?</h3>
            <p className="mt-2 text-black/70 text-sm">
              Accédez à votre compte et reprenez la route.
            </p>
            <Link to="/login" className="mt-4 px-4 py-2 rounded-xl bg-green text-white">
              Connexion
            </Link>
          </div>

          {/* Carte Inscription */}
          <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 flex flex-col items-start">
            <h3 className="text-xl font-semibold">Nouveau ?</h3>
            <p className="mt-2 text-black/70 text-sm">
              Créez votre compte et profitez des trajets en toute liberté.
            </p>
            <Link to="/register" className="mt-4 px-4 py-2 rounded-xl bg-green text-white">
              Créer un compte
            </Link>
          </div>

          {/* Carte Découverte */}
          <div className="rounded-2xl bg-[#0F2554] p-6 shadow-xl ring-1 ring-black/5 text-white flex flex-col items-start">
            <h3 className="text-xl font-semibold">Découvrir</h3>
            <p className="mt-2 text-white/80 text-sm">
              Vous utilisez notre service pour la première fois ?
            </p>
            <Link to="/discover" className="mt-4 px-4 py-2 rounded-xl bg-white text-[#0F2554]">
              Je découvre
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
