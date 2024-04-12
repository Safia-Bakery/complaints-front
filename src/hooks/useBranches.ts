import { useQuery } from "@tanstack/react-query";
import { tokenSelector } from "reducers/auth";
import { UserType } from "@/utils/types";
import baseApi from "@/api/baseApi";
import { useAppSelector } from "@/store/rootConfig";

export const useBranches = ({ enabled = true }) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["branches"],
    queryFn: () =>
      baseApi.get("/me").then(({ data: response }) => response as any),
    enabled: !!token && enabled,
  });
};

export default useBranches;
