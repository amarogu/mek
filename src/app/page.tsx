import Image from "next/image";
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import ProjectsIntro from "./ProjectsIntro";
import Welcome from "./Welcome";

export default function Home() {
  return (
    <>
      <header className="px-8 py-7">
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
