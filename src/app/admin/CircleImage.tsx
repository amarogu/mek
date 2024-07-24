import Image, { StaticImageData } from "next/image";

export default function CircleImage({src, alt, width, height}: {src: StaticImageData, alt: string, width?: string, height?: string}) {
    return (
        <Image className={`rounded-full object-cover ${width ? width : 'w-8'} ${height ? height : 'h-8'}`} src={src} alt={alt} />
    )
}