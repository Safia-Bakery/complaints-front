import { useMutation } from '@tanstack/react-query';
import baseApi from '@/api/baseApi';

type Body = {
  name?: string;
  code?: string;
  status?: number;
  service_id?: string;
  quality_id?: string;
  callcenter_id?: string;

  id?: number;
};
const countriesMutation = () => {
  return useMutation({
    mutationKey: ['country_mutation'],
    mutationFn: async (body: Body) => {
      if (body.id) {
        const { data } = await baseApi.put('/country', body);
        return data;
      } else {
        const { data } = await baseApi.post('/country', body);
        return data;
      }
    },
  });
};
export default countriesMutation;
