import { createContext } from "react";
import { LeanDocument, Populated } from "@/lib/helpers";
import { IUser, IGroup } from "@/lib/Models/Interfaces";

const Context = createContext<{isDarkMode: boolean, setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>, item?: LeanDocument<IUser> | Populated<IGroup, {users: IUser[]}>}>({isDarkMode: false, setIsDarkMode: () => {}, item: undefined});
export default Context;