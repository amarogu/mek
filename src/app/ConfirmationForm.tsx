import { useContext } from "react"
import Context from "./Context"

export default function ConfirmationForm() {

    const { item } = useContext(Context);

    return (
        <form className="uppercase text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%]">
            <h2></h2>
        </form>
    )
}