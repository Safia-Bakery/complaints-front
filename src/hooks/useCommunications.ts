import { useQuery } from "@tanstack/react-query";
import { tokenSelector } from "reducers/auth";
import { BaseItem, CommunicationType } from "@/utils/types";
import baseApi from "@/api/baseApi";
import { useAppSelector } from "@/store/rootConfig";

type Body = {
  enabled?: boolean;
  hrcomplaint_id?: number;
  hrclient_id?: number;
  status?: number;
  page?: number;
  size?: number;
};

export const useCommunications = ({ enabled = true, ...params }: Body) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["communication", params],
    queryFn: () =>
      baseApi
        .get("/hr/communictation", { params })
        .then(({ data: response }) => response as BaseItem<CommunicationType>),
    enabled: !!token && enabled,
    refetchInterval: 10000,
  });
};

export default useCommunications;
