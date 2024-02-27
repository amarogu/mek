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

export default async function Home({params: { lang }}: {params: {lang: Locale}}) {

  const { home, footer, nav } = await getDictionary(lang);

  return (
    <ReactLenis root>
      <header className="h-[84px] relative z-20">
        <Welcome />
        <Nav />
      </header>
      <main id="main" className="relative text-3xl overflow-x-hidden">
        <div id="spacer"></div>
        <Hero dict={home.hero} />
        <About dict={home.about} />
        <Projects
          dict={home.projects}
          projects={[
            {
              title: 'UniStay',
              type: home.projects.types.ios,
              image: <Image src={UniStay} alt="UniStay" />,
              link: '/unistay'
            },
            {
              title: 'PrettyChat',
              type: home.projects.types.web,
              image: <Image src={PrettyChatPlaceholder} alt="PrettyChat" />,
              link: '/prettychat'
            },
            {
              title: 'Respondly',
              type: home.projects.types.website,
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