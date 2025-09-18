export default function Download() {
  return (
    <section id="download" className="bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Texte à gauche légèrement décalé */}
          <div className="pl-4">
            <h2 className="text-3xl font-bold mb-2">Télécharger l’application</h2>
            <p className="text-gray-600">Disponible iOS et Android.</p>
          </div>

          {/* Images à droite */}
          <div className="flex justify-end gap-4">
            <div className="flex flex-col items-end">
              <a href="#" className="block max-w-[250px] w-full mt-16">
                <img
                  src="/appstore-logo-transparent-free-png.webp"
                  alt="App Store"
                  className="w-full h-auto"
                />
              </a>
              <a href="#" className="block max-w-[250px] w-full">
                <img
                  src="/Google-Play-Store-app.webp"
                  alt="Google Play"
                  className="w-full h-auto"
                />
              </a>
            </div>

            {/* Mockup téléphone */}
            <div className="block max-w-[350px] w-full">
              <img
                src="/ChatGPT_Image_17_sept._2025__10_32_22-removebg-preview.png"
                alt="Aperçu application"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
