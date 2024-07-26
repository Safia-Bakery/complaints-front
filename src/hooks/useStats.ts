import { useQuery } from "@tanstack/react-query";
import { tokenSelector } from "reducers/auth";
import { StatsTypes } from "@/utils/types";
import baseApi from "@/api/baseApi";
import { useAppSelector } from "@/store/rootConfig";
import { EPresetTimes } from "@/utils/helper";

type Params = {
  from_date?: string;
  to_date?: string;
  enabled?: boolean;
};

export const useStats = ({ enabled = true, ...params }: Params) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["stats", params],
    queryFn: () =>
      baseApi
        .get("/stats", { params })
        .then(({ data: response }) => response as StatsTypes),
    enabled: !!token && enabled,
    staleTime: EPresetTimes.MINUTE * 10,
  });
};

export default useStats;
