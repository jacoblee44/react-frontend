import {createContext} from "react";

const ThemeContext = createContext<{
    logo: string;
    color: string;
} | null>(null);

export default ThemeContext;