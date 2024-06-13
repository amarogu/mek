'use client';
import Welcome from "./Welcome";
import { ReactLenis } from '@studio-freight/react-lenis'
import { useEffect, useRef, useState } from "react";
import Context from "./Context";
import Nav from "./Nav";
import Hero from "./Hero";
import Slider from "./Slider";
import Us from "./Us";
import { IGift, IUser, IGroup } from "@/lib/Models/Interfaces";
import Loading from "./loading";
import Messages from "./Messages";
import Gifts from "./Gifts";
import { LeanDocument } from "@/lib/helpers";
import Confirmation from "./Confirmation";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function Content({item, gifts}: {item?: LeanDocument<IUser> | LeanDocument<IGroup>, gifts: LeanDocument<IGift>[]}) {

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

  useGSAP(() => {

    gsap.registerPlugin(ScrollTrigger);

    const prevHeightMap = new WeakMap();

    const observer = new MutationObserver(mutationsList => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          if (mutation.target instanceof Element) {
            const target = mutation.target;
            const prevHeight = prevHeightMap.get(target) || '';
            const currentHeight = window.getComputedStyle(target).height;

            // Check if the height has changed
            if (prevHeight !== currentHeight) {
              console.log('Height changed, refreshing');
              ScrollTrigger.refresh();
              // Update the stored height value
              prevHeightMap.set(target, currentHeight);
            }
          }
        }
      }
    });

    // Select all elements on the page
    const allElements = document.querySelectorAll('*');

    // Observe each element for style attribute changes
    allElements.forEach(element => {
      // Store the initial height of the element
      const initialHeight = window.getComputedStyle(element).height;
      prevHeightMap.set(element, initialHeight);

      observer.observe(element, { attributes: true, attributeFilter: ['style'] });
    });
  }, [isMounted])

  useEffect(() => {
    let height = window.innerHeight;
    let width = window.innerWidth;
    const handleResize = () => {
      if (window.innerHeight === height && window.innerWidth !== width) location.reload();
    }
    window.addEventListener('resize', handleResize);
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsMounted(true);
    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isMounted) return <Loading />;

  return (
      <ReactLenis root>
        <Context.Provider value={{isDarkMode: isDarkMode, setIsDarkMode: setIsDarkMode}}>
            <header id="header" ref={header} className="md:h-[81px] overflow-x-hidden flex px-8 pt-8 items-center fixed w-screen top-0 z-40">
              <Welcome name={item?.name} />
              <Nav open={open} setOpen={setOpen} />
              <Slider open={open} setOpen={setOpen} />
            </header>
            <main id="main" className="overflow-x-hidden overflow-y-hidden !h-screen">
              <div ref={spacer}></div>
              <Hero item={item} id="hero" className="px-8" />
              <Us id="us" />
              <Messages id="messages" item={item} />
              <Gifts id="gifts" item={item} gifts={gifts} />
              <Confirmation id="confirm" />
            </main>
        </Context.Provider>
      </ReactLenis>
  );
}