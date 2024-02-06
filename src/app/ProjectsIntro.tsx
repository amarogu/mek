import Image from 'next/image';
import ArrowDownward from '../../public/arrow_downward.svg';
import { Cormorant_Garamond } from 'next/font/google';

const cormorantGaramond = Cormorant_Garamond({weight: '400', subsets: ['latin']});

export default function ProjectsIntro() {
    return (
        <section className="px-8 h-[calc(100vh-84px)] flex flex-col justify-center">
            <div className='border-t-2 border-text-200 pt-5 flex flex-col gap-6'>
                <h2 className={`text-6xl ${cormorantGaramond.className}`}>Projects</h2>
                <div className="flex gap-3">
                    <Image src={ArrowDownward} alt="Arrow Downward" />
                    <p className='text-2xl uppercase'>Scroll down</p>
                </div>
                <p className='text-3xl'>Below, you will see some projects of mine, that range from websites to iOS applications</p>
            </div>
        </section>
    )
}