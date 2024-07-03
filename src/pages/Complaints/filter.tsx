import { FC, useEffect, useState } from "react";
import BaseInput from "@/components/BaseInputs";
import MainInput from "@/components/BaseInputs/MainInput";
import { useNavigateParams, useRemoveParams } from "custom/useCustomNavigate";
import { useForm } from "react-hook-form";
import useQueryString from "@/hooks/custom/useQueryString";
import MainSelectKey from "@/components/BaseInputs/MainSelectKey";
import BranchSelect from "@/components/BranchSelect";
import MainDatePicker from "@/components/BaseInputs/MainDatePicker";
import { OrderStatus, StatusSelect } from "@/utils/types";
import useCategories from "@/hooks/useCategories";
import useCountries from "@/hooks/useCountries";
import useSubCategories from "@/hooks/useSubCategories";
import MainSelect from "@/components/BaseInputs/MainSelect";
import dayjs from "dayjs";
import { EPresetTimes } from "@/utils/helper";

const ComplaintsFilter: FC = () => {
  const navigate = useNavigateParams();
  const deleteParam = useRemoveParams();
  const country_id = useQueryString("country_id");
  const status = useQueryString("status");
  const created_at = useQueryString("created_at");
  const [enabled, $enabled] = useState(false);

  const subcategory_id = useQueryString("subcategory_id");
  const id = useQueryString("id");
  const client_name = useQueryString("client_name");
  const phone_number = useQueryString("phone_number");
  const expense = useQueryString("expense");
  const updated_by = useQueryString("updated_by");
  const category_id = useQueryString("category_id");

  const handleCreated = (start: Date | null) => {
    if (start === undefined) deleteParam(["created_at"]);
    if (!!start) navigate({ created_at: start.toISOString() });
  };

  const { data: categs, refetch: categoryRefech } = useCategories({
    status: 1,
    enabled: false,
    staleTime: EPresetTimes.MINUTE * 10,
  });

  const { data: countries, refetch: countryRefech } = useCountries({
    status: 1,
    enabled: false,
    staleTime: EPresetTimes.MINUTE * 10,
  });

  const { data: subCategs, refetch: subcategsRefech } = useSubCategories({
    status: 1,
    enabled: false,
    staleTime: EPresetTimes.MINUTE * 10,
  });

  const { register, reset, getValues } = useForm();
  const handleSubmit = () => navigate({ ...getValues() });

  useEffect(() => {
    reset({
      id,
      client_name,
      phone_number,
      expense,
      updated_by,
    });
  }, []);

  return (
    <>
      <td></td>
      <td>
        <BaseInput className="!m-1">
          <MainInput
            type="number"
            register={register("id")}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </BaseInput>
      </td>
      <td>
        <BaseInput className="!m-1">
          <MainSelect
            values={countries?.items}
            value={country_id}
            onFocus={() => countryRefech()}
            onChange={(e) => navigate({ country_id: e.target.value })}
          />
        </BaseInput>
      </td>
      <td>
        <BaseInput className="!m-1">
          <MainSelect
            values={categs}
            value={category_id}
            onChange={(e) => navigate({ category_id: e.target.value })}
            onFocus={() => categoryRefech()}
          />
        </BaseInput>
      </td>
      <td>
        <BaseInput className="!m-1">
          <MainSelect
            value={subcategory_id}
            onChange={(e) => navigate({ subcategory_id: e.target.value })}
            values={subCategs?.items}
            onFocus={() => subcategsRefech()}
          />
        </BaseInput>
      </td>
      <td onFocus={() => $enabled(true)}>
        <BaseInput className="!m-1">
          <BranchSelect enabled={enabled} />
        </BaseInput>
      </td>
      <td>
        <BaseInput className="!m-1">
          <MainInput
            register={register("client_name")}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </BaseInput>
      </td>
      <td>
        <BaseInput className="!m-1">
          <MainInput
            type="number"
            register={register("phone_number")}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </BaseInput>
      </td>
      <td>
        <BaseInput className="!m-1">
          <MainDatePicker
            selected={
              !!created_at && created_at !== "undefined"
                ? dayjs(created_at).toDate()
                : undefined
            }
            onChange={handleCreated}
            dateFormat="d.MM.yyyy"
          />
        </BaseInput>
      </td>
      <td>
        <BaseInput className="!m-1">
          <MainInput
            register={register("expense")}
            type="number"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </BaseInput>
      </td>
      <td>
        <BaseInput className="!m-1">
          <MainInput
            register={register("updated_by")}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </BaseInput>
      </td>
      <td>
        <BaseInput className="!m-1">
          <MainSelectKey
            values={StatusSelect}
            value={OrderStatus[status as any] ?? undefined}
            onChange={(status) =>
              navigate({
                status: OrderStatus[status as any],
              })
            }
          />
        </BaseInput>
      </td>
      {/* <td></td> */}
    </>
  );
};

export default ComplaintsFilter;
