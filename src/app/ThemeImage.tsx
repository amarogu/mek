import Image, { StaticImageData } from "next/image";
import { forwardRef } from "react";

const ThemeImage = forwardRef<HTMLPictureElement, {onClick?: () => void, srcLight: StaticImageData, srcDark: StaticImageData, alt: string, className?: string, width?: number, height?: number, priority?: boolean, fetchPriority?: 'high' | 'low' | 'auto', loading?: 'eager' | 'lazy', containerClassName?: string}>(({onClick, srcLight, srcDark, alt, className, width, height, fetchPriority, loading = 'eager', containerClassName}, ref) => {
    return (
        <picture onClick={onClick ? onClick : () => {}} ref={ref} className={containerClassName ? containerClassName : ''}>
            <Image src={srcLight} alt={alt} className={`${className} dark:hidden`} width={width} height={height} fetchPriority={fetchPriority} loading={loading} />
            <Image src={srcDark} alt={alt} className={`${className} dark:block hidden`} width={width} height={height} fetchPriority={fetchPriority} loading={loading} />
        </picture>
    )
});

ThemeImage.displayName = 'ThemeImage';

export default ThemeImage;