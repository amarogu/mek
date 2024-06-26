import LogoDark from '../../public/logo_footer_dark.svg';
import Logo from '../../public/logo_footer.svg';
import ThemeImage from './ThemeImage';
import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import FooterAnimation from './FooterAnimation';

export default function Footer({id}: {id?: string}) {

    const isLg = useMediaQuery({query: '(min-width: 1024px)'});

    const allRightsReserved = useRef<HTMLParagraphElement>(null);
    const copyright = useRef<HTMLParagraphElement>(null);
    const info = useRef<HTMLDivElement>(null);

    useEffect(() => {
        /*const cEl = copyright.current;
        const aEl = allRightsReserved.current;
        const iEl = info.current;
        if (cEl && aEl && iEl) {
            if (isLg) {
                const aElWidth = aEl.clientWidth;
                cEl.style.width = `${aElWidth}px`;
                iEl.style.width = `${aElWidth}px`;
            }
        }*/
    })

    return (
        <footer id={id} className='relative text-[10px] font-bold z-20 dark:bg-bg-100 dark:text-text-100 px-8 pt-20 pb-12'>
            <div className='container md:items-end flex-col md:grid md:grid-cols mx-auto flex gap-8'>
                <FooterAnimation className='col-span-3' />
                <div className='flex justify-between md:justify-normal md:justify-self-end md:flex-col md:gap-[1px] md:order-3'>
                    <p ref={copyright}>&copy; 2024, Gustavo Amaro</p>
                    <p ref={allRightsReserved} className='uppercase'>Todos os direitos reservados</p>
                    <div ref={info} className='hidden md:flex flex-col gap-[1px] mt-5'>
                        <p>+5519996698631, BR</p>
                        <a href='https://gustavoamaro.com/'>gustavoamaro.com</a>
                        <a href='mailto:info@gustavoamaro.com'>info@gustavoamaro.com</a>
                    </div>
                </div>
                <div className='hidden uppercase order-1 md:flex gap-[calc(1.25rem+1px)] flex-col'>
                    <div className='hidden xl:flex flex-col gap-[1px]'>
                        <div className='flex gap-3'>
                            <a>Saint German Eventos, Campinas</a>
                            <p>16:30</p>
                        </div>
                        <p>09 de Novembro de 2024</p>
                    </div>
                    <div className='flex flex-col gap-[1px]'>
                        <a target='_blank' href='https://www.instagram.com/mariaisabel_amaro/'>@maria</a>
                        <a target='_blank' href='https://www.instagram.com/kalilalvess/'>@kalil</a>
                    </div>
                </div>
                <ThemeImage className='w-full' srcLight={LogoDark} srcDark={Logo} alt='Logo (Maria & Kalil)' />
            </div>
        </footer>
    )
}