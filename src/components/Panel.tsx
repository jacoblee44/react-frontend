import {PropsWithChildren} from "react";

const Panel = ({children}: PropsWithChildren) => <div
    className="col-span-2 space-y-2 bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-4 w-full">
    {children}
</div>

export default Panel;