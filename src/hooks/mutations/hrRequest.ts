import { useMutation } from "@tanstack/react-query";
import baseApi from "@/api/baseApi";

type Body = {
  status?: number;
  tel_id?: string;
  complaint?: string;
  deny_reason?: string;
  id?: number;
};
const hrRequestMutation = () => {
  return useMutation({
    mutationKey: ["hr_cmplaints_mutation"],
    mutationFn: async (body: Body) => {
      const { data } = await baseApi.put("/hr/complaints", body);
      return data;
    },
  });
};
export default hrRequestMutation;

// /hr/complaints
