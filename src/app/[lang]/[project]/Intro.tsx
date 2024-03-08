import {type getDictionary} from "@/dictionaries";

interface IntroProps {
    dict: Awaited<ReturnType<typeof getDictionary>>["projects"];
    menu: Awaited<ReturnType<typeof getDictionary>>["nav"]["menu"];
    project: 'unistay';
}

export default function Intro({dict, menu, project}: IntroProps) {

    const global = dict.global.intro;
    const local = dict[project].intro;

    return (
        <section className="container px-16 pt-14">
            <div className="flex">
                <h2 className="text-[12.5rem] text-nowrap shrink-0 leading-none font-semibold uppercase">{global.title}</h2>
                <h2 className="text-[12.5rem] text-nowrap shrink-0 leading-none font-semibold uppercase"> - {global.title}</h2>
            </div>
        </section>
    )
}