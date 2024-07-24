import ThemeImage from "./ThemeImage";
import ArrowDark from '../../public/keyboard_arrow_down_dark.svg';
import Arrow from '../../public/keyboard_arrow_down.svg';
import { CSSProperties, Fragment, MouseEvent, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Divider from "./Divider";
import { StaticImageData } from "next/image";

export default function Dropdown({text, options, className, style, action, _id, labelImage, labelSize, labelCircle, width, textSize}: {text?: string, options: string[], className?: string, style?: CSSProperties, action?: (...args: any[]) => Promise<string>, _id?: string, labelImage?: StaticImageData[], labelSize?: number, labelCircle?: boolean, width?: string, textSize?: string}) {

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

    const handleClick = contextSafe(async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
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
        } else if (action) {
            action()
        }
    });

    return (
        <div style={style} onBlur={() => {setOpen(false)}} className="relative">
            <button className={`flex gap-4 justify-between items-center text-left uppercase font-normal text-xl ${className}`} disabled={disabled} onClick={() => {setOpen(!open)}}>
                {
                    text ? (
                        <>
                            <span ref={label}>{labelText ? labelText : text}</span>
                            <ThemeImage ref={indicator} srcDark={ArrowDark} srcLight={Arrow} alt='Dropdown' />
                        </>
                    ) : labelImage ? (
                        <ThemeImage ref={label} srcDark={labelImage[1]} srcLight={labelImage[0]} alt="Dropdown" className={labelCircle ? 'rounded-full' : ''} width={labelSize} height={labelSize} />
                    ) : null
                }
            </button>
            <div ref={dropdown} style={{transform: 'translateY(105%) scale(0)'}} className={`absolute rounded-lg ${width ? width : 'w-32'} ${textSize ? textSize : 'text-base'} origin-top-right flex flex-col bg-bg-200/75 dark:bg-dark-bg-200/75 backdrop-blur-md right-0 bottom-0`}>
                {
                    options.map((o, i) => {
                        return (
                            <Fragment key={i}>
                                <button onClick={(e) => {
                                    handleClick(e);
                                }} className="p-4 text-left uppercase font-normal">{o}</button>
                                {
                                    i < options.length - 1 ? <Divider /> : null
                                }
                            </Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}