import { useQuery } from "@tanstack/react-query";
import { tokenSelector } from "reducers/auth";
import { HRStatsTypes } from "@/utils/types";
import baseApi from "@/api/baseApi";
import { useAppSelector } from "@/store/rootConfig";
import { EPresetTimes } from "@/utils/helper";

type Params = {
  from_date?: string;
  to_date?: string;
  sphere_id?: number;
  enabled?: boolean;
};

export const useHrStats = ({ enabled = true, ...params }: Params) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["stats-hr", params],
    queryFn: () =>
      baseApi
        .get("/stats/hr", { params })
        .then(({ data: response }) => response as HRStatsTypes),
    enabled: !!token && enabled,
    staleTime: EPresetTimes.MINUTE * 10,
  });
};

export default useHrStats;
