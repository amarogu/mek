import Image, { StaticImageData } from "next/image"
import ThemeImage from "../ThemeImage";

interface CardProps {
    children: React.ReactNode;
    className?: string
}

export default function Card({children, className}: CardProps) {
    return (
        <div className={`flex drop-shadow-md bg-bg-300 backdrop-blur-md dark:bg-dark-bg-300/50 rounded-lg p-6 flex-col ${className ? className : ''}`}>
            {children}
        </div>
    )
}