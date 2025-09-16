import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-eco/60 via-bg to-warm/40 -z-10" />
      <div className="mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-2 gap-8 items-center">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
          <h1 className="text-4xl md:text-5xl text-Shrikhand ">La ville, à portée de trottinette</h1>
          <p className="mt-4 text-lg">1€ départ puis 0,15€/min. Montpellier dès janvier 2025.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/login" className="px-4 py-2 rounded-xl bg-green text-white">Connexion</Link>
            <Link to="/register" className="px-4 py-2 rounded-xl border border-ink/20 bg-white">Créer un compte</Link>
          </div>
        </motion.div>
        <motion.img
          initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{duration:0.6,delay:0.1}}
          src="/public/personne-qui-marche-par-son-scooter-electrique.jpg"
          alt="Trottinette en ville" className="rounded-2xl shadow-xl lg:h-[360px] object-cover ring-1 ring-ink/10" />
      </div>
    </section>
  );
}
