import Hero from "../components/Hero";
import Steps from "../components/Steps";
import Advantages from "../components/Advantages";
import { Helmet } from "react-helmet-async";
// import Stats from "../components/Stats";
import { useEffect } from "react";
import Download from "../components/Download";


export default function Home({anchor}:{anchor?:string}){
  useEffect(()=>{
    if(anchor){
      const el = document.getElementById(anchor==="services"?"how":anchor==="app"?"download":anchor);
      if(el) el.scrollIntoView({behavior:"smooth", block:"start"});
    }
  },[anchor]);

  return (
    <>
    <Helmet>
        <title>Location de trottinettes électriques à Montpellier – Zypp</title>
        <meta
          name="description"
          content="Avec Zypp, louez facilement une trottinette électrique à Montpellier. Dès 1€ + 0,15€/min. Zones : centre-ville, Comédie, campus, gare."
        />
      </Helmet>
      <h1>Location de trottinettes électriques à Montpellier</h1>
      <Hero />
    
      <Steps />
      <Advantages />
      {/* <Stats /> */}
      <Download/> 
    </>
  );
}
