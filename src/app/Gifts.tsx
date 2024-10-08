import Gift from "./Gift";
import { IGift } from "@/lib/Models/Interfaces";
import { LeanDocument } from "@/lib/helpers";

export default function Gifts({gifts, id}: {gifts?: LeanDocument<IGift>[], id: string}) {
    if (!gifts) return null;

    return (
        <section id={id} className="pt-12 p-8">
            <div className="container mx-auto flex flex-col gap-8">
                <h2 className="uppercase text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%]">Presenteie</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {gifts.map((gift, i) => <Gift key={i} gift={gift} />)}
                </div>
            </div>
        </section>
    )
}