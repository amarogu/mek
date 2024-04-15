import Marquee from "react-fast-marquee"
import Context from "./Context";
import { useContext } from "react";

export default function SlidingText({text, darkImg, img}: {text: string, darkImg?: React.ReactNode, img?: React.ReactNode}) {

    const { isDarkMode } = useContext(Context);

    return (
        <Marquee className="flex gap-6 z-30 overflow-hidden pt-8">
            <div className="flex gap-6 items-center">
                <p className="text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%] uppercase">{text}</p>
                {isDarkMode ? darkImg : img}
            </div>
        </Marquee>
    )
}