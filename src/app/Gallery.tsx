import Image from 'next/image';
import Img1 from '../../public/img1.png';
import Img2 from '../../public/img2.png';
import Img3 from '../../public/img3.png';
import Img4 from '../../public/img4.png';
import Img5 from '../../public/img5.png';
import Img6 from '../../public/img6.png';
import Img7 from '../../public/img7.png';
import Img8 from '../../public/img8.png';
import Img9 from '../../public/img9.png';
import Img10 from '../../public/img10.png';
import Img11 from '../../public/img11.png';
import Close from '../../public/close.svg';
import { Parallax } from './Parallax';
import { useState } from 'react';
import { createPortal } from 'react-dom';

const imgs = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img10, Img11];

export default function Gallery() {

    const [focus, setFocus] = useState<number>(-1);

    const handleClick = (i: number) => {
        const header: HTMLElement | null = document.querySelector('header nav');
        if (header) header.style.filter = 'blur(5px)';
        const main = document.querySelector('main');
        if (main) {main.style.filter = 'blur(10px)'};
        setFocus(i);
    }

    const handleClose = () => {
        const header: HTMLElement | null = document.querySelector('header nav');
        if (header) header.style.filter = 'none';
        const main = document.querySelector('main');
        if (main) {main.style.filter = 'none'; main.style.height = 'auto'; main.style.overflow = 'auto'};
        setFocus(-1);
    }

    return (
        <section className="px-8 pb-24 container mx-auto">
            <div className='grid'>
                {imgs.map((img, i) => {
                    if (focus === i) {
                        return (
                            <>
                                {
                                    createPortal(
                                        <div key={i} className='fixed p-4 gap-4 left-0 top-0 w-full h-full flex justify-center items-center z-50 flex-col'>  
                                            <button onClick={() => handleClick(i)}>
                                                <Image src={img} alt='Imagem de Maria & Kalil' />
                                            </button>
                                            <button onClick={handleClose} className='rounded-full w-8 flex justify-center items-center h-8 bg-bg-300/75 self-start'>
                                                <Image src={Close} alt='Fechar' width={24} height={24} className='opacity-50' />
                                            </button>
                                        </div>, 
                                        document.body
                                    )
                                }
                                <Parallax key={i} reverse speed={4}>
                                    <button onClick={() => handleClick(i)}>
                                        <Image src={img} alt='Imagem de Maria e Kalil' />
                                    </button>
                                </Parallax>
                            </>
                        )
                    }
                    return (
                        <Parallax reverse key={i} speed={4}>
                            <button onClick={() => handleClick(i)}>
                                <Image src={img} alt='Imagem de Maria e Kalil' />
                            </button>
                        </Parallax>
                    )
                }
                )}
            </div>  
        </section>
    )
}