import React, { useState } from "react";
import FloatingWindow from "./FloatingWindow";
import { type getDictionary } from '@/dictionaries';

interface Project {
    title: string;
    type: string;
    image: React.ReactElement;
    link: string;
}

interface ProjectsProps {
    projects: Project[];
    dict: Awaited<ReturnType<typeof getDictionary>>["home"]["projects"];
    menu: Awaited<ReturnType<typeof getDictionary>>["nav"]["menu"];
}

export default function Projects({ projects, dict, menu }: ProjectsProps) {
    const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

    const handleMouseEnter = (projectIndex: number) => {
        setHoveredProjectId(`project-${projectIndex}`);
    };

    const handleMouseLeave = () => {
        setHoveredProjectId(null);
    };

    return (
        <section id={menu[2].toLowerCase().replace(/\s/g, "-")} className="px-8 pb-24 container mx-auto">
            <div className="flex px-6 text-base uppercase pb-6 sm:px-12 justify-between">
                <p>{dict.name}</p>
                <p>{dict.type}</p>
            </div>
            <FloatingWindow projects={projects} hoveredProjectId={hoveredProjectId}>
                <>
                    {projects.map((project, index) => {
                        return (
                            <a href={project.link} key={index}
                               onMouseEnter={() => handleMouseEnter(index)}
                               onMouseLeave={handleMouseLeave}>
                                <section id={`project-${index}`} className={`px-6 sm:p-12 py-12 border-text-200 ${index ===  0 ? "border-y-2" : "border-b-2"}`}>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-2xl md:text-6xl">{project.title}</h3>
                                        <p className="text-lg uppercase">{project.type}</p>
                                    </div>
                                </section>
                            </a>
                        )
                    })}
                </>
            </FloatingWindow>
        </section>
    )
}
