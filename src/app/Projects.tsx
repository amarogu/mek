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
    return (
        <section className="px-8 pb-24 container mx-auto">
            {
                projects.map((project, index) => {
                    return (
                        <a href={project.link}>
                            <section className={`px-6 sm:p-12 py-12 border-text-200 ${index === 0 ? "border-y-2" : "border-b-2"}`}>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl md:text-6xl">{project.title}</h3>
                                    <p className="text-lg uppercase">{project.type}</p>
                                </div>
                            </section>
                        </a>
                    )
                })
            }
        </section>
    )
}