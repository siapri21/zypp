import { useEffect, useState, useCallback } from "react";

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

type Consent = {
  necessary: true;
  analytics: boolean;
  ads: boolean;
  ts: number;
};

const STORAGE_KEY = "zypp_cookie_consent_v1";
const THIRTEEN_MONTHS_MS = 13 * 30 * 24 * 60 * 60 * 1000; // ~13 mois
const GA_ID = ""; // ex: "G-XXXXXXX"

function getStored(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const c: Consent = JSON.parse(raw);
    if (Date.now() - c.ts > THIRTEEN_MONTHS_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return c;
  } catch {
    return null;
  }
}

function setStored(c: Consent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  // Exemple: notifier gtag si déjà chargé
  // window.gtag?.("consent", "update", {
  //   analytics_storage: c.analytics ? "granted" : "denied",
  //   ad_storage: c.ads ? "granted" : "denied",
  // });
}

function loadGA() {
  if (!GA_ID) return;
  if (!window.dataLayer) window.dataLayer = [];
  if (!window.gtag) window.gtag = (...args: any[]) => window.dataLayer!.push(args);

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  window.gtag?.("js", new Date() as any);
  window.gtag?.("config", GA_ID, { anonymize_ip: true } as any);
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [consent, setConsent] = useState<Consent | null>(getStored());
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);

  useEffect(() => {
    if (!consent) setOpen(true);
    else {
      setAnalytics(consent.analytics);
      setAds(consent.ads);
      if (consent.analytics) loadGA();
    }
  }, [consent]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);
  const acceptAll = () => {
    const c: Consent = { necessary: true, analytics: true, ads: true, ts: Date.now() };
    setStored(c); setConsent(c); setOpen(false); loadGA();
  };
  const refuseAll = () => {
    const c: Consent = { necessary: true, analytics: false, ads: false, ts: Date.now() };
    setStored(c); setConsent(c); setOpen(false);
  };
  const save = () => {
    const c: Consent = { necessary: true, analytics, ads, ts: Date.now() };
    setStored(c); setConsent(c); setOpen(false);
    if (analytics) loadGA();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full bg-white shadow-lg px-4 py-2 border border-gray-200 hover:shadow-xl transition"
        aria-label="Gérer les cookies"
      >
        <img src="/logo-removebg-preview.png" alt="" className="w-6 h-6" />
        <span>Cookies</span>
      </button>

      {/* Modale */}
      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40"
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          role="dialog"
          aria-modal="true"
        >
          <div className="w-[min(640px,92vw)] rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-semibold">Paramètres des cookies</h2>
              <button onClick={close} aria-label="Fermer" className="text-gray-500">✕</button>
            </div>

            <p className="mt-2 text-sm text-gray-600">
              Nous utilisons des cookies pour le bon fonctionnement du site, la mesure d’audience et, avec votre accord, la publicité personnalisée.
              <a className="underline ml-1" href="/politique-confidentialite">En savoir plus</a>.
            </p>

            <div className="mt-4 space-y-3">
              <div className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Nécessaires</div>
                    <div className="text-sm text-gray-600">Indispensables. Toujours actifs.</div>
                  </div>
                  <span className="text-xs rounded-full bg-gray-100 px-2 py-1">Activés</span>
                </div>
              </div>

              <label className="flex items-start justify-between gap-4 rounded-xl border p-4 cursor-pointer">
                <div>
                  <div className="font-medium">Analytiques</div>
                  <div className="text-sm text-gray-600">Mesure d’audience anonyme.</div>
                </div>
                <input
                  type="checkbox"
                  className="h-5 w-5"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
              </label>

              <label className="flex items-start justify-between gap-4 rounded-xl border p-4 cursor-pointer">
                <div>
                  <div className="font-medium">Publicitaires</div>
                  <div className="text-sm text-gray-600">Personnalisation des annonces.</div>
                </div>
                <input
                  type="checkbox"
                  className="h-5 w-5"
                  checked={ads}
                  onChange={(e) => setAds(e.target.checked)}
                />
              </label>
            </div>

            <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3 justify-end">
              <button onClick={refuseAll} className="px-4 py-2 rounded-lg border">Tout refuser</button>
              <button onClick={save} className="px-4 py-2 rounded-lg border">Sauvegarder</button>
              <button onClick={acceptAll} className="px-4 py-2 rounded-lg bg-[#7ED957] text-white">Tout accepter</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}