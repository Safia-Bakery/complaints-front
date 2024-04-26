import { useQuery } from "@tanstack/react-query";
import { tokenSelector } from "reducers/auth";
import { BaseItem, HRDeps, HRRequest } from "@/utils/types";
import baseApi from "@/api/baseApi";
import { useAppSelector } from "@/store/rootConfig";

type Body = {
  enabled?: boolean;
  id?: number | string;
  hrtype?: string;
  sphere_id?: string;
  page?: number;
  size?: number;
};

export const useHRRequests = ({ enabled = true, ...params }: Body) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["questions", params],
    queryFn: () =>
      baseApi
        .get(
          `/hr/${
            Number(params.hrtype) === HRDeps.qa ? "questions" : "complaints"
          }`,
          { params }
        )
        .then(({ data: response }) => response as BaseItem<HRRequest>),
    enabled: !!token && enabled,
  });
};

export default useHRRequests;
