const steps = [
  { title: "Scanner", desc: "Scannez le QR code pour déverrouiller.", img: "/icons/scan.png" },
  { title: "Rouler",  desc: "Circulez librement en ville.",            img: "/icons/ride.png" },
  { title: "Déposer", desc: "Garez-vous en zone autorisée puis verrouillez.", img: "/icons/park.png" },
];

export default function Steps() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl font-bold mb-8">Comment ça marche ?</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <div
            key={i}
            className="group relative flex flex-col rounded-2xl border border-black/10 bg-white p-6 transition
                       hover:border-green/60 hover:shadow-md"
          >
            <div className="text-xl font-semibold">
              {i + 1}. <span className="transition group-hover:text-green">{s.title}</span>
            </div>
            <p className="mt-3 text-gray-600">{s.desc}</p>

            {/* icône petite, collée en bas */}
            <img
              src={s.img}
              alt=""
              className="mt-auto h-8 w-8 opacity-80 transition group-hover:opacity-100"
            />

            {/* barre d’accent en bas au hover */}
            <span className="pointer-events-none absolute bottom-0 left-0 h-1 w-0 bg-green transition-all group-hover:w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
