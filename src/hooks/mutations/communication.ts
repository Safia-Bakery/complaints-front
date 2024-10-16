import { useMutation } from '@tanstack/react-query';
import baseApi from '@/api/baseApi';
import { imageContentType } from '@/utils/helper';

type Body = {
  hrcomplaint_id?: number;
  text: string;
  file: any;
};
const communicationMutation = () => {
  return useMutation({
    mutationKey: ['communication_mutation'],
    mutationFn: async (body: Body) => {
      const { data } = await baseApi.post('/hr/communictation', body, {
        headers: { 'Content-Type': imageContentType },
      });
      return data;
    },
  });
};
export default communicationMutation;
