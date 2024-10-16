import { useMutation } from '@tanstack/react-query';
import baseApi from '@/api/baseApi';
import { ComplaintsBody } from '@/types/order-details';

const complaintsMutation = () => {
  return useMutation({
    mutationKey: ['complaints_mutation'],
    mutationFn: async (body: ComplaintsBody) => {
      if (body.id) {
        const { data } = await baseApi.put('/api/v2/complaints/', body);
        return data;
      } else {
        const { data } = await baseApi.post('/api/v2/complaints/', body);
        return data;
      }
    },
  });
};
export default complaintsMutation;
