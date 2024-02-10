'use client';
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import Welcome from "./Welcome";
import Lenis from '@studio-freight/lenis'
import { useEffect } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Project from "./Project";
import Swift from '../../public/swift.svg';
import Image from "next/image";
import UniStayDesktop from '../../public/unistaydesktop.png';
import UniStayMobile from '../../public/unistaysmall.png';
import { useMediaQuery } from "react-responsive";

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
        <section>
          <Project 
            title="UniStay" 
            subtitle="iOS Application" 
            subtitleImage={<Image src={Swift} width={30} height={30} alt="Swift" />} 
            description="An intuitive platform designed to help students to find an accommodation for their uni life."
            image={isLgScreen ? <Image src={UniStayDesktop} alt="UniStay" /> : <Image src={UniStayMobile} alt="UniStay" />}
            link=""
            items={[
              {
                title: "Problematics", 
                link: '', 
                description: "The main problematics that UniStay solves are the lack of a platform that is intuitive and easy to use for students to find an accommodation for their uni life."
              },
              {
                title: "Design",
                link: '',
                description: "The design was made to be intuitive and easy to use, with a simple and clean interface."
              },
              {
                title: "Development",
                link: '',
                description: "The application was developed using Swift, a programming language developed by Apple."
              }
            ]}
          />
        </section>
      </main>
    </>
  );
}