'use client';
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import Welcome from "./Welcome";
import Lenis from '@studio-freight/lenis'
import { useEffect } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swift from '../../public/swift.svg';
import Image from "next/image";
import UniStayDesktop from '../../public/unistaydesktop.png';
import UniStayMobile from '../../public/unistaysmall.png';
import { useMediaQuery } from "react-responsive";
import Projects from "./Projects";

export default function Home() {

  const isLgScreen = useMediaQuery({minWidth: 768});

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
              image: <Image src={isLgScreen ? UniStayDesktop : UniStayMobile} alt="UniStay" />,
              link: '/unistay'
            },
            {
              title: 'PrettyChat',
              type: 'Web App',
              image: <Image src={UniStayDesktop} alt="UniStay" />,
              link: '/prettychat'
            },
          ]}
        />
      </main>
    </>
  );
}