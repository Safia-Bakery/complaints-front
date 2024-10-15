import {useQuery} from "@tanstack/react-query";
import {tokenSelector} from "reducers/auth";
import baseApi from "@/api/baseApi";
import {useAppSelector} from "@/store/rootConfig";
import {EPresetTimes} from "@/utils/helper";

export const useTgUser = ({enabled = true, telegram_id}: { enabled?: boolean, telegram_id?: string }) => {
    const token = useAppSelector(tokenSelector);
    return useQuery({
        queryKey: ["tg_user", telegram_id],
        queryFn: () =>
            baseApi.get("/api/v2/clients/", {params: {telegram_id}}).then(({data: response}) => response as TgUser),
        enabled: !!token && enabled,
        staleTime: EPresetTimes.MINUTE * 5,
    });

};

export default useTgUser;
