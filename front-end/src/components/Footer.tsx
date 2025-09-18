export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 grid gap-4 md:grid-cols-3 text-sm">
        <div><div className="font-display text-xl">Zypp</div><p>© {new Date().getFullYear()} Zypp.</p></div>
        <div><div className="font-semibold">Mentions</div><a href="#" className="block hover:text-green">Mentions légales</a><a href="#" className="block hover:text-green">CGU</a></div>
        <div><div className="font-semibold">Suivez-nous</div><div className="flex gap-3"><a href="#">Instagram</a><a href="#">X</a><a href="#">LinkedIn</a></div></div>
      </div>
    </footer>
  );
}
