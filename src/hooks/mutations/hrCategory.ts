import { useMutation } from '@tanstack/react-query';
import baseApi from '@/api/baseApi';

type Body = {
  name?: string;
  name_uz?: string;
  status?: number;
  id?: number;
  hrsphere_id: number | string;
};
const hrCategoryMutation = () => {
  return useMutation({
    mutationKey: ['hr_category_mutation'],
    mutationFn: async (body: Body) => {
      const { data } = await baseApi[body.id ? 'put' : 'post'](
        '/hr/category',
        body
      );
      return data;
    },
  });
};
export default hrCategoryMutation;
