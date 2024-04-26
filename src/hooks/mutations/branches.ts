import { useMutation } from "@tanstack/react-query";
import baseApi from "@/api/baseApi";

type Body = {
  name?: string;
  status?: number;
  country_id?: string;

  password?: boolean;
  id?: number;
};
const branchMutation = () => {
  return useMutation({
    mutationKey: ["branch_mutation"],
    mutationFn: async (body: Body) => {
      if (body.id) {
        const { data } = await baseApi.put("/branches", body);
        return data;
      } else {
        const { data } = await baseApi.post("/branches", body);
        return data;
      }
    },
  });
};
export default branchMutation;
