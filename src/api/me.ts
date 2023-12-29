import {useContext} from "react";
import MeContext from "../context/me/MeContext.tsx";

const useMe = () => {
    const data = useContext(MeContext)

    return data || {
        name: "",
    };
}

export default useMe;