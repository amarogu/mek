'use client';
import Welcome from "./Welcome";
import { ReactLenis } from '@studio-freight/react-lenis'
import { useEffect, useRef, useState } from "react";
import Context from "./Context";
import Nav from "./Nav";
import Hero from "./Hero";
import Slider from "./Slider";
import Us from "./Us";
import { IUser } from "@/lib/Models/User";
import { IGroup } from "@/lib/Models/Group";
import Loading from "./loading";
import Messages from "./Messages";
import { IGift } from "@/lib/Models/Gift";
import Gifts from "./Gifts";
import { HydratedDocument } from "mongoose";

export default function Content({item, gifts}: {item?: HydratedDocument<IUser> | HydratedDocument<IGroup>, gifts: HydratedDocument<IGift>[]}) {

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
            <header ref={header} className="md:h-[81px] flex px-8 pt-8 items-center fixed w-screen top-0 z-40">
              <Welcome name={item?.name} />
              <Nav open={open} setOpen={setOpen} />
              <Slider open={open} />
            </header>
            <main id="main" className="overflow-x-hidden overflow-y-hidden !h-screen">
              <div ref={spacer}></div>
              <Hero item={item} id="hero" className="px-8" />
              <Us id="us" />
              <Messages id="messages" item={item} />
              <Gifts item={item} gifts={gifts} />
            </main>
        </Context.Provider>
      </ReactLenis>
  );
}