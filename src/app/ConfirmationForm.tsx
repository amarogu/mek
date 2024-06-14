import { useContext } from "react"
import Context from "./Context"

export default function ConfirmationForm() {

    const { item } = useContext(Context);

    const renderConfirmationPanel = () => {
        if (item) {
            if ('users' in item) {
                return (
                    <>
                        {
                            item.users.map((u, i) => {
                                return (
                                    <h2 key={i}>{u.name}</h2>
                                )
                            })
                        }
                    </>
                )
            } else {
                return (
                    <h2><button>Clique aqui para confirmar</button></h2>
                )
            }
        } else {
            return (
                <p>Unavailable</p>
            )
        }
    }

    return (
        <form className="uppercase text-center text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%]">
            {
              renderConfirmationPanel()  
            }
        </form>
    )
}