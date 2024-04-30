import { useQuery } from "@tanstack/react-query";
import { tokenSelector } from "reducers/auth";
import { BaseItem, PermissionTypes } from "@/utils/types";
import baseApi from "@/api/baseApi";
import { useAppSelector } from "@/store/rootConfig";

type Body = {
  enabled?: boolean;
  page?: number;
  size?: number;
};

export const usePermissions = ({ enabled = true, ...params }: Body) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["permissions", params],
    queryFn: () =>
      baseApi
        .get("/permissions", { params })
        .then(({ data: response }) => response as BaseItem<PermissionTypes>),
    enabled: !!token && enabled,
  });
};

export default usePermissions;
