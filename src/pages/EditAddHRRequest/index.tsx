import BaseInputs from "@/components/BaseInputs";
import MainCheckBox from "@/components/BaseInputs/MainCheckBox";
import MainInput from "@/components/BaseInputs/MainInput";
import MainTextArea from "@/components/BaseInputs/MainTextArea";
import Button from "@/components/Button";
import Container from "@/components/Container";
import faqsMutation from "@/hooks/mutations/faqs";
import { errorToast, successToast } from "@/utils/toast";
import { BtnTypes } from "@/utils/types";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const EditAddHRRequest = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { mutate: postFaq } = faqsMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const onSubmit = () => {
    const { answer, status, question } = getValues();
    postFaq(
      { id: Number(id), answer, question, status },
      {
        onSuccess: () => {
          successToast(!id ? "created" : "updated");
          goBack();
          // if (!!id) refetch();
        },
        onError: (e) => errorToast(e.message),
      }
    );
  };

  return (
    <Container>
      <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
        <BaseInputs label="question" error={errors.question}>
          <MainInput
            register={register("question", { required: t("required_field") })}
          />
        </BaseInputs>
        <BaseInputs label="answer" error={errors.answer}>
          <MainTextArea
            className="!h-24"
            placeholder={t("answer")}
            register={register("answer", { required: t("required_field") })}
          />
        </BaseInputs>

        <BaseInputs label="status">
          <MainCheckBox label={"active"} register={register("status")} />
        </BaseInputs>

        <Button type="submit" btnType={BtnTypes.black}>
          {t("save")}
        </Button>
      </form>
    </Container>
  );
};

export default EditAddHRRequest;
