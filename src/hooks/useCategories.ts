import { useQuery } from "@tanstack/react-query";
import { tokenSelector } from "reducers/auth";
import { BaseItem, CategoriesType } from "@/utils/types";
import baseApi from "@/api/baseApi";
import { useAppSelector } from "@/store/rootConfig";
import { EPresetTimes } from "@/utils/helper";

type Params = {
  id?: number;
  status?: number;
  enabled?: boolean;
  staleTime?: EPresetTimes;
};

export const useCategories = ({
  enabled = true,
  staleTime,
  ...params
}: Params) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["category", params],
    queryFn: () =>
      baseApi
        .get("/category", { params })
        .then(({ data: response }) => response as CategoriesType[]),
    enabled: !!token && enabled,
    staleTime,
  });
};

export default useCategories;
