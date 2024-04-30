import { useQuery } from "@tanstack/react-query";
import { tokenSelector } from "reducers/auth";
import { BaseItem, ClientType } from "@/utils/types";
import baseApi from "@/api/baseApi";
import { useAppSelector } from "@/store/rootConfig";

type Body = {
  enabled?: boolean;
  id?: number;
  page?: number;
  size?: number;
};

export const useHRClients = ({ enabled = true, ...params }: Body) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["clients", params],
    queryFn: () =>
      baseApi
        .get("/hr/clients", { params })
        .then(({ data: response }) => response as BaseItem<ClientType>),
    enabled: !!token && enabled,
  });
};

export default useHRClients;
