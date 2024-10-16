import useQueryString from '@/hooks/custom/useQueryString';
import { QueryClient } from '@tanstack/react-query';
import { OrderStatus } from './types';

export enum EPresetTimes {
  SECOND = 1000,
  MINUTE = SECOND * 60,
  HOUR = MINUTE * 60,
  DAY = HOUR * 24,
  WEEK = DAY * 7,
  TEN_DAYS = DAY * 10,
}
export const itemsPerPage = 50;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      gcTime: EPresetTimes.MINUTE * 5,
      staleTime: EPresetTimes.SECOND * 10,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
  },
});

export const CountrySelectValues = {
  1: 'UZB',
  2: 'KZ',
};

export const GenderTypeSelect = [
  { id: 1, name: 'man' },
  { id: 2, name: 'woman' },
];

export const numberWithCommas = (val: number) => {
  return val
    ?.toFixed(2)
    ?.toString()
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const handleIdx = (index: number) => {
  const currentPage = Number(useQueryString('page')) || 1;
  return currentPage === 1
    ? index + 1
    : index + 1 + itemsPerPage * (currentPage - 1);
};

export const dateTimeFormat = 'DD.MM.YYYY HH:mm';
export const dateMonthYear = 'DD.MM.YYYY';
export const yearMonthDate = 'YYYY-MM-DD';

export const HRStatusOBJ: { [key: number]: string } = {
  [OrderStatus.new]: 'new',
  [OrderStatus.done]: 'answered',
  [OrderStatus.denied]: 'denied',
};

export const imageContentType = 'multipart/form-data';

export const fixedString = (value: string) => {
  return value
    .split('')
    .filter((item) => {
      return [' ', '-', '(', ')', '_', '+'].indexOf(item) === -1;
    })
    .join('');
};

type CancelReasonType = {
  [key: number]: string;
};

export const CancelReason: CancelReasonType = {
  1: 'incorrect_request',
  2: 're_application',
  3: 'test_request',
  4: 'other',
};
