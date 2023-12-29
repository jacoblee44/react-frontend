import {useContext} from "react";
import ThemeContext from "../context/theme/ThemeContext.tsx";

const useTheme = () => {
    const data = useContext(ThemeContext)

    return data || {
        color: "#000",
        logo: "logo.png",
    };
}

export default useTheme;