import { useQuery } from "@tanstack/react-query";
import { tokenSelector } from "reducers/auth";
import { BaseItem, UserType } from "@/utils/types";
import baseApi from "@/api/baseApi";
import { useAppSelector } from "@/store/rootConfig";

type Body = {
  enabled?: boolean;
  id?: number;
  name?: string;
  status?: number;
  phone_number?: number;
  page?: number;
  size?: number;
};

export const useRoles = ({ enabled = true, ...params }: Body) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["users", params],
    queryFn: () =>
      baseApi
        .get("/users", { params })
        .then(({ data: response }) => response as BaseItem<UserType>),
    enabled: !!token && enabled,
  });
};

export default useRoles;
