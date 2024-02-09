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
    return (
        <section className="flex flex-col gap-8">
            <a href={link}>
                {image}
            </a>
            <div className="flex text-3xl flex-col">
                <div>
                    <h3 className="text-5xl">{title}</h3>
                    <div className="flex gap-3">
                        <h4>{subtitle}</h4>
                        {subtitleImage}
                    </div>
                </div>
                <div>
                    <ul>
                        {items.map((i, _) => {
                            return (
                                <li>
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