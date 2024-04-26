import { useQuery } from "@tanstack/react-query";
import { tokenSelector } from "reducers/auth";
import { BaseItem, ComplaintType } from "@/utils/types";
import baseApi from "@/api/baseApi";
import { useAppSelector } from "@/store/rootConfig";

type Params = {
  id?: number;
  subcategory_id?: string;
  branch_id?: string;
  status?: number;
  otk_status?: number;
  size?: number;
  page?: number;
  enabled?: boolean;
};

export const useComplaints = ({ enabled = true, ...params }: Params) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["complaints", params],
    queryFn: () =>
      baseApi
        .get("/complaints", { params })
        .then(({ data: response }) => response as BaseItem<ComplaintType>),
    enabled: !!token && enabled,
  });
};

export default useComplaints;
