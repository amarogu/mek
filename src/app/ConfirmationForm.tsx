import { useContext } from "react"
import Context from "./Context"
import Image from "next/image";
import Click from '../../public/left_click.svg';
import ClickDark from '../../public/left_click_dark.svg';
import ThemeImage from "./ThemeImage";

export default function ConfirmationForm() {

    const { item } = useContext(Context);

    const fadingFactor = (i: number, max = 0.5, decrement = 0.125) => {
        return Math.max(max, 1 - decrement * i);
    }

    const renderConfirmationPanel = () => {
        if (item) {
            if ('users' in item) {
                return (
                    <div className="flex relative flex-col gap-4">
                        {
                            item.users.map((u, i) => {
                                return (
                                    <h2 className={`${i === 0 ? '' : 'absolute left-1/2'}`} style={{transform: i !== 0 ? `translateX(-50%) scale(${fadingFactor(i)}) translateY(${-55 * i}%)` : '', opacity: i !== 0 ? `${fadingFactor(i, 0, 0.4)}` : '', filter: i !== 0 ? `blur(${1.5 * i}px)` : ''}} key={i}>{u.name}</h2>
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
        <form className="flex flex-col gap-4">
            <div className="uppercase text-center text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%]">
                {
                renderConfirmationPanel()  
                }
            </div>
            <div className="flex gap-4 font-semibold items-center">
                <ThemeImage loading="eager" srcDark={ClickDark} srcLight={Click} alt="Duplo-clique para confirmar" />
                <p>Duplo-clique para confirmar</p>
            </div>
        </form>
    )
}