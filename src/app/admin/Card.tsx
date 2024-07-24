import Image, { StaticImageData } from "next/image"
import ThemeImage from "../ThemeImage";

interface CardProps {
    children: React.ReactNode;
}

export default function Card({children}: CardProps) {
    return (
        <div className="flex bg-bg-300 bg-gradient-to-tr dark:from-dark-bg-200 dark:to-dark-bg-300 rounded-lg p-6 flex-col">
            {children}
        </div>
    )
}