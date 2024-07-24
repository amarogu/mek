import { Fragment, useContext } from "react"
import Context from "./Context"
import Dropdown from "./Dropdown";

export default function ConfirmationForm({handleConfirmation}: {handleConfirmation: (option: boolean, _id: string) => Promise<any>}) {

    const { item } = useContext(Context);

    if (!item || !('users' in item)) {
        return null;
    }

    const sortedItems = item.users.toSorted((a, b) => b.name.length - a.name.length);

    return (
        <div className="flex uppercase flex-col gap-7">
            <div className="flex text-xs font-normal gap-4 justify-between">
                <p>Convidado</p>
                <p>Confirmado</p>
            </div>
            <div className="grid relative gap-y-3 grid-cols-[minmax(0,_1fr)_auto]">
                {
                    sortedItems.map((u, i) => {
                        return (
                            <Fragment key={i}>
                                <p className="">{u.name}</p>
                                <Dropdown _id={u._id} action={handleConfirmation} style={{zIndex: sortedItems.length - i}} text={u.confirmed ? 'Sim' : 'Não'} options={['Sim', 'Não']} />
                            </Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}