import { useQuery } from '@tanstack/react-query';
import { tokenSelector } from 'reducers/auth';
import { BaseItem, SubCategoryType } from '@/utils/types';
import baseApi from '@/api/baseApi';
import { useAppSelector } from '@/store/rootConfig';
import { EPresetTimes } from '@/utils/helper';

type Params = {
  id?: number;
  category_id?: string;
  country_id?: string;
  size?: number;
  page?: number;
  enabled?: boolean;
  status?: number;
  staleTime?: EPresetTimes;
};

export const useSubCategories = ({
  enabled = true,
  staleTime = EPresetTimes.MINUTE * 5,
  ...params
}: Params) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ['sub_category', params],
    queryFn: () =>
      baseApi
        .get('/sub-category', { params })
        .then(({ data: response }) => response as BaseItem<SubCategoryType>),
    enabled: !!token && enabled,
    staleTime,
  });
};

export default useSubCategories;
