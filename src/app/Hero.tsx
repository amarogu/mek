import ArrowForward from '../../public/arrow_forward.svg';
import GustavoAmaro from '../../public/gustavo_amaro.svg';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="flex snap-end flex-col gap-24 h-[calc(100vh-84px)] items-center min-h-[723px] justify-center px-8">
            <div className='flex flex-col gap-4'>
                <h1 className="text-5xl">
                    Hi everyone! I am a software engineer, designer, and... hmm, a cool-stuff maker
                </h1>
                <div className='flex gap-4'>
                    <Image src={ArrowForward} alt="Arrow Forward" />
                    <p className='underline text-2xl'>Check my projects</p>
                </div>
            </div>
            <Image src={GustavoAmaro} alt="Gustavo Amaro" />
        </section>
    )
}