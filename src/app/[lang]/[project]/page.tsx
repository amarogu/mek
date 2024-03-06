import { notFound } from "next/navigation";
import { ReactLenis } from '@studio-freight/react-lenis'

export async function generateStaticParams() {
    return ['unistay'];
}

const whitelist = ['unistay'];

export default function Project({ params } : { params: {project: string} }) {
    if (!whitelist.includes(params.project)) {
        return notFound();
    }
    return (
        <ReactLenis root>
            
        </ReactLenis>
    );
}