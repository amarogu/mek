'use client';
import Welcome from "./Welcome";
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import { useEffect, useRef, useState } from "react";
import Context from "./Context";
import Nav from "./Nav";
import Hero from "./Hero";
import Slider from "./Slider";
import Us from "./Us";
import { checkSwipe, easeOutBack, getElScrollPos } from "@/lib/helpers";

export default function Home() {

  const lenis = useLenis(() => {});

  const [sections, setSections] = useState<number[]>([]); // Add more section IDs as needed
  const [sectionIndex, setSectionIndex] = useState(0);

  const [isMounted, setIsMounted] = useState<boolean>(false);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  const spacer = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const us = {
      el: document.getElementById('us'),
      topPos: undefined as number | undefined,
      bottomPos: undefined as number | undefined,
    }
    if (us.el) {
      us.bottomPos = getElScrollPos(us.el, 'bottom');
      us.topPos = getElScrollPos(us.el, 'top');
    }
    if (us.bottomPos && us.topPos) {
      setSections([0, us.topPos, us.bottomPos + 3000]);
    }
  }, [isMounted, lenis])

  useEffect(() => {
    if (spacer.current && header.current) {
      spacer.current.setAttribute('style', `height: ${header.current.clientHeight}px`);
    }
    let touchStartedY: number;
    let touchEndedY: number;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartedY = e.changedTouches[0].clientY;
    }
    const handleTouchEnd = (e: TouchEvent) => {
      let newIndex = sectionIndex;
      touchEndedY = e.changedTouches[0].clientY;
      if (checkSwipe(touchStartedY, touchEndedY) === 'up') {
        newIndex = Math.min(newIndex + 1, sections.length - 1);
      } else {
        newIndex = Math.max(newIndex - 1, 0);
      }
      if (lenis) {lenis.scrollTo(sections[newIndex], {duration: newIndex === 2 || (checkSwipe(touchStartedY, touchEndedY) === 'down' && newIndex === 1) ? 4 : 1.5})};
      setSectionIndex(newIndex);
    }
    window.addEventListener('touchstart', handleTouchStart, {passive: false});
    window.addEventListener('touchend', handleTouchEnd, {passive: false});
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    }
  }, [isMounted, lenis, sectionIndex, sections]);

  useEffect(() => {
    let height = window.innerHeight;
    let width = window.innerWidth;
    const handleResize = () => {
      if (window.innerHeight === height && window.innerWidth !== width) location.reload();
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
            <main id="main" className="overflow-x-hidden h-[800vh]">
              <div ref={spacer}></div>
              <Hero id="hero" className="px-8" />
              <Us id="us" />
            </main>
      </Context.Provider>
      </ReactLenis>
  );
}