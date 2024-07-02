import { IGift } from "@/lib/Models/Interfaces";
import { LeanDocument } from "@/lib/helpers";
import Image from "next/image";
import Link from "next/link";
import { useContext, useRef } from "react";
import Context from "./Context";

export default function Gift({gift}: {gift: LeanDocument<IGift>}) {

    const upperContainer = useRef<HTMLDivElement>(null);
    const lowerContainer = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);

    const {item} = useContext(Context);

    return (
        <Link aria-disabled={gift.soldOut} className={`${gift.soldOut ? 'pointer-events-none relative' : ''}`} href={item ? 'users' in item ? `/group/${item._id}/gift/${gift._id}` : `/guest/${item._id}/gift/${gift._id}` : `/gift/${gift._id}`}>
            <div className={`${gift.soldOut ? 'absolute z-20 flex items-center justify-center w-full h-full' : 'hidden'}`}>
                <p className="uppercase text-2xl font-bold p-4 bg-primary-200 dark:bg-dark-primary-100 border border-primary-300 dark:border-dark-primary-300">Esgotado</p>
            </div>
            <div ref={container} className={`w-full cursor-pointer relative overflow-y-hidden bg-bg-200 dark:bg-dark-bg-200 p-4 flex gap-12 flex-col ${gift.soldOut ? 'opacity-25' : ''}`}>
                <div ref={upperContainer} className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">{gift.title}</h3>
                    <h4 className="text-xl">{gift.description}</h4>
                </div>
                <div className="grow">
                    <Image className="object-contain object-center h-full w-full" loading="eager" alt={gift.title} width={500} height={500} src={gift.img} />
                </div>
                <div ref={lowerContainer}>
                    <h3 className="text-xl font-semibold">R${gift.value.toFixed(2)}</h3>
                </div>
            </div>
        </Link>
    )
}