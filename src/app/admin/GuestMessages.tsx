import { AdminData } from "@/lib/helpers";

export default function GuestMessages({data}: {data: AdminData}) {
    return (
        <>
        {
            data.map((e, i) => {
                if (e.msgs.length !== 0 && e.name !== 'admin') {
                    return (
                        <div key={i} className="bg-bg-300 flex flex-col rounded-md gap-4 dark:bg-dark-bg-300 p-4">
                            <h3 className="text-lg font-bold">{e.name}</h3>
                            {
                                e.msgs.map((m, j) => (
                                    <div key={j} className="bg-bg-200 p-4 rounded-md flex flex-col gap-2 dark:bg-dark-bg-200">
                                        <p>{m.content}</p>
                                        <p>{m.createdAt.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}</p>
                                    </div>
                                ))
                            }
                        </div>
                    )
                } else {
                    return null
                }
            })
        }
        </>
    )
}