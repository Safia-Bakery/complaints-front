import { useMutation } from "@tanstack/react-query";
import baseApi from "@/api/baseApi";

type Body = {
  name?: string;
  status?: number;
  category_id?: number;
  country_id?: number;

  id?: number;
};
const subCategoryMutation = () => {
  return useMutation({
    mutationKey: ["subCategory_mutation"],
    mutationFn: async (body: Body) => {
      if (body.id) {
        const { data } = await baseApi.put("/sub-category", body);
        return data;
      } else {
        const { data } = await baseApi.post("/sub-category", body);
        return data;
      }
    },
  });
};
export default subCategoryMutation;
