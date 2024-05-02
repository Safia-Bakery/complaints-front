import { useQuery } from "@tanstack/react-query";
import { tokenSelector } from "reducers/auth";
import { BaseItem, ComplaintType } from "@/utils/types";
import baseApi from "@/api/baseApi";
import { useAppSelector } from "@/store/rootConfig";

export type ComplaintsParams = {
  id?: number | string;
  subcategory_id?: string;
  branch_id?: string;
  status?: number;
  otk_status?: number;
  otk?: boolean;
  size?: number;
  page?: number;
  enabled?: boolean;
  is_client?: boolean;
  expense?: string;
  date_return?: string;
  phone_number?: string;
  client_name?: string;
  category_id?: string;
  country_id?: string;
  updated_by?: string;
};

export const useComplaints = ({
  enabled = true,
  ...params
}: ComplaintsParams) => {
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
