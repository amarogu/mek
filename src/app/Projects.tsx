interface Project {
    title: string;
    type: string;
    image: React.ReactElement;
}

interface ProjectsProps {
    projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
    return (
        <section>
            {
                projects.map((project, index) => {
                    return (
                        <section className={`p-12 border-text-200 ${index === 0 ? "border-y-2" : "border-b-2"}`}>
                            <div className="flex justify-between">
                                <h3>{project.title}</h3>
                                <p>{project.type}</p>
                            </div>
                        </section>
                    )
                })
            }
        </section>
    )
}