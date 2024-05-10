import Input from "../Input";
import { useState } from "react";

export default function GroupForm() {

    const [groupName, setGroupName] = useState<string>('');

    return (
        <>
            <Input onChange={(e) => setGroupName(e.target.value)} value={groupName} type="text" id="name" placeholder="Nome do Grupo" />
        </>
    )
}