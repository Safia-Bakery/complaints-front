import { useQuery } from "@tanstack/react-query";
import { tokenSelector } from "reducers/auth";
import { BaseItem, CategoriesType } from "@/utils/types";
import baseApi from "@/api/baseApi";
import { useAppSelector } from "@/store/rootConfig";

type Params = {
  id?: number;
  status?: number;
  enabled?: boolean;
};

export const useHrCategories = ({ enabled = true, ...params }: Params) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["hr-category", params],
    queryFn: () =>
      baseApi
        .get("/hr/category", { params })
        .then(({ data: response }) => response as BaseItem<CategoriesType>),
    enabled: !!token && enabled,
  });
};

export default useHrCategories;
