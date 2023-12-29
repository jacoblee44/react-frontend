import ThemeContext from "./ThemeContext.tsx";
import {useQuery} from "@tanstack/react-query";
import {PropsWithChildren} from "react";

type Response = {
    logo: string;
    color: string;
}

const ThemeProvider = ({children}: PropsWithChildren) => {
    const theme = useQuery<Response, Error>(
        ["theme"],
        async () => {

            const res = await fetch(`/api/v1/theme`);
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            const data = await res.json();
            return data.data;
        },
        {
            retry: false
        }
    );

    document.documentElement.style.setProperty(
        '--primary-color',
        theme.data?.color || '#000000'
    );


    if (!theme.isSuccess) {
        return <></>;
    }

    return (
        <ThemeContext.Provider value={theme.data}>
            {children}
        </ThemeContext.Provider>
    );

}

export default ThemeProvider;