import { Fragment, useContext, useState } from "react"
import Context from "./Context"
import ArrowDark from '../../public/keyboard_arrow_down_dark.svg';
import Arrow from '../../public/keyboard_arrow_down.svg';
import ThemeImage from "./ThemeImage";
import Image from "next/image";

export default function ConfirmationForm() {

    const { item, isDarkMode } = useContext(Context);

    if (!item || !('users' in item)) {
        return null;
    }

    const sortedItems = item.users.toSorted((a, b) => b.name.length - a.name.length);

    const initialConfirmedUsers = sortedItems.map(u => u.confirmed);

    const [users, setUsers] = useState(sortedItems);

    return (
        <div className="flex uppercase flex-col gap-7">
            <div className="flex text-xs font-normal gap-4 justify-between">
                <p>Convidado</p>
                <p>Confirmado</p>
            </div>
            <div className="grid relative gap-y-3 grid-cols-[minmax(0,_1fr)_auto]">
                {
                    users.map((u, i) => {
                        return (
                            <Fragment key={i}>
                                <p className="">{u.name}</p>
                                <button className="flex gap-4 justify-between text-xl opacity-75 items-center uppercase">
                                    <span>{u.confirmed ? 'Sim' : 'Não'}</span>
                                    <ThemeImage srcDark={ArrowDark} srcLight={Arrow} alt={`Lista de opções de confirmação ${u.gender === 'female' ? 'da convidada' : 'do convidado'}`} />
                                </button>
                            </Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}