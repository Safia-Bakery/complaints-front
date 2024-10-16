import { useMutation } from '@tanstack/react-query';
import baseApi from '@/api/baseApi';

type Body = {
  name?: string;
  status?: number;
  permissions?: number[];
  id?: number;
};
const roleMutation = () => {
  return useMutation({
    mutationKey: ['roles_mutation'],
    mutationFn: async (body: Body) => {
      if (body.id) {
        const { data } = await baseApi.put('/roles', body);
        return data;
      } else {
        const { data } = await baseApi.post('/roles', body);
        return data;
      }
    },
  });
};
export default roleMutation;
