import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Feature = { title: string; img: string; desc: string };

const items: Feature[] = [
  {
    title: "Prendre une trottinette",
    img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop",
    desc: "Badgez ou scannez le QR code sur le guidon pour déverrouiller.",
  },
  {
    title: "Utiliser une électrique",
    img: "https://images.unsplash.com/photo-1603569283847-1f8f2f1b1b2f?q=80&w=600&auto=format&fit=crop",
    desc: "Puissance adaptée aux côtes. Vitesse limitée selon la zone.",
  },
  {
    title: "Faire une pause",
    img: "https://images.unsplash.com/photo-1520975777286-8b456906c813?q=80&w=600&auto=format&fit=crop",
    desc: "Mettez en pause via l’app. Le véhicule reste réservé.",
  },
  {
    title: "Stations +",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
    desc: "Zones de dépôt bonus. Gagnez des crédits en y replaçant la trottinette.",
  },
];

export default function Features() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-center text-4xl font-display tracking-wide text-ink mb-12">
        FONCTIONNALITÉS
      </h2>

      <div className="grid gap-12 md:grid-cols-4 place-items-center">
        {items.map((it, i) => (
          <div key={i} className="text-center">
            <img
              src={it.img}
              alt={it.title}
              className="h-44 w-44 rounded-full object-cover shadow ring-1 ring-ink/10"
            />
            <h3 className="mt-6 text-xl font-semibold text-ink">{it.title}</h3>

            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              aria-label={`Plus sur ${it.title}`}
              className="mt-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green text-white shadow transition-transform hover:scale-105"
            >
              <Plus />
            </button>

            <AnimatePresence>
              {open === i && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 text-sm text-ink/70 overflow-hidden max-w-xs mx-auto"
                >
                  {it.desc}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
