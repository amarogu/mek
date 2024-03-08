import Slider from "@/app/Slider";
import {type getDictionary} from "@/dictionaries";
import { useRef } from "react";

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
        <section className="px-8 container mx-auto">
            <div ref={container}>
                <Slider isReady={isReady} container={container} markers content={global.title} />
            </div>
        </section>
    )
}