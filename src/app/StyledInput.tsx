import { ErrorResponse, SuccessResponse, emptyMsg, parseResponse } from "@/lib/helpers";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

export default function StyledInput({type, placeholder, value, onChange, desc, res}: {type: 'text' | 'textarea', placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void, desc?: string, res?: SuccessResponse | ErrorResponse}) {

    const [isFocused, setIsFocused] = useState<boolean>(false);
    const ref = useRef<HTMLParagraphElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(descRef.current, {scale: isFocused || value ? 0 : 1, duration: 0.2, ease: 'power2.inOut'});
        gsap.to(ref.current, {yPercent: isFocused || value ? -100 : 0, scale: isFocused || value ? 0.75 : 1, opacity: isFocused || value ? 0.75 : 1, duration: 0.2, ease: 'power2.inOut'});
    }, [isFocused, value]);

    useGSAP(() => {
        const tl = gsap.timeline();
        if (res === emptyMsg) tl.to(divRef.current, {x: 10, duration: 0.1}).to(divRef.current, {x: -10, duration: 0.1}).to(divRef.current, {x: 0, duration: 0.1});
    }, [res]);

    switch (type) {
        case 'text':
            return (
                <div ref={divRef} className={`border-b relative py-4 transition-colors ${res === emptyMsg ? 'border-red-400' : 'border-text-100 dark:border-dark-text-100'}`}>
                    <p ref={ref} className={`uppercase transition-colors origin-top-left text-2xl font-bold`}>{placeholder}</p>
                    <input value={value} onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} className="absolute top-1/2 z-10 bg-transparent outline-none -translate-y-1/2 w-full h-full left-0"></input>
                </div>
            )
        case 'textarea':
            return (
                <div ref={divRef} className={`border-b relative h-96 pb-4 transition-colors ${res === emptyMsg ? 'border-red-400' : 'border-text-100 dark:border-dark-text-100' }`}>
                    <div className="flex flex-col gap-4">
                        <p ref={ref} className={`uppercase transition-colors origin-top-left text-2xl font-bold ${res?.message === 'An error occurred' ? 'text-red-400' : '' }`}>{placeholder}</p>
                        <div className="relative">
                            {desc ? <p ref={descRef} className={`text-xl origin-top-left ${res === emptyMsg ? 'opacity-0' : ''} transition-opacity text-text-100/75 dark:text-dark-text-100/75`}>{desc}</p> : null}
                            <p ref={descRef} className={`absolute origin-top-left top-0 left-0 text-red-400/75 transition-opacity text-xl ${res === emptyMsg ? 'opacity-1' : 'opacity-0'}`}>{parseResponse(res).for('input')}</p>
                        </div>
                    </div>
                    <textarea onChange={onChange} value={value} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} className="absolute text-xl text-text-100/75 dark:text-dark-text-100/75 top-1/2 z-10 bg-transparent outline-none -translate-y-1/2 w-full resize-none h-full left-0"></textarea>
                </div>
            )
    }
}