import { useMutation } from '@tanstack/react-query';
import baseApi from '@/api/baseApi';
import { imageContentType } from '@/utils/helper';
import { FileItem } from '@/utils/types';

export type ComplaintsBody = {
  id?: number;

  files?: FileItem[];
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
  deny_reason?: string;

  otk_status?: number;
  status?: number;
  corrections?: string;

  is_client?: boolean;
  producer_guilty?: boolean;
  is_returned?: boolean;
  expense?: number;
  match_standard?: number;
};

const complaintsMutation = () => {
  return useMutation({
    mutationKey: ['complaints_mutation'],
    mutationFn: async (body: ComplaintsBody) => {
      const formData = new FormData();
      body.files?.forEach((item: any) => {
        formData.append('files', item);
      });
      Object.keys(body).forEach((key: string) => {
        if (key !== 'files' && body[key as keyof ComplaintsBody] !== undefined)
          formData.append(key, body[key as keyof ComplaintsBody] as any);
      });
      if (body.id) {
        const { data } = await baseApi.put('/complaints', body);
        return data;
      } else {
        const { data } = await baseApi.post('/complaints', formData, {
          headers: { 'Content-Type': imageContentType },
        });
        return data;
      }
    },
  });
};
export default complaintsMutation;
