'use client';
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import ProjectsIntro from "./ProjectsIntro";
import Welcome from "./Welcome";
import Lenis from '@studio-freight/lenis'
import { useEffect } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)
  }, [])

  return (
    <>
      <header className="h-[84px]">
        <Welcome />
        <Nav />
      </header>
      <main className="relative -z-20 overflow-x-hidden">
        <Hero />
        <About />
        <ProjectsIntro />
      </main>
    </>
  );
}