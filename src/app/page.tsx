'use client';
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import Welcome from "./Welcome";
import Lenis from '@studio-freight/lenis'
import { useEffect } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import UniStay from '../../public/unistayplaceholder.jpeg';
import PrettyChatPlaceholder from '../../public/prettychatplaceholder.png';
import RespondlyPlaceholder from '../../public/respondlyplaceholder.png';
import { useMediaQuery } from "react-responsive";
import Projects from "./Projects";
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'

export default function Home() {

  const isLgScreen = useMediaQuery({minWidth: 768});

  /*useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)
  }, [])*/

  return (
    <ReactLenis root>
      <header className="h-[84px] relative z-20">
        <Welcome />
        <Nav />
      </header>
      <main className="relative overflow-x-hidden">
        <Hero />
        <About />
        <Projects
          projects={[
            {
              title: 'UniStay',
              type: 'iOS App',
              image: <Image src={UniStay} alt="UniStay" />,
              link: '/unistay'
            },
            {
              title: 'PrettyChat',
              type: 'Web App',
              image: <Image src={PrettyChatPlaceholder} alt="UniStay" />,
              link: '/prettychat'
            },
            {
              title: 'Respondly',
              type: 'Web Site',
              image: <Image src={RespondlyPlaceholder} alt="UniStay" />,
              link: '/respondly'
            }
          ]}
        />
      </main>
    </ReactLenis>
  );
}