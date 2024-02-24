interface ContactFieldProps {
    id: string;
    title: string;
    description: string;
}

export default function ContactField({id, title, description}: ContactFieldProps) {
    return (
        <div className="flex">
            <p className="text-7xl">{id}</p>
            <div className="flex flex-col gap-3">
                <h3>{title}</h3>
                <p className="text-xl">{description}</p>
            </div>
        </div>
    )
}