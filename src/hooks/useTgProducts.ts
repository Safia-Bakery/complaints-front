import { useQuery } from '@tanstack/react-query';
import { tokenSelector } from 'reducers/auth';
import baseApi from '@/api/baseApi';
import { useAppSelector } from '@/store/rootConfig';
import { EPresetTimes } from '@/utils/helper';

type Params = {
  name?: string;
  enabled?: boolean;
  parent_id?: string;
};

export const useTgProducts = ({ enabled = true, ...params }: Params) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ['tg_products', params],
    queryFn: () =>
      baseApi
        .get('/folders/search/', { params })
        .then(({ data: response }) => response as SearchProducts),
    enabled: !!token && enabled,
    staleTime: EPresetTimes.MINUTE * 10,
  });
};

export default useTgProducts;
