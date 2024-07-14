import StyledInput from "./StyledInput";
import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import MessagesMobileDark from '../../public/messages_mobile_dark.png';
import MessagesMdDark from '../../public/messages_medium_dark.png';
import MessagesMobile from '../../public/messages_mobile.png';
import MessagesMd from '../../public/messages_medium.png';
import { useRef } from "react";
import instance from "@/lib/axios";
import { ErrorResponse, SuccessResponse, emptyMsg } from "@/lib/helpers";
import Context from "./Context";
import ThemeImage from "./ThemeImage";

export default function Messages({ id }: { id: string }) {
    const {item} = useContext(Context);

    const [name, setName] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [res, setRes] = useState<undefined | SuccessResponse | ErrorResponse>(undefined);
    const [clicked, setClicked] = useState<boolean>(false);

    const isLg = useMediaQuery({ query: '(min-width: 1024px)' });

    const formRef = useRef<HTMLFormElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (isLg) {
            if (imgRef.current) {
                const children = imgRef.current.children;
                imgRef.current.style.height = `${formRef.current?.clientHeight}px`;
                Array.from(children).forEach(c => {
                    c.setAttribute('style', `height: ${formRef.current?.clientHeight}px`);
                })
            }
            
        } 
    }, [isLg]);

    if (!item) return null;

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
        <section id={id} className="sm:px-8 py-16 pt-36">
            <div className="flex flex-col container mx-auto lg:justify-between lg:flex-row gap-12">
                <form ref={formRef} className="flex px-8 sm:px-0 lg:shrink lg:w-1/2 md:self-start flex-col gap-12">
                    <p className="text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%]">Mande uma mensagem...</p>
                    <div className="flex flex-col gap-12 lg:w-2/3">
                        {item ? <div className="flex flex-col gap-4"><p className="uppercase text-2xl font-bold">Nome</p><p className={`uppercase origin-top-left text-2xl`}>{item.name}</p></div> : <StyledInput onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Nome*" />}
                        <StyledInput id="messageTextArea" res={res} desc="Sinta-se à vontade para nos enviar uma mensagem de amor e carinho. Ficaremos muito felizes em respondê-los!" value={message} onChange={(e) => setMessage(e.target.value)} type="textarea" placeholder="Recado*" />
                        <Button cleanup={cleanup} clicked={clicked} onClick={() => handleClick(message)} res={res} text='Enviar' />
                    </div>
                </form>
                <ThemeImage ref={imgRef} loading="eager" srcDark={isLg ? MessagesMdDark : MessagesMobileDark} srcLight={isLg ? MessagesMd : MessagesMobile} className="lg:w-[auto]" containerClassName="w-full lg:absolute lg:right-0 md:self-start -z-10 relative lg:w-[auto]" alt="Grid de imagens de Maria e Kalil" />
            </div>
        </section>
    )
}