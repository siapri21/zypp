import Hero from "../components/Hero";
import Steps from "../components/Steps";
import Advantages from "../components/Advantages";
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
      <Hero />
    
      <Steps />
      <Advantages />
      {/* <Stats /> */}
      <Download/> 
    </>
  );
}
