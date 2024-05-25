import { type Gift as GiftT } from "@/lib/Models/Gift";
import Gift from "./Gift";
import { User } from "@/lib/Models/User";
import { Group } from "@/lib/Models/Group";

export default function Gifts({gifts, item}: {gifts: GiftT[], item?: User | Group}) {
    return (
        <section className="p-8 pt-12 flex flex-col gap-8">
            <h2 className="uppercase text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%]">Presenteie</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gifts.map((gift, i) => <Gift item={item} key={i} gift={gift} />)}
            </div>
        </section>
    )
}