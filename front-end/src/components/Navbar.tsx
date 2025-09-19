import {  NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useI18n } from "../i18n";
import { useAuth } from "./AuthCTA";

const linkDefs = [
  { to: "/", key: "home" },
  { to: "/services", key: "services" },
  { to: "/devenir-rechargeur", key: "driver" },
  { to: "/carte", key: "map" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useI18n();
  const {user, logout} = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-bg/50 backdrop-blur border-b border-ink/10">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <NavLink to="/" aria-label="home">
          <img src="/logo-removebg-preview.png" alt="logo" className="h-12 w-auto" />
        </NavLink>

        <button className="md:hidden" onClick={() => setOpen(v => !v)} aria-label="menu">
          <Menu />
        </button>

        <ul className="hidden md:flex items-center gap-6">
          {linkDefs.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) => `hover:text-[#7ED957 ] ${isActive ? "text-[#7ED957 ]" : ""}`}
              >
                {t(l.key)}
              </NavLink>
            </li>
          ))}

          <li>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as any)}
              className="rounded-md border border-ink/20 bg-white px-2 py-1 text-sm"
              aria-label="language"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </li>

          {user ? (
            <li className="flex items-center gap-2">
              <NavLink to="/account" className="px-3 py-2 rounded-xl border border-ink/20">
                {t("account") ?? "Mon compte"}
              </NavLink>
              <button
                onClick={() => logout?.()}
                className="px-3 py-2 rounded-xl bg-ink text-white text-sm"
              >
                {t("logout") ?? "Se déconnecter"}
              </button>
            </li>
          ) : (
            <li className="flex items-center gap-2">
              <NavLink to="/login" className="px-3 py-2 rounded-xl border border-ink/20">
                {t("login")}
              </NavLink>
              <NavLink to="/register" className="px-3 py-2 rounded-xl bg-green text-white">
                {t("register") ?? "Inscription"}
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      {open && (
        <ul className="md:hidden px-4 pb-4 space-y-2 border-t border-ink/10">
          {linkDefs.map(l => (
            <li key={l.to}>
              <NavLink to={l.to} onClick={() => setOpen(false)}>
                {t(l.key)}
              </NavLink>
            </li>
          ))}
          <li className="flex items-center gap-2 pt-2">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as any)}
              className="rounded-md border border-ink/20 bg-white px-2 py-1 text-sm"
              aria-label="language"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>

            {user ? (
              <>
                <NavLink to="/account" onClick={() => setOpen(false)} className="px-3 py-2 rounded-xl border">
                  {t("account") ?? "Mon compte"}
                </NavLink>
                <button
                  onClick={() => { logout?.(); setOpen(false); }}
                  className="px-3 py-2 rounded-xl bg-ink text-white text-sm"
                >
                  {t("logout") ?? "Se déconnecter"}
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setOpen(false)} className="px-3 py-2 rounded-xl border">
                  {t("login")}
                </NavLink>
                <NavLink to="/register" onClick={() => setOpen(false)} className="px-3 py-2 rounded-xl bg-green text-white">
                  {t("register") ?? "Inscription"}
                </NavLink>
              </>
            )}
          </li>
        </ul>
      )}
    </header>
  );
}
