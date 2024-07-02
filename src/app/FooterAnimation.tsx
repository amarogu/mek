import { useContext, useEffect, useRef, useState } from 'react';
import Context from './Context';

type DotStyle = {
    position: 'absolute',
    height: string,
    width: string,
    backgroundColor: string,
    left: string,
    top: string
}

export default function FooterAnimation({className}: {className?: string}) {
    const footerRef = useRef<HTMLDivElement>(null);
    const [dots, setDots] = useState<DotStyle[]>([]);

    const { isDarkMode } = useContext(Context);

    useEffect(() => {
        const dotSize = 2;
        const preferredDotSpace = 47; // your preferred dot spacing

        const footerEle = footerRef.current;
        if (footerEle) {
            let footerHeight = footerEle.offsetHeight;
            let footerWidth = footerEle.offsetWidth;

            let noOfDotsVertical = Math.floor((footerHeight + preferredDotSpace) / (dotSize + preferredDotSpace));
            let actualDotSpaceVertical = (footerHeight - (noOfDotsVertical*dotSize)) / (noOfDotsVertical-1);
            
            let noOfDotsHorizontal = Math.floor((footerWidth + preferredDotSpace) / (dotSize + preferredDotSpace));
            let actualDotSpaceHorizontal = (footerWidth - (noOfDotsHorizontal*dotSize)) / (noOfDotsHorizontal-1);
            
            let newDots: DotStyle[] = [];
            for(let i=0; i<noOfDotsVertical; i++) {
                for(let j=0; j<noOfDotsHorizontal; j++) {
                    const style: DotStyle = {
                        position: 'absolute',
                        height: `${dotSize}px`,
                        width: `${dotSize}px`,
                        backgroundColor: isDarkMode ? '#333333' : '#ffffff',
                        left: `${j * (dotSize + actualDotSpaceHorizontal)}px`,
                        top: `${i * (dotSize + actualDotSpaceVertical)}px`
                    };
                    newDots.push(style);
                }
            }
            
            setDots(newDots);
        }
        
    }, [isDarkMode]);

    return (
        <div ref={footerRef} className={`relative mb-6 md:mb-12 h-96 w-full ${className}`}>
            {dots.map((dot, index) => (
                <div key={index} style={dot} />
            ))}
        </div>
    )
}