import { useQuery } from "@tanstack/react-query";
import { tokenSelector } from "reducers/auth";
import baseApi from "@/api/baseApi";
import { useAppSelector } from "@/store/rootConfig";
import { BaseItem, BranchType } from "@/utils/types";
import { EPresetTimes } from "@/utils/helper";

type Params = {
  id?: number;
  name?: string;
  status?: number;
  country_id?: number;
  enabled?: boolean;
  page?: number;
  size?: number;
};

export const useBranches = ({ enabled = true, ...params }: Params) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["branches", params],
    queryFn: () =>
      baseApi
        .get("/branches", { params })
        .then(({ data: response }) => response as BaseItem<BranchType>),
    enabled: !!token && enabled,
    staleTime: EPresetTimes.MINUTE * 5,
  });
};

export default useBranches;
