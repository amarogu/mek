import { createContext } from "react";
import { LeanDocument } from "@/lib/helpers";
import { IUser, IGroup } from "@/lib/Models/Interfaces";

const Context = createContext<{isDarkMode: boolean, setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>, item?: LeanDocument<IUser> | LeanDocument<IGroup>}>({isDarkMode: false, setIsDarkMode: () => {}, item: undefined});
export default Context;