import { useState } from "react";

interface Item {
    title: string;
    description: string;
    link: string;
}

interface ProjectProps {
    title: string;
    subtitle: string;
    subtitleImage: React.ReactElement;
    description: string;
    image: React.ReactElement;
    link: string;
    items: Item[];
}

export default function Project({title, subtitle, subtitleImage, description, image, link, items}: ProjectProps) {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    return (
        <section className="flex flex-col gap-8">
            <a href={link}>
                {image}
            </a>
            <div className="flex text-3xl gap-6 flex-col">
                <div className="flex flex-col gap-6">
                    <h3 className="text-5xl">{title}</h3>
                    <div className="flex gap-3">
                        <h4>{subtitle}</h4>
                        {subtitleImage}
                    </div>
                </div>
                <div>
                    <ul className="flex flex-col gap-10">
                        {items.map((i, index) => {
                            return (
                                <li key={index} className="flex items-center gap-4" onClick={(e) => {e.preventDefault(); setSelectedItem(index)}}>
                                    <span className={selectedItem === index ? "rounded-full bg-text-200 w-[30px] h-[30px]" : "bg-text-200 w-[30px] h-[30px]"}></span>
                                    <a href={i.link}>{i.title}</a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="pt-5 border-t-2 border-text-200">
                    <p>{description}</p>
                </div>
            </div>
        </section>
    )
}