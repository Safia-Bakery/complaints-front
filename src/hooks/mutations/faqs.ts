import { useMutation } from '@tanstack/react-query';
import baseApi from '@/api/baseApi';

type Body = {
  question_uz?: string;
  question_ru?: string;
  answer_uz?: string;
  sphere_id?: string;
  answer_ru?: string;
  status?: number;

  id?: number;
};
const faqsMutation = () => {
  return useMutation({
    mutationKey: ['faqs_mutation'],
    mutationFn: async (body: Body) => {
      if (body.id) {
        const { data } = await baseApi.put('/hr/questions', body);
        return data;
      } else {
        const { data } = await baseApi.post('/hr/questions', body);
        return data;
      }
    },
  });
};
export default faqsMutation;
