import {useQuery} from "@tanstack/react-query";
import api from "./api.ts";

const useDrivers = (sort: string) => {
    console.log("sort:", sort);
    return useQuery({
        queryKey: ["drivers", sort],
        queryFn: async () => {
            const res = await api.get("/api/v1/drivers/dashboard?s=" + sort);
            return res.data.data;
        }
    })
}

export default useDrivers;