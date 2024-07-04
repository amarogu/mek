import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { MutableRefObject } from "react";
import { useRef, useState } from "react"
import moment from 'moment';
moment().format();

export default function BottomTab({className}: {className?: string}) {

    const timeRef = useRef<HTMLParagraphElement>(null);
    const timeTl = useRef<GSAPTimeline | null>(null);

    const [timeOption, setTimeOption] = useState<'time' | 'timeUntil'>('time');

    const pulse = (tl: MutableRefObject<GSAPTimeline | null>, target: MutableRefObject<HTMLParagraphElement | null> | MutableRefObject<(HTMLParagraphElement | HTMLSpanElement | null)[]>, replacementContent: string | string[]) => {
        tl.current = gsap.timeline().to(target.current, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                if (target.current instanceof Array) {
                    target.current.forEach((t, i) => {
                        if (t && t.textContent && replacementContent instanceof Array) {
                            t.textContent = replacementContent[i];
                        }
                        if (t && t.textContent && !(replacementContent instanceof Array)) {
                            t.textContent = replacementContent;
                        }
                    });
                } else {
                    if (target.current && !(replacementContent instanceof Array)) target.current.textContent = replacementContent;
                }
            }
        }).to(target.current, {
            opacity: 1,
            duration: 0.2
        })
    };

    useGSAP((_, contextSafe) => {
        if (contextSafe) {
            setTimeout(contextSafe(() => {
                const now = moment();
                const wedding = moment([2024, 10, 9, 4, 30]);
                const diff = wedding.diff(now, 'days');
                setTimeOption(timeOption === 'time' ? 'timeUntil' : 'time');
                pulse(timeTl, timeRef, timeOption === 'time' ? '16:30' : `Faltam ${diff} dias`);
            }), 2000);
        }
    }, [timeOption])

    return (
        <div className="px-8 absolute bottom-0 flex w-full justify-center">
            <div className={`grid bottomTab z-10 text-xs container pb-8 grid-cols-3 ${className ? className : ''}`}>
                <p className="justify-self-start"><a href="https://maps.app.goo.gl/bS5KpEtKDsBoigbM7" target="_blank">Saint German Eventos</a></p>
                <p ref={timeRef} className="justify-self-center">
                    16:30
                </p>
                <p className="justify-self-end">09 NOV 2024</p>
            </div>
        </div>
    )
}