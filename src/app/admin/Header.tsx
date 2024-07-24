import Image, { StaticImageData } from "next/image"

export default function Header({image, title, children, alt}: {image: StaticImageData, title: string, children: React.ReactNode, alt: string}) {
    return (
        <header className="flex gap-4">
            <Image src={image} alt={alt} />
            <h2>{title}</h2>
            {children}
        </header>
    )
}