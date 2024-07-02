import { IGroup, IUser } from "@/lib/Models/Interfaces";
import StyledInput from "./StyledInput";
import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import MessagesMobile from '../../public/messages_mobile.png';
import MessagesMd from '../../public/messages_medium.png';
import { useRef } from "react";
import instance from "@/lib/axios";
import { ErrorResponse, LeanDocument, SuccessResponse, emptyMsg } from "@/lib/helpers";
import { HydratedDocument } from "mongoose";
import Context from "./Context";

export default function Messages({ id }: { id: string }) {

    const [name, setName] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [res, setRes] = useState<undefined | SuccessResponse | ErrorResponse>(undefined);
    const [clicked, setClicked] = useState<boolean>(false);

    const isMd = useMediaQuery({ query: '(min-width: 768px)' });

    const formRef = useRef<HTMLFormElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const {item} = useContext(Context);

    useEffect(() => {
        if (isMd) {
            if (imgRef.current) imgRef.current.style.height = `${formRef.current?.clientHeight}px`;
        } 
    }, [isMd]);

    const cleanup = () => {
        setRes(undefined);
        setClicked(false);
        setMessage('');
        setName('');
    }

    const handleClick = async (message: string) => {
        setClicked(true);
        if (!message) {
            return setRes(emptyMsg);
        };
        const res = await instance.post('/message', {owner: item?._id, content: message});
        if (res.status !== 200) {
            return setRes(undefined);
        };
        if (res.data.error) {
            return setRes(res.data as ErrorResponse);
        }
        return setRes(res.data as SuccessResponse);
    }

    return (
        <section id={id} className="sm:px-8 py-16">
            <div className="flex flex-col container mx-auto lg:justify-between md:flex-row gap-12">
                <form ref={formRef} className="flex px-8 sm:px-0 lg:shrink lg:w-1/2 md:self-start flex-col gap-12">
                    <p className="text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%]">Mande uma mensagem...</p>
                    <div className="flex flex-col gap-12 lg:w-2/3">
                        {item ? <div className="flex flex-col gap-4"><p className="uppercase text-2xl font-bold">Nome</p><p className={`uppercase origin-top-left text-2xl`}>{item.name}</p></div> : <StyledInput onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Nome*" />}
                        <StyledInput res={res} desc="Sinta-se à vontade para enviar recadinhos! Iremos ficar muito felizes em lê-los. Responderemos assim que possível." value={message} onChange={(e) => setMessage(e.target.value)} type="textarea" placeholder="Recado*" />
                        <Button cleanup={cleanup} clicked={clicked} onClick={() => handleClick(message)} res={res} text='Enviar' />
                    </div>
                </form>
                <Image ref={imgRef} loading="eager" src={isMd ? MessagesMd : MessagesMobile} className="w-full lg:absolute right-0 md:self-start -z-10 relative lg:w-auto" alt="Grid de imagens de Maria e Kalil" />
            </div>
        </section>
    )
}