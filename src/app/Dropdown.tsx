import ThemeImage from "./ThemeImage";
import ArrowDark from '../../public/keyboard_arrow_down_dark.svg';
import Arrow from '../../public/keyboard_arrow_down.svg';
import { CSSProperties, Fragment, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Divider from "./Divider";

export default function Dropdown({text, alt, options, className, style}: {text: string, alt: string, options: string[], className?: string, style?: CSSProperties}) {

    const [open, setOpen] = useState(false);

    const dropdown = useRef<HTMLDivElement>(null);

    const label = useRef<HTMLSpanElement>(null);

    const indicator = useRef<HTMLPictureElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(CustomEase);

        gsap.to(dropdown.current, {
            scale: open ? 1 : 0,
            duration: 0.2
        });

        gsap.to(label.current, {
            opacity: open ? 0.5 : 1,
            duration: 0.2
        });
    }, [open]);

    return (
        <button style={style} onBlur={() => {setOpen(false)}} onClick={() => {setOpen(!open)}} className={`flex text-left uppercase font-normal relative gap-4 justify-between text-xl items-center ${className}`}>
            <span ref={label}>{text}</span>
            <ThemeImage ref={indicator} srcDark={ArrowDark} srcLight={Arrow} alt={alt} />
            <div ref={dropdown} style={{transform: 'translateY(105%) scale(0)'}} className="absolute rounded-lg w-32 gap-4 text-base origin-top-right flex flex-col bg-bg-200/75 dark:bg-dark-bg-200/75 backdrop-blur-md right-0 bottom-0 py-4">
                {
                    options.map((o, i) => {
                        return (
                            <Fragment>
                                <p className="px-4">{o}</p>
                                {
                                    i < options.length - 1 && i % 2 === 0 ? <Divider /> : null
                                }
                            </Fragment>
                        )
                    })
                }
            </div>
        </button>
    )
}