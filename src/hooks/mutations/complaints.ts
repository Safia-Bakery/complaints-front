import { useMutation } from "@tanstack/react-query";
import baseApi from "@/api/baseApi";
import { imageContentType } from "@/utils/helper";

type Body = {
  id?: number;

  files?: any;
  product_name?: string;
  client_name?: string;
  client_number?: string; // phone number
  client_gender?: string;
  date_purchase?: string;
  date_return?: string;
  comment?: string;
  autonumber?: string;
  subcategory_id?: number;
  branch_id?: string;

  otk_status?: number;
  status?: number;
  corrections?: string;
};
const complaintsMutation = () => {
  return useMutation({
    mutationKey: ["faqs_mutation"],
    mutationFn: async (body: Body) => {
      if (body.id) {
        const { data } = await baseApi.put("/complaints", body);
        return data;
      } else {
        const { data } = await baseApi.post("/complaints", body, {
          headers: { "Content-Type": imageContentType },
        });
        return data;
      }
    },
  });
};
export default complaintsMutation;
