import Image from "next/image";
import Img2 from "../../public/img2.png";
import { useMediaQuery } from "react-responsive";

export default function Hero() {

    const isMd = useMediaQuery({query: '(min-width: 768px)'});

    const content = ['Vamos nos', 'casar!', 'Sejam bem', 'vindos ao', 'nosso web', 'site.'];
    const mdContent = ['Vamos nos', 'casar!', 'Sejam', 'bem vindos ao', 'nosso web site.'];

    const img = <div className={`overflow-hidden ${isMd ? 'h-[105px] w-[240px]' : 'h-[55px] w-[25vw]'}`}><Image src={Img2} className="w-full -translate-y-[6.75vw]" alt="Imagens de Maria e kalil" /></div>

    const renderContent = (isMd: boolean) => {
        if (isMd) {
            return (
                <div>
                    <h1 className="flex flex-col">
                        <p className="ml-16">{mdContent[0]}</p>
                        <p className="flex gap-4 items-center">
                            <span>{mdContent[1]}</span>
                            {img}
                            <span>{mdContent[2]}</span>
                        </p>
                        <p className="ml-16">{mdContent[3]}</p>
                        <p className="ml-16">{mdContent[4]}</p>
                    </h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h1 className="flex gap-1 flex-col">
                        <p className="ml-8">{content[0]}</p>
                        <p className="flex gap-4 items-center">
                            <span>{content[1]}</span>
                            {img}
                        </p>
                        <p className="ml-8">{content[2]}</p>
                        <p>{content[3]}</p>
                        <p>{content[4]}</p>
                        <p>{content[5]}</p>
                    </h1>
                </div>
            )
        }
    }

    return (
        <section className="flex flex-col justify-between items-center">
            <div className="text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%]">
                {renderContent(isMd)}
            </div>
        </section>
    )
}