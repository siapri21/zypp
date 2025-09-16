const steps = [
  { title:"Scanner", desc:"Scannez le QR code pour déverrouiller." },
  { title:"Rouler", desc:"Circulez librement en ville." },
  { title:"Déposer", desc:"Garez-vous en zone autorisée puis verrouillez." },
];
export default function Steps(){
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl font-semibold mb-8">Comment ça marche ?</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s,i)=>(
          <div key={i} className="p-6 rounded-2xl border border-ink/10 bg-white">
            <div className="text-xl font-semibold text-ink">{i+1}. {s.title}</div>
            <p className="mt-2 text-ink/70">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
