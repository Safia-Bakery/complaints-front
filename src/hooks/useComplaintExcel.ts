import { useQuery } from '@tanstack/react-query';
import baseApi from '@/api/baseApi';

type Params = {
  otk_status: string | number;
  from_date: string;
  to_date: string;
  enabled?: boolean;
};

export const useComplaintExcel = ({ enabled = true, ...params }: Params) => {
  return useQuery({
    queryKey: ['complaints_excel', params],
    queryFn: () =>
      baseApi
        .get('/complaints/excell', { params })
        .then(({ data: response }) => response as { filename: string }),
    enabled,
  });
};

export default useComplaintExcel;
