import Slider from "@/app/Slider";
import {type getDictionary} from "@/dictionaries";
import { useRef } from "react";
import Tag from "../../../../public/tag.svg";
import Image from "next/image";
import Button from "@/app/Button";
import MacBook from "../../../../public/macbookunistay.png";

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
            <div ref={container} className="flex flex-col lg:w-full gap-14">
                <Slider content={global.title} container={container} />
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