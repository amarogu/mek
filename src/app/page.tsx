'use client';
import Welcome from "./Welcome";
import { ReactLenis } from '@studio-freight/react-lenis'
import { useEffect, useState } from "react";
import Context from "./Context";

export default function Home() {

  const [isMounted, setIsMounted] = useState<boolean>(false);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsMounted(true);
  }, [])

  if (!isMounted) return null;

  return (
    <ReactLenis root>
      <Context.Provider value={{isDarkMode: isDarkMode, setIsDarkMode: setIsDarkMode}}>
        <header className="h-[84px] relative z-20">
          <Welcome />
        </header>
        <main id="main" className="overflow-x-hidden p-8">
          <div id="spacer"></div>
        </main>
      </Context.Provider>
    </ReactLenis>
  );
}