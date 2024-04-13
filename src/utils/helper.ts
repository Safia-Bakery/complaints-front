import useQueryString from "@/hooks/custom/useQueryString";
import { QueryClient } from "@tanstack/react-query";

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
      gcTime: EPresetTimes.MINUTE * 10,
      staleTime: EPresetTimes.SECOND * 10,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
  },
});

export const CountrySelect = {
  1: "UZB",
  2: "KZ",
};

export const OrderTypeSelect = {
  1: "quality",
  2: "service",
};

export const GenderTypeSelect = {
  1: "man",
  2: "woman",
  3: "other",
};

export const numberWithCommas = (val: number) => {
  return val
    ?.toFixed(2)
    ?.toString()
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const handleIdx = (index: number) => {
  const currentPage = Number(useQueryString("page")) || 1;
  return currentPage === 1
    ? index + 1
    : index + 1 + itemsPerPage * (currentPage - 1);
};
