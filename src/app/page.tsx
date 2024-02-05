import Image from "next/image";
import Nav from "./Nav";
import Hero from "./Hero";

export default function Home() {
  return (
    <>
      <header className="px-8 py-7">
        <Nav />
      </header>
      <main className="relative -z-20">
        <Hero />
      </main>
    </>
  );
}
