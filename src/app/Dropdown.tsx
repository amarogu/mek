import ThemeImage from "./ThemeImage";
import ArrowDark from '../../public/keyboard_arrow_down_dark.svg';
import Arrow from '../../public/keyboard_arrow_down.svg';
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Dropdown({text, alt, options, className}: {text: string, alt: string, options: string[], className?: string}) {

    const [open, setOpen] = useState(false);

    const dropdown = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(dropdown.current, {
            scale: 1
        });
    }, [open])

    return (
        <button onClick={() => {setOpen(!open)}} className={`flex relative gap-4 justify-between text-xl opacity-75 items-center ${className}`}>
            <span>{text}</span>
            <ThemeImage srcDark={ArrowDark} srcLight={Arrow} alt={alt} />
            <div ref={dropdown} style={{transform: 'scale(0)'}} className="absolute origin-top-right flex flex-col bg-bg-200 dark:bg-dark-bg-200 right-0 bottom-0 -translate-y-full p-4 mt-2">
                {
                    options.map((o, i) => {
                        return (
                            <p key={i} className="p-3">{o}</p>
                        )
                    })
                }
            </div>
        </button>
    )
}