import { useQuery } from "@tanstack/react-query";
import { tokenSelector } from "reducers/auth";
import { BaseItem, HRQaType } from "@/utils/types";
import baseApi from "@/api/baseApi";
import { useAppSelector } from "@/store/rootConfig";

type Body = {
  enabled?: boolean;
  id?: number;
  page?: number;
  sphere_id: string;
  size?: number;
};

export const useHRQa = ({ enabled = true, ...params }: Body) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["qa", params],
    queryFn: () =>
      baseApi
        .get("/hr/questions", { params })
        .then(({ data: response }) => response as BaseItem<HRQaType>),
    enabled: !!token && enabled,
  });
};

export default useHRQa;
