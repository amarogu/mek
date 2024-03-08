import { useRef, useEffect, useState } from "react";
import {type getDictionary} from "@/dictionaries";
import { useMediaQuery } from "react-responsive";
import UniStayTitle from '../../../../public/unistaytitle.png';
import UniStayTitleMobile from '../../../../public/unistaytitlemobile.png';
import Profile from '../../../../public/profile.png';
import HomeDark from '../../../../public/homedark.png';
import HomeLight from '../../../../public/homelight.png';
import Image from "next/image";
import { Parallax } from "@/app/Parallax";

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
            <div className="md:container md:px-8 relative flex md:gap-14 justify-center lg:justify-between items-center w-full md:mx-auto">
                {
                    isMd 
                    ? 
                    <>
                        <Parallax speed={-3} className="w-1/3 lg:w-[25%]">
                            <Image src={HomeDark} alt="UniStay home dark" />
                        </Parallax>
                        <Image src={HomeLight} alt="UniStay home light" className="static w-[35%]" />
                        <Parallax speed={-3} className="static w-1/3 lg:w-[25%]">
                            <Image src={Profile} alt="Profile" />
                        </Parallax>
                    </>
                    : 
                    <>
                        <Image src={HomeDark} className="w-[80%] order-1" alt="UniStay home dark" />
                        <Parallax speed={-4}className="absolute -left-1/2 w-[70%] -z-10" >
                            <Image src={HomeLight} alt="UniStay home light" />
                        </Parallax>
                        <Parallax speed={-4} className="absolute w-[70%] -right-1/2 -z-10">
                            <Image src={Profile} alt="Profile" />
                        </Parallax>
                    </>
                }
            </div>
        </section>
    )
}