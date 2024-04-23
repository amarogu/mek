'use client';
import Welcome from "./Welcome";
import { ReactLenis } from '@studio-freight/react-lenis'
import { useEffect, useRef, useState } from "react";
import Context from "./Context";
import Nav from "./Nav";
import Hero from "./Hero";
import Slider from "./Slider";
import Us from "./Us";

export default function Home() {

  const [isMounted, setIsMounted] = useState<boolean>(false);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  const spacer = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (spacer.current && header.current) {
      spacer.current.setAttribute('style', `height: ${header.current.clientHeight}px`);
    }
  }, [isMounted]);

  useEffect(() => {
    const handleResize = () => {
      if (!window.matchMedia('(pointer: coarse)').matches) location.reload();
    }
    window.addEventListener('resize', handleResize);
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsMounted(true);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMounted) return null;

  return (
    <ReactLenis root>
      <Context.Provider value={{isDarkMode: isDarkMode, setIsDarkMode: setIsDarkMode}}>
        <header ref={header} className="md:h-[81px] flex px-8 pt-8 items-center fixed w-screen top-0 z-40">
          <Welcome />
          <Nav open={open} setOpen={setOpen} />
          <Slider open={open} />
        </header>
        <main id="main" className="overflow-x-hidden h-[500vh]">
          <div ref={spacer}></div>
          <Hero className="px-8" />
          <Us />
        </main>
      </Context.Provider>
    </ReactLenis>
  );
}