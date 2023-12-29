import MeContext from "./MeContext.tsx";
import {useQuery} from "@tanstack/react-query";
import {PropsWithChildren} from "react";
import api from "../../api/api.ts";

export type Response = {
    name: string;
}

const MeProvider = ({children}: PropsWithChildren) => {
    const me = useQuery<Response, Error>(
        ["me"],
        async () => {
            const res = await api.get(`/api/v1/auth/me`);
            return res.data.data;
        }
    );

    return (
        <MeContext.Provider value={me.data}>
            {children}
        </MeContext.Provider>
    );

}

export default MeProvider;