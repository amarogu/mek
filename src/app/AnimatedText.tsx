import { useLenis } from "@studio-freight/react-lenis";
import { parseNavItem } from "@/lib/helpers";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AnimatedText({content, offset, disabled, className}: {content: string, offset: number, disabled?: boolean, className?: string}) {

    const lenis = useLenis(() => {});

    const letterRefs = useRef<HTMLSpanElement[]>([]);
    const lowerLetterRefs = useRef<HTMLSpanElement[]>([]);

    const tl = useRef<GSAPTimeline | null>();
    const clickTl = useRef<GSAPTimeline | null>();

    const { contextSafe } = useGSAP(() => {
        tl.current = gsap.timeline().to(letterRefs.current, {
            y: -15,
            stagger: 0.01,
            duration: 0.2
        }).to(lowerLetterRefs.current, {
            stagger: 0.02,
            duration: 0.2,
            yPercent: -100
        }).pause();
    });

    const handleMouseEnter = contextSafe(() => {
        if (tl.current) {
            tl.current.restart();
        }
    });

    const handleClick = contextSafe(() => {
        if (lenis) {
            if (clickTl.current) {
                clickTl.current.kill();
                clickTl.current = null;
            }
            clickTl.current = gsap.timeline().to('main', {opacity: 0, onComplete: () => {
                lenis.scrollTo(parseNavItem(content), {
                    immediate: true,
                    offset: content === 'festa' ? 0 : offset
                });
            }}).to('main', {opacity: 1});
        }
    });

    return (
        <button disabled={disabled} onMouseEnter={handleMouseEnter} className={`uppercase overflow-hidden h-[15px] text-xs ${className ? className : ''}`} onClick={handleClick}>
            <div>
                {
                    Array.from(content).map((l, j) =>
                        <span ref={el => {
                            if (el) {
                                letterRefs.current[j] = el;
                            }
                        }} className="inline-block" key={j}>
                            {l}
                        </span>
                    )
                }
            </div>
            <div>
                {
                    Array.from(content).map((l, j) =>
                        <span ref={el => {
                            if (el) {
                                lowerLetterRefs.current[j] = el;
                            }
                        }} className="inline-block" key={j}>
                            {l}
                        </span>
                    )
                }
            </div>
        </button>
    )
}