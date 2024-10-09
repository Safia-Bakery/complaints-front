import {useQuery} from "@tanstack/react-query";
import {tokenSelector} from "reducers/auth";
import {CategoriesType} from "@/utils/types";
import baseApi from "@/api/baseApi";
import {useAppSelector} from "@/store/rootConfig";
import {EPresetTimes} from "@/utils/helper";

type Params = {
    name?: string
    enabled?: boolean;
};

export const useTgProducts = ({enabled = true, ...params}: Params) => {
    const token = useAppSelector(tokenSelector);
    return useQuery({
        queryKey: ["tg_products", params],
        queryFn: () =>
            baseApi
                .get("/category", {params})
                .then(({data: response}) => response as CategoriesType[]),
        enabled: !!token && enabled,
        staleTime: EPresetTimes.MINUTE * 10,
    });
};

export default useTgProducts;
