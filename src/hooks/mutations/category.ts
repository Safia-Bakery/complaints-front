import { useMutation } from '@tanstack/react-query';
import baseApi from '@/api/baseApi';

type Body = {
  name?: string;
  status?: number;
  description?: string;
  id?: number;
};
const categoryMutation = () => {
  return useMutation({
    mutationKey: ['category_mutation'],
    mutationFn: async (body: Body) => {
      if (body.id) {
        const { data } = await baseApi.put('/category', body);
        return data;
      } else {
        const { data } = await baseApi.post('/category', body);
        return data;
      }
    },
  });
};
export default categoryMutation;
