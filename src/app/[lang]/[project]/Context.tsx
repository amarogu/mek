import Slider from "@/app/Slider";
import {type getDictionary} from "@/dictionaries";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

interface ContextProps {
    dict: Awaited<ReturnType<typeof getDictionary>>["projects"];
    menu: Awaited<ReturnType<typeof getDictionary>>["nav"]["menu"];
    project: 'unistay';
    isReady: boolean;
}

export default function Context({dict, menu, project, isReady}: ContextProps) {

    const container = useRef<HTMLDivElement>(null);

    const global = dict.global.context;
    const local = dict[project].context;

    return (
        <section className="px-8 container mx-auto pt-14 h-[200vh]">
            <div ref={container}>
                <h2 className="text-5xl md:text-8xl lg:text-9xl font-semibold uppercase">Context</h2>
            </div>
        </section>
    )
}