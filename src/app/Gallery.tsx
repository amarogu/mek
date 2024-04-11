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

    const [isFocused, setIsFocused] = useState<[boolean, number]>([false, 0]);

    const focus = (i: number) => {
        setIsFocused([true, i]);
    }

    return (
        <section className="px-8 pb-24 container mx-auto">
            <div className='grid grid-cols-1'>
                <Parallax reverse speed={4}>
                    <div>
                        <button onClick={e => focus(1)}>
                            <Image className='' style={{filter: `${isFocused ? 'blur(0px)' : 'blur(10px)'}`}} src={Img1} alt="Image 1" />
                        </button>
                    </div>
                </Parallax>
                <div className='flex gap-x-4'>
                    <Parallax reverse speed={4}>
                        <div>
                            <button onClick={e => focus(2)}>
                                <Image className='' style={{filter: `${isFocused ? 'blur(0px)' : 'blur(10px)'}`}} src={Img2} alt="Image 2" />
                            </button>
                        </div>
                    </Parallax>
                    <Parallax reverse speed={4}>
                        <div className='pt-4'>
                            <button onClick={e => focus(3)}>
                                <Image className='' style={{filter: `${isFocused ? 'blur(0px)' : 'blur(10px)'}`}} src={Img3} alt="Image 3" />
                            </button>
                        </div>
                    </Parallax>
                </div>
            </div>
        </section>
    )
}