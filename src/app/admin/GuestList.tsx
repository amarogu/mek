import { AdminData } from "@/lib/helpers";
import CopyToClipboard from "./CopyToClipboard";
import { Populated } from "@/lib/helpers";
import { IUser, IMsg, IGift, IPurchase } from "@/lib/Models/Interfaces";

export default function GuestList({data}: {data: AdminData}) {
    return (
        <>
            {
                data.map((e, i) => {
                    if ('users' in e) {
                        return (
                            <div key={i} className="bg-bg-300 rounded-md flex flex-col gap-4 dark:bg-dark-bg-300 p-4">
                                <h3 className="text-lg flex gap-2 items-center font-bold">
                                    <span>{e.name}</span> 
                                    <span className="opacity-75 text-base font-normal">{e.link}</span>
                                    <CopyToClipboard contentToWrite={e.link} />
                                </h3>
                                <div className="flex flex-col gap-4">
                                    {
                                        e.users.map((u, j) => {
                                            return (
                                                <div className="bg-bg-200 rounded-md p-4 flex flex-col gap-2 dark:bg-dark-bg-200" key={j}>
                                                    <div className="flex justify-between">
                                                        <p className="flex gap-2 items-center">
                                                            <span>{u.name}</span> 
                                                            <span className="opacity-75 text-base font-normal">{u.link}</span>
                                                            <CopyToClipboard contentToWrite={u.link} />
                                                        </p>
                                                        <p>{u.confirmed ? 'Sim' : 'Não'}</p>
                                                    </div>
                                                    {u.confirmed ? (u.lastConfirmed ? <p><span className="opacity-75">Confirmado pela última vez em:</span> {u.lastConfirmed.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}</p> : null) : u.lastRevokedConfirmation ? <p><span className="opacity-75">Confirmação revogada pela última vez em:</span> {u.lastRevokedConfirmation.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}</p> : null}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    } else {
                        const u = e as Populated<IUser, { msgs: IMsg[], purchases: Populated<IPurchase, {msg: IMsg, giftGiven: IGift}>[] }>;
                        return (
                            <div key={i} className="bg-bg-300 rounded-md flex p-4 flex-col gap-2 dark:bg-dark-bg-300">
                                <div className="flex justify-between">
                                    <h3 className="text-lg flex gap-2 items-center font-bold">
                                        <span>{u.name}</span> 
                                        <span className="opacity-75 text-base font-normal">{u.link}</span>
                                        <CopyToClipboard contentToWrite={u.link} />
                                    </h3>
                                    <p>{u.confirmed ? 'Sim' : 'Não'}</p>
                                </div>
                                {u.confirmed ? (u.lastConfirmed ? <p><span className="opacity-75">Confirmado pela última vez em:</span> {u.lastConfirmed.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}</p> : null) : u.lastRevokedConfirmation ? <p><span className="opacity-75">Confirmação revogada pela última vez em:</span> {u.lastRevokedConfirmation.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}</p> : null}
                            </div>
                        )
                    }
                })
            }
        </>
    )
}