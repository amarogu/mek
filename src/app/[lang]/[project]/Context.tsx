import Slider from "@/app/Slider";
import {type getDictionary} from "@/dictionaries";
import { useRef } from "react";
import ArrowDown from "../../../../public/arrow_downward.svg";
import ArrowRight from "../../../../public/arrow_forward.svg";
import Image from "next/image";
import { useMediaQuery } from "react-responsive"
import GustavoAmaro from "../../../../public/gustavo_amaro_research.png";

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
    const isLg = useMediaQuery({ query: '(min-width: 1024px)' });

    return (
        <section className="px-8 container mx-auto h-[200vh]">
            <div ref={container} className="h-[100vh] flex flex-col gap-14">
                <Slider offset="-25%" isReady={isReady} container={container} content={global.title} />
                <div className="flex gap-4 uppercase self-center">
                    <Image src={ArrowDown} alt="Arrow Down" />
                    <p>{global.scroll}</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-14">
                    <div className="flex flex-col gap-14 justify-between">
                        <p>{local.desc}</p>
                        <div className="flex gap-7 items-center">
                            <div className="h-[1px] grow bg-text-200"></div>
                            <div className="flex gap-4">
                                <p>{global.research}</p>
                                <Image src={isLg ? ArrowRight : ArrowDown} alt="Arrow right" />
                            </div>
                        </div>
                    </div>
                    <Image src={GustavoAmaro} className="lg:w-1/2 lg:shrink-0" alt="An image of Gustavo researching" />
                </div>
            </div>
        </section>
    )
}