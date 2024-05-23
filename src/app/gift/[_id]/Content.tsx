import { Gift } from "@/lib/Models/Gift";

export default function Content({gift}: {gift: Gift}) {
    return (
        <main>
            <h1>{gift.title}</h1>
            <p>{gift.value}</p>
        </main>
    )
}