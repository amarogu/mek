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
        <section className=""></section>
    )
}