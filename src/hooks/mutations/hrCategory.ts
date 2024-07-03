import { useMutation } from "@tanstack/react-query";
import baseApi from "@/api/baseApi";

type Body = {
  name?: string;
  status?: number;
  id?: number;
  hrsphere_id: number | string;
};
const hrCategoryMutation = () => {
  return useMutation({
    mutationKey: ["hr_category_mutation"],
    mutationFn: async (body: Body) => {
      if (body.id) {
        const { data } = await baseApi.put("/hr/category", body);
        return data;
      } else {
        const { data } = await baseApi.post("/hr/category", body);
        return data;
      }
    },
  });
};
export default hrCategoryMutation;
