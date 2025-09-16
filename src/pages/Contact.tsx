import CityMap from "../components/CityMap";
import { useState } from "react";

export default function Contact(){
  const [sent,setSent]=useState(false);
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 grid lg:grid-cols-2 gap-10">
      <div>
        <h1 className="text-2xl font-bold mb-4">Contact</h1>
        {!sent ? (
          <form onSubmit={(e)=>{e.preventDefault(); setSent(true);}} className="space-y-4">
            <input required name="nom" placeholder="Nom"
              className="w-full border rounded-xl px-4 py-3"/>
            <input required type="email" name="email" placeholder="Email"
              className="w-full border rounded-xl px-4 py-3"/>
            <textarea required name="message" placeholder="Message"
              className="w-full border rounded-xl px-4 py-3 h-32"/>
            <button className="px-4 py-2 rounded-xl bg-blue-600 text-white">Envoyer</button>
          </form>
        ) : (<p className="p-4 rounded-xl bg-green-50 border text-green-800">Message envoyé.</p>)}
        <div className="mt-8">
          <h2 className="font-semibold">Zypp – Montpellier</h2>
          <p>contact@zypp.fr · 04 00 00 00 00</p>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Zones de dépose</h2>
        <CityMap />
      </div>
    </section>
  );
}
