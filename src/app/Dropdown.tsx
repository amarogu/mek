import ThemeImage from "./ThemeImage";
import ArrowDark from '../../public/keyboard_arrow_down_dark.svg';
import Arrow from '../../public/keyboard_arrow_down.svg';
import { CSSProperties, Fragment, MouseEvent, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Divider from "./Divider";

export default function Dropdown({text, alt, options, className, style, action, _id}: {text: string, alt: string, options: string[], className?: string, style?: CSSProperties, action?: (option: boolean, _id: string) => Promise<string>, _id?: string}) {

    const [open, setOpen] = useState(false);

    const dropdown = useRef<HTMLDivElement>(null);

    const label = useRef<HTMLSpanElement>(null);

    const indicator = useRef<HTMLPictureElement>(null);

    const [labelText, setLabelText] = useState('');

    const [disabled, setDisabled] = useState(false);

    const {contextSafe} = useGSAP(() => {
        gsap.to(dropdown.current, {
            scale: open ? 1 : 0,
            duration: 0.2
        });

        gsap.to([label.current, indicator.current], {
            opacity: open ? 0.5 : 1,
            duration: 0.2
        });
    }, [open]);

    const handleClick = contextSafe(async (e: MouseEvent<HTMLParagraphElement, globalThis.MouseEvent>) => {
        setDisabled(true)
        if (action && _id) {
            const option = e.currentTarget.textContent === 'Sim';
            const res = await action(option, _id);
            if (res === 'User confirmed successfully') {
                setOpen(false);
                gsap.to([label.current, indicator.current], {
                    opacity: 0,
                    duration: 0.2,
                    onComplete: () => {
                        setLabelText(option ? 'Sim' : 'Não');
                        gsap.to([label.current, indicator.current], {
                            opacity: 1,
                            duration: 0.2,
                            onComplete: () => {
                                setDisabled(false);
                            }
                        });
                    }
                })
            }
        }
    });

    return (
        <button disabled={disabled} style={style} onBlur={() => {setOpen(false)}} onClick={() => {setOpen(!open)}} className={`flex text-left uppercase font-normal relative gap-4 justify-between text-xl items-center ${className}`}>
            <span ref={label}>{labelText ? labelText : text}</span>
            <ThemeImage ref={indicator} srcDark={ArrowDark} srcLight={Arrow} alt={alt} />
            <div ref={dropdown} style={{transform: 'translateY(105%) scale(0)'}} className="absolute rounded-lg w-32 text-base origin-top-right flex flex-col bg-bg-200/75 dark:bg-dark-bg-200/75 backdrop-blur-md right-0 bottom-0">
                {
                    options.map((o, i) => {
                        return (
                            <Fragment key={i}>
                                <p onClick={(e) => {
                                    handleClick(e);
                                }} className="p-4">{o}</p>
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