const steps = [
  { title: "Scanner", desc: "Scannez le QR code pour déverrouiller.", img: "/QR-code-1.jpg" },
  { title: "Rouler",  desc: "Circulez librement en ville.",            img: "/deposer.jpg" },
  { title: "Déposer", desc: "Garez-vous en zone autorisée puis verrouillez.", img: "/header.png" },
];

export default function Steps() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Comment ça marche ?</h2>

      <div className="grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <article
            key={i}
            className="group rounded-2xl bg-[#F1E9E2] border border-[#E6D9CE]
                       shadow-[0_6px_18px_rgba(241,233,226,0.9)]
                       transition-all duration-300 hover:-translate-y-1
                       hover:shadow-[0_12px_26px_rgba(241,233,226,1)]
                       hover:ring-1 hover:ring-green/40"
          >
            <div className="p-4">
              {/* image réduite et propre */}
              <div className="relative overflow-hidden rounded-xl bg-white/70">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-28 md:h-32 object-contain mx-auto"
                />
                <span className="absolute inset-0 bg-green/0 group-hover:bg-green/10 transition-colors" />
              </div>

              {/* texte */}
              <div className="pt-3">
                <h3 className="text-base font-semibold">{i + 1}. {s.title}</h3>
                <p className="text-sm text-[#0F2554]/70">{s.desc}</p>
              </div>
            </div>

            {/* barre d’accent */}
            <span className="block h-1 w-0 bg-green transition-all duration-300 group-hover:w-full" />
          </article>
        ))}
      </div>
    </section>
  );
}
