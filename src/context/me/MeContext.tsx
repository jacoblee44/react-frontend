import {createContext} from "react";
import {Response} from "./MeProvider.tsx";

const MeContext = createContext<Response | undefined>(undefined);

export default MeContext;