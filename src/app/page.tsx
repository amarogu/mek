'use client';
import Image from "next/image";
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import ProjectsIntro from "./ProjectsIntro";
import Welcome from "./Welcome";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    (
      async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, []);

  return (
    <>
      <header className="h-[84px]">
        <Welcome />
        <Nav />
      </header>
      <main className="relative -z-20">
        <Hero />
        <About />
        <ProjectsIntro />
      </main>
    </>
  );
}
