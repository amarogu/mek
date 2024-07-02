import Image from "next/image";
import { useEffect, useRef } from "react";
import Img from '../../public/img4_confirmation.png';
import ConfirmationForm from "./ConfirmationForm";

export default function Confirmation({id}: {id?: string}) {
    const sectionRef = useRef(null);

    const titleRef = useRef<HTMLHeadingElement | null>(null);

    const formRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (titleRef.current && formRef.current) {
            const width = titleRef.current.clientWidth;
            formRef.current.setAttribute('style', `width: ${width}px`);
        }
    })

    return (
        <section id={id} ref={sectionRef} className="p-8 pt-20 pb-28">
            <div className="text-[12.5vw] flex flex-col gap-16 items-center md:text-[9vw] xl:text-[120px] container mx-auto font-extrabold leading-[85%]">
                <h2 ref={titleRef} className="flex flex-col">
                    <p className="ml-16">Confirmar</p>
                    <p className="flex gap-4 items-center">
                        <span>presença</span>
                        <Image className="md:w-[240px] md:h-[105px] w-[113px] h-[49px] sm:w-[185px] sm:h-[80.22px] object-cover object-[center_30%]" loading="eager" src={Img} alt="Imagem de Maria e Kalil" />
                    </p>
                    <p className="ml-6 md:text-right md:ml-0 md:mr-6">no evento</p>
                </h2>
                <div ref={formRef} className="text-3xl w-full">
                    <ConfirmationForm />
                </div>
            </div>
        </section>
    )
}