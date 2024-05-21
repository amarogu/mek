import { type Gift as GiftT } from "@/lib/Models/Gift";
import Gift from "./Gift";

export default function Gifts({gifts}: {gifts: GiftT[]}) {
    return (
        <section className="p-8 flex flex-col gap-8">
            <h2 className="uppercase text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%]">Presenteie</h2>
            <div className="grid grid-cols-1 gap-4">
                {gifts.map((gift, i) => <Gift key={i} gift={gift} />)}
            </div>
        </section>
    )
}