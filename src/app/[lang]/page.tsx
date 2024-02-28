'use client';
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import Welcome from "./Welcome";
import Image from "next/image";
import UniStay from '../../../public/unistayplaceholder.jpeg';
import PrettyChatPlaceholder from '../../../public/prettychatplaceholder.png';
import RespondlyPlaceholder from '../../../public/respondlyplaceholder.png';
import Projects from "./Projects";
import { ReactLenis } from '@studio-freight/react-lenis'
import Contact from "./Contact";
import Footer from "./Footer";
import { Locale } from "@/i18n.config";
import { getDictionary } from "../../dictionaries";
import { useEffect, useState } from "react";

export default function Home({params: { lang }}: {params: {lang: Locale}}) {

  const [dict, setDict] = useState<Awaited<ReturnType<typeof getDictionary>>>();

  useEffect(() => {
    const dictHelper = async () => {
      const dictionary = await getDictionary(lang);
      return dictionary;
    }
    dictHelper().then(setDict);
  }, [dict]);

  if (!dict) return ;

  return (
    <ReactLenis root>
      <header className="h-[84px] relative z-20">
        <Welcome />
        <Nav />
      </header>
      <main id="main" className="relative text-3xl overflow-x-hidden">
        <div id="spacer"></div>
        <Hero dict={dict.home.hero} />
        <About dict={dict.home.about} />
        <Projects
          dict={dict.home.projects}
          projects={[
            {
              title: 'UniStay',
              type: dict.home.projects.types.ios,
              image: <Image src={UniStay} alt="UniStay" />,
              link: '/unistay'
            },
            {
              title: 'PrettyChat',
              type: dict.home.projects.types.web,
              image: <Image src={PrettyChatPlaceholder} alt="PrettyChat" />,
              link: '/prettychat'
            },
            {
              title: 'Respondly',
              type: dict.home.projects.types.website,
              image: <Image src={RespondlyPlaceholder} alt="Respondly" />,
              link: '/respondly'
            }
          ]}
        />
        <Contact />
        <Footer />
      </main>
    </ReactLenis>
  );
}