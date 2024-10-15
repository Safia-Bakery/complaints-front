import { useMutation, useQuery } from "@tanstack/react-query";
import baseApi from "@/api/baseApi";
import { tokenSelector } from "@/store/reducers/auth";
import { useAppSelector } from "@/store/rootConfig";
import { EPresetTimes } from "@/utils/helper";
import { Stampers } from "@/types/order-details";

type Body = {
  complaint_id: number;
  user_id: number;
  is_delete?: boolean;
};
export const handleStampers = () => {
  return useMutation({
    mutationKey: ["handle_stampers"],
    mutationFn: async ({ is_delete, ...body }: Body) => {
      if (is_delete) {
        const { data } = await baseApi.delete("/api/v2/complaints/stampers/", {
          data: body,
        });
        return data;
      } else {
        const { data } = await baseApi.post(
          "/api/v2/complaints/stampers/",
          body
        );
        return data;
      }
    },
  });
};

export const getStamperRoles = ({ enabled = true }) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["stamper_roles"],
    queryFn: () =>
      baseApi
        .get("/api/v2/roles/has_stamp")
        .then(({ data: response }) => response as StampersRes[]),
    enabled: !!token && enabled,
    staleTime: EPresetTimes.MINUTE * 5,
  });
};

export const getStampers = ({
  enabled = true,
  id,
}: {
  id?: number;
  enabled?: boolean;
}) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["stampers", id],
    queryFn: () =>
      baseApi
        .get(`/api/v2/users/has_stamp/${id}`, { params: { role_id: id } })
        .then(({ data: response }) => response as Stampers[]),
    enabled: !!token && enabled,
    staleTime: EPresetTimes.MINUTE * 5,
  });
};
