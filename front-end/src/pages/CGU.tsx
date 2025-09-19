// src/pages/CGU.tsx
import { Helmet } from "react-helmet-async";

export default function CGU() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Combien coûte une trottinette Zypp ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "1 € de prise en charge puis 0,15 €/min."
        }
      },
      {
        "@type": "Question",
        "name": "Où stationner une trottinette Zypp à Montpellier ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dans les zones autorisées : Comédie, Antigone, Odysseum, campus universitaires."
        }
      }
    ]
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-4">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      </Helmet>

      <h1 className="text-2xl font-bold">Conditions Générales d’Utilisation</h1>
      <h2 className="text-lg font-semibold mt-4">1. Objet</h2>
      <p>Les présentes régissent l’accès au site et à l’app Zypp et l’usage du service de location de trottinettes.</p>
      <h2 className="text-lg font-semibold">2. Compte et usage</h2>
      <p>Compte personnel requis. Respect du code de la route et des zones de stationnement. Âge minimum 14 ans. Vitesse max 25 km/h.</p>
      <h2 className="text-lg font-semibold">3. Tarifs</h2>
      <p>1 € de prise en charge puis 0,15 €/min. Facturation via prestataire de paiement sécurisé.</p>
      <h2 className="text-lg font-semibold">4. Responsabilités</h2>
      <p>L’utilisateur est responsable de sa conduite et du matériel pendant la location. Assurance RC requise selon la réglementation.</p>
      <h2 className="text-lg font-semibold">5. Données personnelles</h2>
      <p>Voir la Politique de confidentialité. Responsable de traitement : Zypp Mobilité.</p>
      <h2 className="text-lg font-semibold">6. Support</h2>
      <p>Contact : privacy@zypp-mobilite.fr · Adresse : 45, rue du Faubourg Saint-Jaumes, 34000 Montpellier.</p>
      <h2 className="text-lg font-semibold">7. Modification</h2>
      <p>Zypp peut mettre à jour les CGU. Les changements majeurs sont notifiés.</p>
    </main>
  );
}
