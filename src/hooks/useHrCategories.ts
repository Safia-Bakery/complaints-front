import { useQuery } from '@tanstack/react-query';
import { tokenSelector } from 'reducers/auth';
import { BaseItem, CategoriesType, HRSpheres } from '@/utils/types';
import baseApi from '@/api/baseApi';
import { useAppSelector } from '@/store/rootConfig';
import { EPresetTimes } from '@/utils/helper';

type Params = {
  id?: number;
  status?: number;
  enabled?: boolean;
  hrsphere_id?: number;
  staleTime?: number;
};

export const useHrCategories = ({
  enabled = true,
  staleTime = EPresetTimes.MINUTE * 5,
  ...params
}: Params) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ['hr-category', params],
    queryFn: () =>
      baseApi
        .get('/hr/category', { params })
        .then(({ data: response }) => response as BaseItem<CategoriesType>),
    enabled: !!token && enabled,
    staleTime,
  });
};

export default useHrCategories;
