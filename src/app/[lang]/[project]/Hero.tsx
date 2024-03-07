import { useRef, useEffect, useState } from "react";
import {type getDictionary} from "@/dictionaries";
import { useMediaQuery } from "react-responsive";
import UniStayTitle from '../../../../public/unistaytitle.png';
import UniStayTitleMobile from '../../../../public/unistaytitlemobile.png';
import Image from "next/image";

interface HeroProps {
    dict: Awaited<ReturnType<typeof getDictionary>>["projects"];
    menu: Awaited<ReturnType<typeof getDictionary>>["nav"]["menu"];
    project: 'unistay';
}

export default function Hero({dict, menu, project}: HeroProps) {

    const isMd = useMediaQuery({ query: '(min-width: 768px)' });

    const global = dict.global;
    const local = dict[project];

    const titleRef = useRef(null);
    const [y, setY] = useState(0);
    const [x, setX] = useState(0);

    useEffect(() => {
        if (titleRef.current) {
            const { offsetHeight, offsetWidth } = titleRef.current;
            setY(-offsetHeight / 2);
            setX(offsetWidth / 2);
        }
    }, [])

    return (
        <section className="flex flex-col gap-14 pt-7 items-start justify-center px-8">
           <div className="max-w-[614px] mx-auto">
                <h1 ref={titleRef} className="hidden">{local.hero.title}</h1>
                <Image src={isMd ? UniStayTitle : UniStayTitleMobile} alt="UniStay" />
            </div>
            <div className="max-w-[614px] w-full text-left mx-auto text-base flex gap-7">
                <div className="w-full flex flex-col gap-5">
                    <p className="border-b pb-2 border-text-200">{global.hero.role}</p>
                    <p className="text-xl">{local.hero.role}</p>
                </div>
                <div className="w-full flex flex-col gap-5">
                    <p className="border-b pb-2 border-text-200">{global.hero.loc}</p>
                    <p className="text-xl">{local.hero.loc}</p>
                </div>
            </div>
        </section>
    )
}