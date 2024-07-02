import { useQuery } from "@tanstack/react-query";
import { tokenSelector } from "reducers/auth";
import { BaseItem, CountryType } from "@/utils/types";
import baseApi from "@/api/baseApi";
import { useAppSelector } from "@/store/rootConfig";
import { EPresetTimes } from "@/utils/helper";

type Params = {
  id?: number;
  size?: number;
  status?: number;
  page?: number;
  enabled?: boolean;
  staleTime?: EPresetTimes;
};

export const useCountries = ({
  enabled = true,
  staleTime,
  ...params
}: Params) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["country", params],
    queryFn: () =>
      baseApi
        .get("/country", { params })
        .then(({ data: response }) => response as BaseItem<CountryType>),
    enabled: !!token && enabled,
    staleTime,
  });
};

export default useCountries;
