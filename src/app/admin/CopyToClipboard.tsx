import ThemeImage from "../ThemeImage";
import Copy from '../../../public/content_copy.svg';
import CopyDark from '../../../public/content_copy_dark.svg';
import { useGSAP } from "@gsap/react";
import { MutableRefObject, RefObject, useRef, useState } from "react";
import gsap from "gsap";
import { createPortal } from "react-dom";

export default function CopyToClipboard({contentToWrite}: {contentToWrite?: string}) {

    const btn = useRef<HTMLButtonElement>(null);
    const btnTl = useRef<GSAPTimeline | null>(null);

    const resultTl = useRef<GSAPTimeline | null>(null);

    const {contextSafe} = useGSAP();

    const resultRef = useRef<HTMLDivElement>(null);
    const successRef = useRef<HTMLParagraphElement>(null);
    const errorRef = useRef<HTMLParagraphElement>(null);

    const showResult = contextSafe((tl: MutableRefObject<GSAPTimeline | null>, result: RefObject<HTMLParagraphElement>) => {
        tl.current = gsap.timeline().set([resultRef.current, result.current], {
            display: 'block'
        }).to(resultRef.current, {
            opacity: 1,
            duration: 0.2
        }).to(resultRef.current, {
            opacity: 0,
            duration: 0.2
        }, '+=2').set([resultRef.current, result.current], {
            display: 'none'
        });
    });

    const handleClick = contextSafe(async () => {
        btnTl.current = gsap.timeline().to(btn.current, {opacity: 0.35, duration: 0.15}).to(btn.current, {opacity: 1, duration: 0.15});
        if (contentToWrite) {
            try {
                await navigator.clipboard.writeText(contentToWrite);
                showResult(resultTl, successRef);
            } catch {
                showResult(resultTl, errorRef);
            }
        } else {
            showResult(resultTl, errorRef);
        }
    });

    return (
        <button style={{opacity: 0.75}} onClick={handleClick} ref={btn}>
            <ThemeImage srcDark={CopyDark} srcLight={Copy} width={16} height={16} alt="Copiar para a área de transferência" />
            {
                createPortal(
                    (
                        <div ref={resultRef} style={{opacity: 0, display: 'none'}} className="bg-bg-200 absolute bottom-0 left-1/2 -translate-x-1/2 mb-6 dark:bg-dark-bg-200 p-4 rounded-md">
                            <p ref={successRef} style={{display: 'none'}}>Copiado para a área de transferência</p>
                            <p ref={errorRef} style={{display: 'none'}}>Erro ao copiar para a área de transferência</p>
                        </div>
                    ),
                    document.body
                )
            }
        </button>
    )
}