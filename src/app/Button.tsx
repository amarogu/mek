import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import ArrowForward from '../../public/arrow_forward.svg';
import { useLenis } from "@studio-freight/react-lenis";

interface ButtonProps {
    content: string;
    onClick?: () => void;
    className?: string;
    scrollTo?: string;
}

export default function Button({content, onClick, className, scrollTo}: ButtonProps) {

    const lenis = useLenis(({scroll}) => {});

    const [isHighEnoughState, setIsHighEnough] = useState(false);
    const isHighEnough = useMediaQuery({query: '(min-height: 700px)'});

    useEffect(() => {
        setIsHighEnough(isHighEnough);
    }, [isHighEnough]);


    const subButton = useRef<HTMLButtonElement>(null);
    const subButtonUnder = useRef<HTMLButtonElement>(null);
    const sub = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        gsap.to(subButton.current, {
            y: '-100%',
            opacity: 0,
        });
        gsap.to(subButtonUnder.current, {
            y: '0%',
            opacity: 1,
        });
    }

    const handleMouseLeave = () => {
        gsap.to(subButton.current, {
            y: '0%',
            opacity: 1,
        });
        gsap.to(subButtonUnder.current, {
            y: '100%',
            opacity: 0,
        });
    }

    return (
        <div ref={sub} className={`w-fit cursor-pointer h-[32px] relative overflow-y-hidden ${className ?? ""}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button ref={subButton} className='flex gap-4 items-center' onClick={() => {lenis?.scrollTo(`#${scrollTo}`, {duration: 2, offset: -104}); onClick}} >
                <Image src={ArrowForward} alt="Arrow Forward" />
                <p className={`underline underline-offset-4 ${isHighEnoughState ? "text-2xl" : "text-xl"}`}>{content}</p>
            </button>
            <button ref={subButtonUnder} style={{transform: 'translateY(100%)', opacity: 0}} className='flex absolute top-0 gap-4 items-center' onClick={() => {lenis?.scrollTo(`#${scrollTo}`, {duration: 2, offset: -104}); onClick}} >
                <Image src={ArrowForward} alt="Arrow Forward" />
                <p className={`underline underline-offset-4 ${isHighEnoughState ? "text-2xl" : "text-xl"}`}>{content}</p>
            </button>
        </div>
    )
}