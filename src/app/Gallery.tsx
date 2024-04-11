import Image from 'next/image';
import Img1 from '../../public/img1.jpg';
import Img2 from '../../public/img2.jpg';
import Img3 from '../../public/img3.jpg';
import Img4 from '../../public/img4.jpg';
import Img5 from '../../public/img5.jpg';
import Img6 from '../../public/img6.jpg';
import Img7 from '../../public/img7.jpg';
import Img8 from '../../public/img8.jpg';
import Img9 from '../../public/img9.jpg';
import Img10 from '../../public/img10.jpg';
import Img11 from '../../public/img11.jpg';
import GsapMagnetic from './GsapMagnetic';
import { Parallax } from './Parallax';
import { useState } from 'react';

export default function Gallery() {

    const [isFocused, setIsFocused] = useState<boolean>(false);

    const focus = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = e.target as HTMLButtonElement;
        const img = target.querySelector('img') as HTMLImageElement;
        setIsFocused(true);
    }

    return (
        <section className="px-8 pb-24 container mx-auto">
            <div className='grid grid-cols-2'>
                <div className='h-[450px] overflow-hidden'>
                    <Parallax reverse speed={4}>
                        <button onClick={e => focus(e)}>
                            <Image className='-translate-y-20' src={Img1} alt="Image 1" />
                        </button>
                    </Parallax>
                </div>
            </div>
        </section>
    )
}