import Slider from "@/app/Slider";
import {type getDictionary} from "@/dictionaries";
import { useRef } from "react";

interface IntroProps {
    dict: Awaited<ReturnType<typeof getDictionary>>["projects"];
    menu: Awaited<ReturnType<typeof getDictionary>>["nav"]["menu"];
    project: 'unistay';
}

export default function Intro({dict, menu, project}: IntroProps) {

    const global = dict.global.intro;
    const local = dict[project].intro;
    const container = useRef<HTMLDivElement>(null);

    return (
        <section className="container mx-auto px-8 pt-14">
            <div ref={container}>
                <Slider content={global.title} container={container} />
                <div className="flex flex-col pt-14">
                    <p>{local.desc}</p>
                </div>
            </div>
        </section>
    )
}