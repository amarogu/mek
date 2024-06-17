import { useContext } from "react"
import Context from "./Context"
import Image from "next/image";
import Click from '../../public/left_click.svg';
import ClickDark from '../../public/left_click_dark.svg';
import ThemeImage from "./ThemeImage";

export default function ConfirmationForm() {

    const { item } = useContext(Context);

    const renderConfirmationPanel = () => {
        if (item) {
            if ('users' in item) {
                return (
                    <div className="flex flex-col gap-4">
                        {
                            item.users.map((u, i) => {
                                return (
                                    <h2 key={i}>{u.name}</h2>
                                )
                            })
                        }
                    </div>
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
            <div>
                <p>
                   <ThemeImage srcDark={ClickDark} srcLight={Click} alt="Duplo-clique para confirmar" />
                </p>
            </div>
        </form>
    )
}