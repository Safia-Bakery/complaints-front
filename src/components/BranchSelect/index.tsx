import { FC, FocusEventHandler, useEffect } from "react";
import Select, { SingleValue } from "react-select";
import { useState } from "react";
import useDebounce from "custom/useDebounce";
import { useNavigateParams } from "custom/useCustomNavigate";
import useBranches from "@/hooks/useBranches";
import { BranchJsonVal, SelectValue } from "@/utils/types";
import useQueryString from "@/hooks/custom/useQueryString";

interface Props {
  enabled?: boolean;
  placeholdeer?: string;
  autoFocus?: boolean;
  onFocus?: FocusEventHandler<HTMLInputElement>;
}

const BranchSelect: FC<Props> = ({
  enabled = false,
  placeholdeer = "",
  autoFocus = false,
  onFocus,
}) => {
  const navigate = useNavigateParams();
  const [query, $query] = useDebounce("");
  const branchJson = useQueryString("branch");
  const branch: BranchJsonVal = branchJson && JSON.parse(branchJson);

  const initialVal: SelectValue | undefined = branch?.id
    ? { value: branch.id, label: branch.name, country_id: +branch.country_id }
    : undefined;

  const { data, isFetching, isLoading } = useBranches({
    enabled,
    status: 1,
  });
  const [items, $items] = useState<SelectValue[]>([]);

  const handleChange = (e: SingleValue<SelectValue>) => {
    navigate({
      branch: JSON.stringify({
        id: e?.value,
        name: e?.label,
        country_id: e?.country_id,
      }),
    });
  };

  useEffect(() => {
    if (data?.items?.length)
      $items((prev) => [
        ...prev,
        ...data.items.map((item: any) => {
          return {
            value: item.id,
            label: item.name,
            country_id: item.country_id,
          };
        }),
      ]);
    if (!!query && data?.items)
      $items(
        data.items.map((item: any) => {
          return {
            value: item.id,
            label: item.name,
            country_id: item.country_id,
          };
        })
      );
  }, [data?.items, query]);

  return (
    <Select
      options={items}
      isLoading={isFetching || isLoading}
      onChange={handleChange}
      className="z-50 branch-select"
      onInputChange={(e) => $query(e)}
      isClearable
      value={initialVal}
      autoFocus={autoFocus}
      onFocus={onFocus}
      placeholder={placeholdeer}
    />
  );
};

export default BranchSelect;
