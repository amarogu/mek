'use client';
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import Welcome from "./Welcome";
import Image from "next/image";
import UniStay from '../../public/unistayplaceholder.jpeg';
import PrettyChatPlaceholder from '../../public/prettychatplaceholder.png';
import Projects from "./Projects";
import { ReactLenis } from '@studio-freight/react-lenis'
import Contact from "./Contact";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Home() {

  return (
    <ReactLenis root>
      <header className="h-[84px] relative z-20">
        <Welcome />
        <Nav />
      </header>
      <main id="main" className="relative text-3xl overflow-x-hidden">
        <div id="spacer"></div>
        <Hero />
        <About />
        <Projects
          projects={[
            {
              title: 'UniStay',
              type: 'any',
              image: <Image src={UniStay} alt="UniStay" />,
              link: `https://github.com/amarogu/unistay`
            },
            {
              title: 'PrettyChat',
              type: 'any',
              image: <Image src={PrettyChatPlaceholder} alt="PrettyChat" />,
              link: `https://github.com/amarogu/prettychat`
            }
          ]}
        />
        <Contact />
        <Footer />
      </main>
    </ReactLenis>
  );
}