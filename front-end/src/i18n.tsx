// src/i18n.tsx
import { createContext, useContext, useEffect, useState } from "react";

const dict = {
  fr:{ home:"Accueil", services:"Services", driver:"Devenir rechargeur", map:"Carte des stations",
       hero_title:"Devenir rechargeur", hero_desc:"Ramassez et rechargez...",
       pay:"Rémunération", flex:"Flexibilité", perks:"Réductions",
       form_title:"Inscription rapide", name:"Nom", email:"Email", city:"Ville",
       submit:"Je deviens rechargeur", login:"Connexion", app:"Voir l’application" },
  en:{ home:"Home", services:"Services", driver:"Become a charger", map:"Stations map",
       hero_title:"Become a charger", hero_desc:"Pick up and charge...",
       pay:"Payment", flex:"Flexibility", perks:"Discounts",
       form_title:"Quick signup", name:"Name", email:"Email", city:"City",
       submit:"Become a charger", login:"Sign in", app:"Open the app" },
  es:{ home:"Inicio", services:"Servicios", driver:"Conviértete en recargador", map:"Mapa de estaciones",
       hero_title:"Conviértete en recargador", hero_desc:"Recoge y carga...",
       pay:"Pago", flex:"Flexibilidad", perks:"Descuentos",
       form_title:"Registro rápido", name:"Nombre", email:"Email", city:"Ciudad",
       submit:"Quiero ser recargador", login:"Iniciar sesión", app:"Abrir la app" },
};
type Lang = keyof typeof dict;
type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };

const I18nCtx = createContext<Ctx>({} as Ctx);
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("lang") as Lang) || "fr");
  useEffect(() => localStorage.setItem("lang", lang), [lang]);
  const t = (k: string) => (dict[lang] as any)[k] ?? k;
  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}
export const useI18n = () => useContext(I18nCtx);
