import { useMutation } from "@tanstack/react-query";
import baseApi from "@/api/baseApi";

type Body = {
  hrcomplaint_id?: number;
  text: string;
  file: any;
};
const contentType = "multipart/form-data";
const communicationMutation = () => {
  return useMutation({
    mutationKey: ["communication_mutation"],
    mutationFn: async (body: Body) => {
      const { data } = await baseApi.post("/hr/communictation", body, {
        headers: { "Content-Type": contentType },
      });
      return data;
    },
  });
};
export default communicationMutation;
