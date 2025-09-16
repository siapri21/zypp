import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/services", label: "Services" },
  { to: "/devenir-rechargeur", label: "Devenir rechargeur" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-bg/50 backdrop-blur border-b border-ink/10">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
       <img src="/public/logo-removebg-preview.png" alt="" className="h-25 w-25"  />

        <button className="md:hidden" onClick={() => setOpen(v=>!v)} aria-label="menu">
          <Menu />
        </button>

        <ul className="hidden md:flex items-center gap-6">
          {links.map(l=>(
            <li key={l.to}>
              <NavLink to={l.to} className={({isActive}) =>
                `hover:text-green ${isActive ? "text-green" : ""}`}>{l.label}</NavLink>
            </li>
          ))}
          <li className="flex items-center gap-2">
            <NavLink to="/login" className="px-3 py-2 rounded-xl border border-ink/20">Connexion</NavLink>
            <NavLink to="/register" className="px-3 py-2 rounded-xl bg-green text-white">Inscription</NavLink>
          </li>
        </ul>
      </nav>

      {open && (
        <ul className="md:hidden px-4 pb-4 space-y-2 border-t border-ink/10">
          {links.map(l=>(
            <li key={l.to}><NavLink to={l.to} onClick={()=>setOpen(false)}>{l.label}</NavLink></li>
          ))}
          <li className="pt-2 flex gap-2">
            <NavLink to="/login" onClick={()=>setOpen(false)} className="px-3 py-2 rounded-xl border">Connexion</NavLink>
            <NavLink to="/register" onClick={()=>setOpen(false)} className="px-3 py-2 rounded-xl bg-green text-white">Inscription</NavLink>
          </li>
        </ul>
      )}
    </header>
  );
}
