'use client';
import Lang from '../../public/language.svg';
import LangDark from '../../public/language_dark.svg';
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { animated } from '@react-spring/web';

export default function NotFound() {

    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const data = useMemo(() => [
        "Not found", // English
        "Non trouvé", // French
        "Nicht gefunden", // German
        "Non trovato", // Italian
        "Não encontrado", // Portuguese
        "No encontrado", // Spanish
        "未找到", // Chinese
        "見つかりません", // Japanese
        "찾을 수 없음" // Korean
    ], []);
    
    const [index, setIndex] = useState(0);
    const [message, setMessage] = useState(data[0]);

    useEffect(() => {
        const initialDelay = 500; // Initial delay
        const base = 0.8; // Base of the exponential function
        const delay = initialDelay * Math.pow(base, index); // Exponential decrease
        const timer = setTimeout(() => {
            let nextIndex = index + 1;
            if (nextIndex >= data.length) { // If we've reached the end, start over
                nextIndex = 0;
            }
            // Only update the index and message if we haven't reached the end
            setIndex(nextIndex);
            setMessage(data[nextIndex]);
            
        }, delay);
        return () => clearTimeout(timer); // Clean up the timer when the component unmounts or re-renders
    }, [index, data]);

    useEffect(() => {
        setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }, [])

    return (
        <animated.div className="flex justify-center flex-col h-screen gap-4 items-center">
            <p className="text-9xl">404</p>
            <div className="flex gap-4 items-center">
                <Image src={isDarkMode ? LangDark : Lang} alt="Language" className="w-5 h-5 md:w-8 md:h-8" />
                <p className="uppercase text-3xl md:text-5xl">{message}</p>
            </div>
        </animated.div>
    )
}