import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <motion.img
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          src="/public/personne-qui-marche-par-son-scooter-electrique.jpg"
          alt="Trottinette en ville"
          className="absolute inset-0 h-full w-full object-cover -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent -z-10" />
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 min-h-[360px] grid items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white">La ville, à portée de trottinette</h1>
            <p className="mt-4 text-lg text-white/90">1€ départ puis 0,15€/min. Montpellier dès janvier 2025.</p>
          </motion.div>
        </div>
      </section>

      {/* 2 CARDS */}
      <div className="mx-auto max-w-6xl px-4 -mt-16 md:-mt-24 relative z-10 grid md:grid-cols-2 gap-6">
        {/* Card Stats */}
        <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5">
          <h3 className="text-lg font-semibold mb-4">Chiffres clés</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold">1000</div>
              <div className="text-sm text-black/70">trottinettes janv. 2025</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm text-black/70">service</div>
            </div>
            <div>
              <div className="text-3xl font-bold">0,15€</div>
              <div className="text-sm text-black/70">par minute</div>
            </div>
          </div>
        </div>

        {/* Card Membre */}
        <div className="rounded-2xl bg-[#FFAA75] p-6 shadow-xl ring-1 ring-black/5 text-white">
          <h3 className="text-lg font-semibold mb-2">Espace membre</h3>
          <p className="text-white/80 text-sm">Connectez-vous ou inscrivez-vous pour commencer.</p>
          <div className="mt-4 flex gap-3">
            <Link to="/login" className="px-4 py-2 rounded-xl bg-white text-[#0F2554]">Connexion</Link>
            <Link to="/register" className="px-4 py-2 rounded-xl border border-white/40">Inscription</Link>
          </div>
        </div>
      </div>
    </>
  );
}
