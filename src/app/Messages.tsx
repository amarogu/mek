import { type Group } from "@/lib/Models/Group";
import { type User } from "@/lib/Models/User";
import StyledInput from "./StyledInput";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import MessagesMobile from '../../public/messages_mobile.png';
import MessagesMd from '../../public/messages_medium.png';
import { useRef } from "react";

export default function Messages({ item }: { item?: User | Group }) {

    const [name, setName] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const isMd = useMediaQuery({ query: '(min-width: 768px)' });

    const formRef = useRef<HTMLFormElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (isMd) {
            if (imgRef.current) imgRef.current.style.height = `${formRef.current?.clientHeight}px`;
        } 
    }, [])

    return (
        <section className="md:px-8">
            <div className="flex flex-col container mx-auto lg:justify-between md:flex-row gap-12">
            <form ref={formRef} className="flex px-8 md:px-0 lg:shrink lg:w-1/2 md:self-start flex-col gap-12">
                <p className="text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%]">Mande uma mensagem...</p>
                <div className="flex flex-col gap-12 lg:w-2/3">
                    {item ? <p>{item.name}</p> : <StyledInput onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Nome*" />}
                    <StyledInput desc="Sinta-se à vontade para enviar recadinhos! Iremos ficar muito felizes em lê-los. Responderemos assim que possível." value={message} onChange={(e) => setMessage(e.target.value)} type="textarea" placeholder="Recado*" />
                    <Button alterText="Enviando" text="Enviar" />
                </div>
            </form>
            <Image ref={imgRef} loading="eager" src={isMd ? MessagesMd : MessagesMobile} className="w-full lg:absolute right-0 md:self-start lg:w-auto" alt="Grid de imagens de Maria e Kalil" />
        </div>
        </section>
    )
}