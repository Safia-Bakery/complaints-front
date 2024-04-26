import { useQuery } from "@tanstack/react-query";
import { tokenSelector } from "reducers/auth";
import { BaseItem, CountryType } from "@/utils/types";
import baseApi from "@/api/baseApi";
import { useAppSelector } from "@/store/rootConfig";

type Params = {
  id?: number;
  size?: number;
  status?: number;
  page?: number;
  enabled?: boolean;
};

export const useCountries = ({ enabled = true, ...params }: Params) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["country", params],
    queryFn: () =>
      baseApi
        .get("/country", { params })
        .then(({ data: response }) => response as BaseItem<CountryType>),
    enabled: !!token && enabled,
  });
};

export default useCountries;
