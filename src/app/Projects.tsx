import React, { useState } from "react";
import FloatingWindow from "./FloatingWindow";

interface Project {
    title: string;
    type: string;
    image: React.ReactElement;
    link: string;
}

interface ProjectsProps {
    projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
    const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

    const handleMouseEnter = (projectIndex: number) => {
        setHoveredProjectId(`project-${projectIndex}`);
    };

    const handleMouseLeave = () => {
        setHoveredProjectId(null);
    };

    return (
        <section className="px-8 pb-24 container mx-auto">
            <div className="flex px-6 uppercase pb-6 sm:px-12 justify-between">
                <p>name</p>
                <p>type</p>
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
