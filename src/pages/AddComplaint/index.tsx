import BaseInput from "@/components/BaseInputs";
import MainDatePicker from "@/components/BaseInputs/MainDatePicker";
import MainInput from "@/components/BaseInputs/MainInput";
import MainRadioBtns from "@/components/BaseInputs/MainRadioBtns";
import MainSelect from "@/components/BaseInputs/MainSelect";
import MainTextArea from "@/components/BaseInputs/MainTextArea";
import BranchSelect from "@/components/BranchSelect";
import Button from "@/components/Button";
import Container from "@/components/Container";
import MaskedInput from "@/components/MaskedInput";
import MainDropZone from "@/components/MainDropZone";
import {
  CountrySelect,
  GenderTypeSelect,
  OrderTypeSelect,
} from "@/utils/helper";
import { useForm } from "react-hook-form";

const AddComplaint = () => {
  const { register, getValues, handleSubmit } = useForm();

  const onSubmit = () => {
    console.log(getValues());
  };
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput label="type">
          <MainRadioBtns
            values={OrderTypeSelect}
            register={register("quality")}
          />
        </BaseInput>

        <BaseInput label="category">
          <MainRadioBtns
            values={OrderTypeSelect}
            register={register("category")}
          />
        </BaseInput>

        <div className="flex gap-4">
          <BaseInput label="branch" className="flex-1">
            <BranchSelect />
          </BaseInput>

          <BaseInput label="country" className="flex-1">
            <MainSelect values={CountrySelect} />
          </BaseInput>
          <BaseInput label="product_name" className="flex-1">
            <MainInput register={register("product_name")} />
          </BaseInput>
        </div>

        <div className="flex gap-4 mt-3">
          <BaseInput label="name" className="flex-1">
            <MainInput register={register("name")} />
          </BaseInput>

          <BaseInput label="phone" className="flex-1">
            <MaskedInput register={register("phone")} />
          </BaseInput>

          <BaseInput label="gender" className="flex-1">
            <MainRadioBtns
              values={GenderTypeSelect}
              register={register("gender")}
            />
          </BaseInput>
        </div>

        <div className="flex gap-4 mt-3">
          <BaseInput label="purchase_date" className="flex-1">
            <MainDatePicker register={register("purchase_date")} />
          </BaseInput>
          <BaseInput label="date_sending_samples" className="flex-1">
            <MainDatePicker register={register("date_sample")} />
          </BaseInput>
          <div className="flex flex-1" />
        </div>

        <div className="flex gap-4 mt-3">
          <BaseInput label="comments" className="flex-[2]">
            <MainTextArea
              className="!h-[220px]"
              register={register("comments")}
            />
          </BaseInput>

          <BaseInput label="files" className="flex-1 flex flex-col">
            <MainDropZone />
          </BaseInput>
        </div>

        <Button type="submit">submit</Button>
      </form>
    </Container>
  );
};

export default AddComplaint;
