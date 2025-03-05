import { useMutation, useQuery } from '@tanstack/react-query';
import baseApi from '@/api/baseApi';
import { useAppSelector } from '@/store/rootConfig';
import { tokenSelector } from '@/store/reducers/auth';
import { BaseItem } from '@/utils/types';
import { EPresetTimes } from '@/utils/helper';

export const notificationMutation = () => {
  return useMutation({
    mutationKey: ['send_notification_mutation'],
    mutationFn: async (body: NotificationsBody) => {
      const { data } = await baseApi[body.id ? 'put' : 'post'](
        '/notification',
        body
      );
      return data;
    },
  });
};

export const deleteNotification = () => {
  return useMutation({
    mutationKey: ['delete_notification_mutation'],
    mutationFn: async (id: number) => {
      const { data } = await baseApi.delete('/notification', {
        params: { id },
      });
      return data;
    },
  });
};

export const getNotifications = ({
  enabled = true,
  ...params
}: NotificationsParams) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ['get_notifications', params],
    queryFn: () =>
      baseApi
        .get('/notification', { params })
        .then(({ data: response }) => response as BaseItem<NotificationsRes>),
    enabled: !!token && enabled,
    staleTime: EPresetTimes.MINUTE * 4,
  });
};

export const getNotification = ({
  enabled = true,
  id,
}: {
  id: number;
  enabled?: boolean;
}) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ['get_notification', id],
    queryFn: () =>
      baseApi
        .get(`/notification/${id}`)
        .then(({ data: response }) => response as NotificationsRes),
    enabled: !!token && enabled,
    staleTime: EPresetTimes.MINUTE * 4,
  });
};
