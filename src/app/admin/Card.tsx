import Image, { StaticImageData } from "next/image"
import ThemeImage from "../ThemeImage";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: boolean;
    background?: boolean;
}

export default function Card({children, className, padding, background}: CardProps) {
    return (
        <div className={`flex shadow-white ${background ? 'bg-bg-300 dark:bg-dark-bg-300/50' : ''} rounded-lg flex-col ${padding ? 'p-6' : ''} ${className ? className : ''}`}>
            {children}
        </div>
    )
}