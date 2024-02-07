'use client';
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import ProjectsIntro from "./ProjectsIntro";
import Welcome from "./Welcome";

export default function Home() {
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