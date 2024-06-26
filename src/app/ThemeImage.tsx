import Image, { StaticImageData } from "next/image";

export default function ThemeImage({srcLight, srcDark, alt, className, width, height, fetchPriority, loading = 'eager', containerClassName}: {srcLight: StaticImageData, srcDark: StaticImageData, alt: string, className?: string, width?: number, height?: number, priority?: boolean, fetchPriority?: 'high' | 'low' | 'auto', loading?: 'eager' | 'lazy', containerClassName?: string}) {
    return (
        <picture className={containerClassName ? containerClassName : ''}>
            <Image src={srcLight} alt={alt} className={`${className} dark:hidden`} width={width} height={height} fetchPriority={fetchPriority} loading={loading} />
            <Image src={srcDark} alt={alt} className={`${className} dark:block hidden`} width={width} height={height} fetchPriority={fetchPriority} loading={loading} />
        </picture>
    )
}