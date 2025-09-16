export default function Download(){
  return (
    <section id="download" className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold">Télécharger l’application</h2>
        <p className="mt-2 text-gray-600">Disponible iOS et Android.</p>
        <div className="mt-6 flex gap-4">
          <a className="px-4 py-3 rounded-xl bg-black text-white" href="#">App Store</a>
          <a className="px-4 py-3 rounded-xl border" href="#">Google Play</a>
        </div>
      </div>
    </section>
  );
}
