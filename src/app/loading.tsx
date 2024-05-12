import Image from 'next/image';
import Logo from '../../public/meklogo.svg';
import LogoDark from '../../public/meklogo_dark.svg';

export default function Loading() {
    return <div className='flex relative z-50 h-screen items-center justify-center'><picture className='animate-pulse'><source srcSet={LogoDark.src} media="(prefers-color-scheme: dark)" /><Image src={Logo} alt="Logo" width={200} height={200} /></picture></div>
}