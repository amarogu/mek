import { type Group } from "@/lib/Models/Group";
import { type User } from "@/lib/Models/User";
import StyledInput from "./StyledInput";

export default function Messages({ item }: { item?: User | Group }) {
    return (
        <section className="px-8">
            <div className="flex flex-col gap-8">
                <p className="text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%]">Mande uma mensagem...</p>
                {item ? <p>{item.name}</p> : <StyledInput type="text" placeholder="Nome" />}
            </div>
        </section>
    )
}