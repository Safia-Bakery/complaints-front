import { useQuery } from '@tanstack/react-query';
import { tokenSelector } from 'reducers/auth';
import baseApi from '@/api/baseApi';
import { useAppSelector } from '@/store/rootConfig';
import { ComplaintRes } from '@/types/order-details';
import { EPresetTimes } from '@/utils/helper';

export type ComplaintsParams = {
  enabled?: boolean;
  complaint_id: number;
};

export const useComplaintV2 = ({
  enabled = true,
  complaint_id,
}: ComplaintsParams) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ['complaint', complaint_id],
    queryFn: () =>
      baseApi
        .get(`/api/v2/complaints/${complaint_id}/`)
        .then(({ data: response }) => response as ComplaintRes),
    enabled: !!token && enabled,
    staleTime: EPresetTimes.MINUTE * 4,
  });
};
