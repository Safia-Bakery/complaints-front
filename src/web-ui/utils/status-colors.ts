import { ComplaintsResponse } from '@/types/order-details';
import { OrderStatus } from '@/utils/types';

export const bgColor = (res: ComplaintsResponse) => {
  if (res.status === OrderStatus.denied) return '#FF0000'; // denied order - red
  if (res.status === OrderStatus.new) return '#FF0000'; // new order - white
  if (!!res.second_response) return '#31B602'; // second res - green
  if (!!res.first_response) return '#FFEE5B'; // first res - yellow
};
