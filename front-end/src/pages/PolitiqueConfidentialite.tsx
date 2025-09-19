// src/pages/PolitiqueConfidentialite.tsx
export default function PolitiqueConfidentialite() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Politique de confidentialité et cookies</h1>

      <h2 className="text-lg font-semibold">1. Responsable</h2>
      <p>Zypp Mobilité, SAS, RCS Montpellier B 902 456 321, TVA FR 12 902456321.</p>

      <h2 className="text-lg font-semibold">2. Données traitées</h2>
      <p>Identité (nom, email, téléphone), usage (trajets, zones), paiement via prestataire, techniques (IP, logs, cookies).</p>

      <h2 className="text-lg font-semibold">3. Finalités et bases légales</h2>
      <ul className="list-disc pl-6">
        <li>Exécution du contrat : accès et utilisation du service.</li>
        <li>Consentement : newsletters, cookies publicitaires/analytics.</li>
        <li>Obligation légale : facturation, comptabilité.</li>
        <li>Intérêt légitime : sécurité, prévention des fraudes.</li>
      </ul>

      <h2 className="text-lg font-semibold">4. Durées de conservation</h2>
      <ul className="list-disc pl-6">
        <li>Données utilisateur : 3 ans après fin du contrat.</li>
        <li>Facturation : 10 ans.</li>
        <li>Marketing : jusqu’au retrait du consentement.</li>
        <li>Cookies : 13 mois max.</li>
      </ul>

      <h2 className="text-lg font-semibold">5. Destinataires</h2>
      <p>Équipe Zypp, prestataires techniques (paiement, hébergement, analytics), autorités si obligation légale. Pas de revente.</p>

      <h2 className="text-lg font-semibold">6. Vos droits</h2>
      <p>Accès, rectification, suppression, opposition, limitation, portabilité, retrait du consentement. Contact : privacy@zypp-mobilite.fr. CNIL : cnil.fr.</p>

      <h2 className="text-lg font-semibold">7. Cookies</h2>
      <p>Catégories : nécessaires, analytiques, publicitaires. Gestion via le bouton “Cookies” en bas de page.</p>

      <h2 className="text-lg font-semibold">8. Sécurité</h2>
      <p>Chiffrement des données sensibles, hébergement sécurisé en UE, contrôle d’accès, audits réguliers.</p>

      <h2 className="text-lg font-semibold">9. Mise à jour</h2>
      <p>Cette politique peut évoluer. Notification en cas de changement majeur.</p>
    </main>
  );
}
