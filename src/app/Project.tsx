interface Item {
    title: string;
    description: string;
    link: string;
}

interface ProjectProps {
    title: string;
    subtitle: string;
    description: string;
    image: React.ReactElement;
    link: string;
    items: Item[];
}

export default function Project({title, subtitle, description, image, link, items}: ProjectProps) {
    return (
        <section>
            <a href={link}>
                {image}
            </a>
            <div>
                <div>
                    <h3>{title}</h3>
                    <h4>{subtitle}</h4>
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
                <div>
                    <p>{description}</p>
                </div>
            </div>
        </section>
    )
}