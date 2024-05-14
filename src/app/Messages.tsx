import { type Group } from "@/lib/Models/Group";
import { type User } from "@/lib/Models/User";
import StyledInput from "./StyledInput";
import { useState } from "react";
import Button from "./Button";

export default function Messages({ item }: { item?: User | Group }) {

    const [name, setName] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    return (
        <section className="px-8">
            <div className="flex flex-col gap-12">
                <p className="text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%]">Mande uma mensagem...</p>
                {item ? <p>{item.name}</p> : <StyledInput onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Nome*" />}
                <StyledInput value={message} onChange={(e) => setMessage(e.target.value)} type="textarea" placeholder="Recado*" />
                <Button alterText="Enviando" text="Enviar" />
            </div>
        </section>
    )
}