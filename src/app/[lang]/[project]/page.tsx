'use client';
import { notFound } from "next/navigation";
import { ReactLenis } from '@studio-freight/react-lenis'
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/dictionaries";
import Nav from "../Nav";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const whitelist = ['unistay'];

export default function Project({ params: {lang, project} } : { params: {lang: Locale, project: string} }) {

    if (!whitelist.includes(project)) {
        return notFound();
    }

    const [dict, setDict] = useState<Awaited<ReturnType<typeof getDictionary>> | null>(null);

    useEffect(() => {
        const dictHelper = async () => {
          const dictionary = await getDictionary(lang);
          return dictionary;
        }
        dictHelper().then(setDict);
    }, [dict]);
    
    useGSAP(() => {
        gsap.fromTo('#initial-loader', {
          opacity: 0
        }, {
          opacity: 1,
          repeat: -1,
          duration: 1.5
        })
    }, [])
    
    if (!dict) {
        return (
          <div className="h-screen w-full flex items-center justify-center">
            <div id="initial-loader" className="rounded-full w-6 h-6 bg-text-200"></div>
          </div>
        )
    }

    return (
        <ReactLenis root>
            <header className="h-[84px] relative z-20">
                <Nav dict={dict.nav} />
            </header>
        </ReactLenis>
    );
}