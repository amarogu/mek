'use client';
import Image from 'next/image';
import GustavoAmaro from '../../public/gustavo_amaro_image.png';
import ArrowUpward from '../../public/arrow_upward.svg';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export default function About() {
    return (
        <section className='flex flex-col justify-center gap-8 pb-24 px-8'>
            <Image src={GustavoAmaro} alt="Gustavo Amaro" />
            <div className='flex flex-col gap-4'>
                <div className='flex text-2xl gap-3'>
                    <p>That's me</p>
                    <Image src={ArrowUpward} alt="Arrow Upward" />
                </div>
                <p className='text-3xl'>
                    I've been developing and designing since 2020, where I <span className='font-bold'>graduated</span>, three years later, as a systems developer. Let's jump right into the projects I have already worked on!
                </p>
            </div>
        </section>
    )
}