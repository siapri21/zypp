const items = [
  { t:"Prix", d:"1€ + 0,15€/min. Pas d’engagement." },
  { t:"Écologie", d:"Moins d’émissions sur les petits trajets." },
  { t:"Liberté", d:"Zones de dépose nombreuses et visibles." },
];
export default function Advantages(){
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl font-bold mb-8">Nos avantages</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((x)=>(
          <div key={x.t} className="p-6 rounded-2xl border">
            <div className="text-xl font-semibold">{x.t}</div>
            <p className="mt-2 text-gray-600">{x.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
