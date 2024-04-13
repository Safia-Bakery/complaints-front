import { useMutation } from "@tanstack/react-query";

import { HRRequestTypes } from "@/utils/types";
import baseApi from "@/api/baseApi";

const faqsMutation = () => {
  return useMutation({
    mutationKey: ["faqs_mutation"],
    mutationFn: async (body: HRRequestTypes) => {
      if (body.id) {
        const { data } = await baseApi.put("/hr/question", body);
        return data;
      } else {
        const { data } = await baseApi.post("/hr/question", body);
        return data;
      }
    },
  });
};
export default faqsMutation;
