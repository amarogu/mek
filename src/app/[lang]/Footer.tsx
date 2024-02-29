import GsapMagnetic from "./GsapMagnetic";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useLenis } from '@studio-freight/react-lenis';
import {type getDictionary} from "@/dictionaries";

export default function Footer({ dict } : {dict: Awaited<ReturnType<typeof getDictionary>>["footer"]}) {

    const lenis = useLenis(({scroll}) => {});

    const data = ['Instagram', 'LinkedIn', 'GitHub']

    const handleMouseEnter = (item: string, i: number) => {
        gsap.to(`#${item}-${i} div`, {width: '100%', duration: 0.25});
    }

    const handleMouseLeave = (name:string, i: number) => {
        gsap.to(`#${name}-${i} div`, {width: '0%', duration: 0.25});
    }


    return (
        <footer className="text-xl flex flex-col md:flex-row gap-20 md:gap-0 md:justify-between mb-12 px-8 container mx-auto">
            <div className="flex justify-between md:gap-10">
                <div className="flex flex-col gap-3">
                    <button className="text-left" onClick={() => {lenis?.scrollTo(0, {duration: 2})}}>
                        <p>&#169; {dict.rights} </p>
                    </button>
                    <p>{dict.loc}</p>
                </div>
                <div className="flex gap-3 flex-col">
                    <p>{dict.version}</p>
                    <p>1.0 2024</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-[40%]">
                <div className="flex items-center gap-6">
                    <p className="text-lg shrink-0">{dict.socials}</p>
                    <span className="h-[1px] w-full inline-block bg-text-200"></span>
                </div>
                <div className="flex justify-between">
                    {
                        data.map((item, i) => {
                            return (
                                <GsapMagnetic key={i}>
                                    <div id={`${item}-${i}`} className="flex flex-col gap-3" onMouseEnter={() => {handleMouseEnter(item, i)}} onMouseLeave={() => {handleMouseLeave(item, i)}}>
                                        <a className="cursor-pointer">{item}</a>
                                        <div style={{width: '0%'}} className="h-[1px] bg-text-200"></div>
                                    </div>
                                </GsapMagnetic>
                            )
                        })
                    }
                </div>
            </div>
        </footer>
    )
}