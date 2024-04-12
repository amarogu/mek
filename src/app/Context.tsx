import { createContext } from "react";

const Context = createContext<{isDarkMode: boolean, setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>}>({isDarkMode: false, setIsDarkMode: () => {}});
export default Context;