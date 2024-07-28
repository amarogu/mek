import Image, { StaticImageData } from "next/image"
import ThemeImage from "../ThemeImage"

export default function Header({image, title, children, alt}: {image: StaticImageData | StaticImageData[], title: string, children: React.ReactNode, alt: string}) {
    return (
        <header className="flex items-center gap-4 border-b rounded-tl-lg rounded-tr-lg bg-bg-200 dark:bg-dark-bg-200 p-6 border-accent-200/25 dark:border-dark-accent-200/25">
                {
                    (image instanceof Array) ? (
                        <ThemeImage className="h-8 w-8" alt={alt} srcDark={image[1]} srcLight={image[0]} />
                    ) : (
                        <Image className="h-8 w-8" src={image} alt={alt} />
                    )
                }
            <div className="flex flex-col gap-1 self-start">
                <h2 className="font-bold text-lg">{title}</h2>
                {children}
            </div>
        </header>
    )
}