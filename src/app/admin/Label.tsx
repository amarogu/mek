import { StaticImageData } from "next/image"
import Image from "next/image"
import ThemeImage from "../ThemeImage"

export default function Label({text, image, imageAlt}: {text: string, image: StaticImageData | StaticImageData[], imageAlt: string}) {
    return (
        <div className="flex gap-2 items-center">
            {
                (image instanceof Array) ? (
                    <ThemeImage className="w-3 h-3" containerClassName="shrink-0" alt={imageAlt} srcDark={image[1]} srcLight={image[0]} />
                ) : (
                    <Image className="shrink-0 w-3 h-3" src={image} alt={imageAlt} />
                )
            }
            <p className="opacity-75">{text}</p>
        </div>
    )
}