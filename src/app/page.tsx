'use client';
import Welcome from "./Welcome";
import { ReactLenis } from '@studio-freight/react-lenis'
import { useEffect, useState } from "react";

export default function Home() {

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!isMounted) return null;

  return (
    <ReactLenis root>
      <header className="h-[84px] relative z-20">
        <Welcome />
      </header>
      <main id="main" className="relative text-3xl overflow-x-hidden">
        <div id="spacer"></div>
      </main>
    </ReactLenis>
  );
}