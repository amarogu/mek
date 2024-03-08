import {type getDictionary} from "@/dictionaries";

interface ContextProps {
    dict: Awaited<ReturnType<typeof getDictionary>>["projects"];
    menu: Awaited<ReturnType<typeof getDictionary>>["nav"]["menu"];
    project: 'unistay';
}

export default function Context({dict, menu, project}: ContextProps) {

    const global = dict.global.context;
    const local = dict[project].context;

    return (
        <section className="px-8 container mx-auto">
            <div className="h-[500vh]">
                <h2 className="text-[12.5rem] leading-none uppercase">{global.title}</h2>
            </div>
        </section>
    )
}