import Image, { StaticImageData } from "next/image";

export default function ThemeImage({srcLight, srcDark, alt, className}: {srcLight: StaticImageData, srcDark: StaticImageData, alt: string, className?: string}) {
    return (
        <picture>
            <Image src={srcLight} alt={alt} className={`${className} dark:hidden`} />
            <Image src={srcDark} alt={alt} className={`${className} dark:block hidden`} />
        </picture>
    )
}