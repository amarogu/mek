import Slider from "@/app/Slider";
import {type getDictionary} from "@/dictionaries";
import { useRef, useEffect, useState } from "react";
import Tag from "../../../../public/tag.svg";
import Image from "next/image";
import Button from "@/app/Button";
import MacBook from "../../../../public/macbookunistay.png";

interface IntroProps {
    dict: Awaited<ReturnType<typeof getDictionary>>["projects"];
    menu: Awaited<ReturnType<typeof getDictionary>>["nav"]["menu"];
    project: 'unistay';
    onSet: () => void;
}

export default function Intro({dict, menu, project, onSet}: IntroProps) {

    const [containerHeight, setContainerHeight] = useState(0);

    const global = dict.global.intro;
    const local = dict[project].intro;
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                setContainerHeight(entry.contentRect.height);
                onSet();
            }
        });
    
        if (container.current) {
            resizeObserver.observe(container.current);
        }
    
        // Cleanup function to disconnect the observer when the component unmounts
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <section className="container mx-auto px-8 pt-14">
            <div ref={container} className="flex flex-col lg:w-full gap-14">
                <h2 className="text-5xl md:text-8xl font-semibold lg:text-9xl uppercase">{global.title}</h2>
                <div className="flex flex-col gap-14 lg:flex-row">
                    <div className="flex flex-col lg:justify-between lg:gap-9 lg:w-1/2">
                        <p>{local.desc}</p>
                        <Button content={global.sub} className="hidden lg:block" />
                    </div>
                    <div className="flex flex-col gap-5 lg:grow">
                        <div className="border-b flex justify-between border-text-200 pb-4">
                            <p>{global.keywords}</p>
                            <Image src={Tag} alt="Tag" />
                        </div>
                        {
                            local.keywords.map((keyword, index) => (
                                <p key={index}>{keyword}</p>
                            ))
                        }
                    </div>
                </div>
                <Button content={global.sub} className="lg:hidden" />
                <Image src={MacBook} alt="UniStay, designed for desktop" />
            </div>
        </section>
    )
}