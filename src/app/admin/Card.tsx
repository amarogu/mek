import Image, { StaticImageData } from "next/image"
import ThemeImage from "../ThemeImage";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: boolean
}

export default function Card({children, className, padding}: CardProps) {
    return (
        <div className={`flex drop-shadow-md bg-bg-300 backdrop-blur-md dark:bg-dark-bg-300/50 rounded-lg flex-col ${padding ? 'p-6' : ''} ${className ? className : ''}`}>
            {children}
        </div>
    )
}