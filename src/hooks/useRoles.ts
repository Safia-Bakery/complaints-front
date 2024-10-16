import { useQuery } from '@tanstack/react-query';
import { tokenSelector } from 'reducers/auth';
import { BaseItem, RoleTypes } from '@/utils/types';
import baseApi from '@/api/baseApi';
import { useAppSelector } from '@/store/rootConfig';

type Body = {
  enabled?: boolean;
  id?: number;
  name?: string;
  status?: number;
  page?: number;
  size?: number;
};

export const useRoles = ({ enabled = true, ...params }: Body) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ['roles', params],
    queryFn: () =>
      baseApi
        .get('/roles', { params })
        .then(({ data: response }) => response as BaseItem<RoleTypes>),
    enabled: !!token && enabled,
  });
};

export default useRoles;
