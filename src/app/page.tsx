'use client';
import Welcome from "./Welcome";
import { ReactLenis } from '@studio-freight/react-lenis'
import { useEffect, useState } from "react";
import Context from "./Context";
import Nav from "./Nav";
import Hero from "./Hero";
import Slider from "./Slider";

export default function Home() {

  const [isMounted, setIsMounted] = useState<boolean>(false);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <ReactLenis root>
      <Context.Provider value={{isDarkMode: isDarkMode, setIsDarkMode: setIsDarkMode}}>
        <header className="px-8 pt-8 h-[81px] flex items-center">
          <Welcome />
          <Nav open={open} setOpen={setOpen} />
          <Slider open={open} />
        </header>
        <main id="main" className="overflow-x-hidden h-[500vh]">
          <div id="spacer"></div>
          <Hero className="px-8" />
        </main>
      </Context.Provider>
    </ReactLenis>
  );
}