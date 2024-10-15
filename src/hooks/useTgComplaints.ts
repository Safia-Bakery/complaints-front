import { useAppSelector } from "@/store/rootConfig.ts";
import { tokenSelector } from "reducers/auth.ts";
import { useQuery } from "@tanstack/react-query";
import baseApi from "@/api/baseApi.ts";
import { BaseItem } from "@/utils/types.ts";
import {
  ComplaintParams,
  ComplaintRes,
  ComplaintsParams,
  ComplaintsResponse,
} from "@/types/order-details.ts";

export const useTgComplaints = ({
  enabled = true,
  ...params
}: ComplaintsParams) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["my_complaints", params],
    queryFn: () =>
      baseApi
        .get("/api/v2/complaints/my/", { params })
        .then(({ data: response }) => response as BaseItem<ComplaintsResponse>),
    enabled: !!token && enabled,
  });
};

export const useTgComplaint = ({
  enabled = true,
  complaint_id,
}: ComplaintParams) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["my_complaint", complaint_id],
    queryFn: () =>
      baseApi
        .get(`/api/v2/complaints/${complaint_id}/`)
        .then(({ data: response }) => response as BaseItem<ComplaintRes>),
    enabled: !!token && enabled,
  });
};
