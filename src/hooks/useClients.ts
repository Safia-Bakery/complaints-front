import { useQuery } from "@tanstack/react-query";
import { tokenSelector } from "reducers/auth";
import { ClientsType } from "@/utils/types";
import baseApi from "@/api/baseApi";
import { useAppSelector } from "@/store/rootConfig";

type Body = {
  enabled?: boolean;
  id?: number;
  page?: number;
  size?: number;
};

export const useClients = ({ enabled = true, ...params }: Body) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["clients", params],
    queryFn: () =>
      baseApi
        .get("/hr/clients", { params })
        .then(({ data: response }) => response as ClientsType),
    enabled: !!token && enabled,
  });
};

export default useClients;

// /hr/clients
