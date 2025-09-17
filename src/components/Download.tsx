export default function Download() {
  return (
    <section id="download" className="bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-3xl font-bold">Télécharger l’application</h2>
        <p className="mt-1 text-gray-600">Disponible iOS et Android.</p>

        <div className="mt-8 grid md:grid-cols-12 gap-2 items-center">
          {/* Badges */}
          <div className="md:col-span-5 right">
          <div className="flex flex-col space-y-4 md:col-span-2 items-end">
              <a href="#" className="block w-56 md:w-30 ml-4">
                <img src="/public/appstore-logo-transparent-free-png.webp" alt="App Store" className="w-full h-auto" />
              </a>
              <a href="#" className="block w-45 md:w-30 ml-4">
                <img src="/public/Google-Play-Store-app.webp" alt="Google Play" className="w-full h-auto " />
              </a>
            </div>
          </div>

          {/* Mockup téléphone */}
          <div className="md:col-span-3 left">
            <div className="mx-auto w-full max-w-sm rounded-3xl ">
              <img src="/public/ChatGPT_Image_17_sept._2025__10_32_22-removebg-preview.png" alt="Aperçu application" className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
