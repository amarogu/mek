'use client';
import Welcome from "./Welcome";
import { ReactLenis } from '@studio-freight/react-lenis'
import { useEffect, useState, useRef } from "react";
import Context from "./Context";
import Nav from "./Nav";
import Hero from "./Hero";
import gsap from "gsap";

function addClasses(element: HTMLElement, classes: string[]) {
  classes.forEach(className => {
    element.classList.add(className);
  });
}

function removeClasses(element: HTMLElement, classes: string[]) {
  classes.forEach(className => {
    element.classList.remove(className);
  });
}

export default function Home() {

  const [isMounted, setIsMounted] = useState<boolean>(false);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsMounted(true);
  }, []);

  const header = useRef<HTMLElement>(null);

  useEffect(() => {
      const handleScroll = () => {
          if (header.current) {
              if (window.scrollY > 81) {
                  addClasses(header.current, ['fixed', '-top-[81px]', 'bg-bg-200', 'dark:bg-dark-bg-200', 'pb-8', 'z-20']);
                  removeClasses(header.current, ['bg-bg-100', 'dark:bg-dark-bg-100']);
                  gsap.to(header.current, {y: '100%', ease: 'slow'});
                  document.body.style.paddingTop = '81px';
              } else {
                  removeClasses(header.current, ['fixed', '-top-[81px]', 'bg-bg-200', 'dark:bg-dark-bg-200', 'pb-8', 'z-20']);
                  addClasses(header.current, ['bg-bg-100', 'dark:bg-dark-bg-100']);
                  gsap.to(header.current, {y: '0%', ease: 'slow'});
                  document.body.style.paddingTop = '0';
              }
          }
      }
      window.addEventListener('scroll', handleScroll)

      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  if (!isMounted) return null;

  return (
    <ReactLenis root>
      <Context.Provider value={{isDarkMode: isDarkMode, setIsDarkMode: setIsDarkMode}}>
        <header ref={header} className="px-8 pt-8 h-[81px] flex items-center">
          <Welcome />
          <Nav />
        </header>
        <main id="main" className="overflow-x-hidden h-[500vh]">
          <div id="spacer"></div>
          <Hero className="px-8" />
        </main>
      </Context.Provider>
    </ReactLenis>
  );
}