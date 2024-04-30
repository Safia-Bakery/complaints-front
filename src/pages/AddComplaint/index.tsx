import BaseInput from "@/components/BaseInputs";
import MainDatePicker from "@/components/BaseInputs/MainDatePicker";
import MainInput from "@/components/BaseInputs/MainInput";
import MainRadioBtns from "@/components/BaseInputs/MainRadioBtns";
import MainTextArea from "@/components/BaseInputs/MainTextArea";
import BranchSelect from "@/components/BranchSelect";
import Button from "@/components/Button";
import Container from "@/components/Container";
import MaskedInput from "@/components/MaskedInput";
import MainDropZone from "@/components/MainDropZone";
import { GenderTypeSelect, fixedString } from "@/utils/helper";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useCategories from "@/hooks/useCategories";
import useSubCategories from "@/hooks/useSubCategories";
import MainSelect from "@/components/BaseInputs/MainSelect";
import useCountries from "@/hooks/useCountries";
import useQueryString from "@/hooks/custom/useQueryString";
import complaintsMutation from "@/hooks/mutations/complaints";
import { BranchJsonVal } from "@/utils/types";
import { errorToast, successToast } from "@/utils/toast";
import Loading from "@/components/Loader";
import { useNavigate } from "react-router-dom";

const AddComplaint = () => {
  const inputFileRef = useRef<any>();
  const navigate = useNavigate();
  const [date_purchase, $date_purchase] = useState<Date>();
  const [date_return, $date_return] = useState<Date>();

  const { t } = useTranslation();
  const { register, getValues, handleSubmit, watch } = useForm();

  const branchJson = useQueryString("branch");
  const branch: BranchJsonVal = branchJson && JSON.parse(branchJson);

  const { mutate, isPending } = complaintsMutation();

  const { data: categs, isLoading: categsLoading } = useCategories({});
  const { data: country, isLoading: countryLoading } = useCountries({
    status: 1,
  });
  const { data: subCategs, isFetching: subCategFetching } = useSubCategories({
    status: 1,
    enabled: !!watch("categ"),
    category_id: watch("categ"),
  });

  const handleDatePurchase = (event: Date) => $date_purchase(event);
  const handleDateReturn = (event: Date) => $date_return(event);

  const onSubmit = () => {
    const {
      subcategory_id,
      product_name,
      client_name,
      client_number,
      client_gender,
      comment,
    } = getValues();

    mutate(
      {
        branch_id: branch?.id,
        subcategory_id,
        product_name,
        client_name,
        client_number: fixedString(client_number),
        client_gender,
        date_purchase: date_purchase?.toISOString(),
        date_return: date_return?.toISOString(),
        comment,
        files: inputFileRef?.current,
      },
      {
        onSuccess: () => {
          navigate("/complaints");
          successToast("created");
        },
        onError: (e) => errorToast(e.message),
      }
    );
  };

  if (isPending || categsLoading || countryLoading || subCategFetching)
    return <Loading />;

  return (
    <Container className="!pb-14 rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput label="type">
          <MainRadioBtns values={categs} register={register("categ")} />
        </BaseInput>

        <BaseInput label="subcateg">
          <MainRadioBtns
            values={subCategs?.items}
            register={register("subcategory_id")}
          />
        </BaseInput>

        <div className="flex gap-4">
          <BaseInput label="branch" className="flex-1">
            <BranchSelect />
          </BaseInput>

          <BaseInput label="country" className="flex-1">
            <MainSelect
              values={country?.items}
              value={branch?.country_id}
              disabled
            />
          </BaseInput>

          <BaseInput label="product_name" className="flex-1">
            <MainInput register={register("product_name")} />
          </BaseInput>
        </div>

        <div className="flex gap-4 mt-3">
          <BaseInput label="name" className="flex-1">
            <MainInput register={register("client_name")} />
          </BaseInput>

          <BaseInput label="phone" className="flex-1">
            <MaskedInput register={register("client_number")} />
          </BaseInput>

          <BaseInput label="gender" className="flex-1">
            <MainRadioBtns
              values={GenderTypeSelect}
              register={register("client_gender")}
            />
          </BaseInput>
        </div>

        <div className="flex gap-4 mt-3">
          <BaseInput label="purchase_date" className="flex-1">
            <MainDatePicker
              onChange={handleDatePurchase}
              selected={date_purchase}
            />
          </BaseInput>
          <BaseInput label="date_sending_samples" className="flex-1">
            <MainDatePicker
              onChange={handleDateReturn}
              selected={date_return}
            />
          </BaseInput>
          <div className="flex flex-1" />
        </div>

        <div className="flex gap-4 mt-3">
          <BaseInput label="comments" className="flex-[2]">
            <MainTextArea
              className="!h-[220px]"
              register={register("comment")}
            />
          </BaseInput>

          <BaseInput label="files" className="flex-1 flex flex-col">
            <MainDropZone forwardedRef={inputFileRef} />
          </BaseInput>
        </div>

        <Button className="float-end mt-2 w-52" type="submit">
          {t("create")}
        </Button>
      </form>
    </Container>
  );
};

export default AddComplaint;
