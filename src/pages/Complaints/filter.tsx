import { FC, useEffect } from "react";
import BaseInput from "@/components/BaseInputs";
import MainInput from "@/components/BaseInputs/MainInput";
import { useNavigateParams } from "custom/useCustomNavigate";
import { useForm } from "react-hook-form";
import useQueryString from "@/hooks/custom/useQueryString";
import MainSelect from "@/components/BaseInputs/MainSelect";
import { CountrySelect } from "@/utils/helper";
import BranchSelect from "@/components/BranchSelect";
import MainDatePicker from "@/components/BaseInputs/MainDatePicker";
import { StatusSelect } from "@/utils/types";

const ComplaintsFilter: FC = () => {
  const navigate = useNavigateParams();
  const name = useQueryString("name");
  const country = useQueryString("country");
  const status = useQueryString("status");

  const { register, reset, getValues } = useForm();
  const handleSubmit = () => navigate({ name: getValues("name") });

  useEffect(() => {
    if (!!name) reset({ name });
  }, []);

  return (
    <>
      <td></td>
      <td>
        <BaseInput className="!m-1">
          <MainInput
            register={register("id")}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </BaseInput>
      </td>
      <td>
        <BaseInput className="!m-1">
          <MainSelect
            values={CountrySelect}
            value={country?.toString()}
            onChange={(country) => navigate({ country })}
            // onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </BaseInput>
      </td>
      <td>
        <BaseInput className="!m-1">
          <MainSelect values={{}} />
        </BaseInput>
      </td>
      <td>
        <BaseInput className="!m-1">
          <MainSelect values={{}} />
        </BaseInput>
      </td>
      <td>
        <BaseInput className="!m-1">
          <BranchSelect />
        </BaseInput>
      </td>
      <td>
        <BaseInput className="!m-1">
          <MainInput
            register={register("name")}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </BaseInput>
      </td>
      <td>
        <BaseInput className="!m-1">
          <MainInput
            register={register("phone")}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </BaseInput>
      </td>
      <td>
        <BaseInput className="!m-1">
          <MainDatePicker />
        </BaseInput>
      </td>
      <td>
        <BaseInput className="!m-1">
          <MainInput
            register={register("price")}
            type="number"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </BaseInput>
      </td>
      <td>
        <BaseInput className="!m-1">
          <MainInput
            register={register("author")}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </BaseInput>
      </td>
      <td>
        <BaseInput className="!m-1">
          <MainSelect
            values={StatusSelect}
            value={status?.toString()}
            onChange={(status) => navigate({ status })}
          />
        </BaseInput>
      </td>
      <td></td>
    </>
  );
};

export default ComplaintsFilter;
