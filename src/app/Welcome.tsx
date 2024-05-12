'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Language from '../../public/language.svg';
import LanguageDark from '../../public/language_dark.svg';
import Image from 'next/image';

export default function Welcome({ name }: { name?: string }) {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);

    useEffect(() => {
        setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
        Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
            setIsPageLoaded(true);
        });        
    }, [])

    const data = useMemo(() => [
        "Welcome", // English
        "Bienvenue", // French
        "Willkommen", // German
        "Benvenuto", // Italian
        "Bem-vindo", // Portuguese
        "Bienvenido", // Spanish
        "歡迎", // Chinese
        "ようこそ", // Japanese
        "환영합니다" // Korean
    ], []);
    const [index, setIndex] = useState(0);
    const [message, setMessage] = useState(data[0]);

    const styles = useSpring({
        to: { transform: index === data.length - 1 && isPageLoaded ? 'translateY(-100%)' : 'translateY(0%)' },
        from: { transform: 'translateY(0%)'},
    });

    useEffect(() => {
        const initialDelay = 500; // Initial delay
        const base = 0.8; // Base of the exponential function
        const delay = initialDelay * Math.pow(base, index); // Exponential decrease
        const timer = setTimeout(() => {
            const nextIndex = index + 1;
            if (nextIndex < data.length) { // Only update the index and message if we haven't reached the end
                setIndex(nextIndex);
                setMessage(data[nextIndex]);
            }
        }, delay);
        return () => clearTimeout(timer); // Clean up the timer when the component unmounts or re-renders
    }, [index, data]);

    return (
        <animated.div style={styles} className="fixed z-50 flex justify-center items-center top-0 left-0 w-full h-screen dark:bg-dark-bg-100/75 backdrop-blur-lg dark:border-dark-bg-300/50 bg-bg-100/75">
            <div className='flex gap-4 items-center'>
                <Image src={isDarkMode ? LanguageDark : Language} width={20} height={20} alt="Language" />
                <p className='text-3xl'>{message} {name ? name : ''}</p>
            </div>
        </animated.div>
    )
}