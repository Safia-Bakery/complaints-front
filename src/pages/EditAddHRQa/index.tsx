import BaseInputs from "@/components/BaseInputs";
import MainCheckBox from "@/components/BaseInputs/MainCheckBox";
import MainInput from "@/components/BaseInputs/MainInput";
import MainTextArea from "@/components/BaseInputs/MainTextArea";
import MyButton from "@/components/Button";
import Container from "@/components/Container";
import Loading from "@/components/Loader";
import faqsMutation from "@/hooks/mutations/faqs";
import useHRQa from "@/hooks/useHRQa";
import errorToast from "@/utils/error-toast.ts";
import successToast from "@/utils/success-toast.ts";
import { BtnTypes, HRSpheres } from "@/utils/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const EditAddHRQa = () => {
  const { t } = useTranslation();
  const { id, sphere } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { mutate: postFaq, isPending } = faqsMutation();
  const sphere_id = HRSpheres[sphere! as unknown as HRSpheres];

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const { data, isLoading } = useHRQa({
    sphere_id,
    id: Number(id),
    enabled: !!Number(id),
  });

  const qa = data?.items?.[0];

  const onSubmit = () => {
    postFaq(
      {
        id: Number(id),
        sphere_id,
        status: +getValues("status"),
        ...getValues(),
      },
      {
        onSuccess: () => {
          successToast(!id ? "created" : "updated");
          goBack();
        },
        onError: (e) => errorToast(e.message),
      }
    );
  };

  useEffect(() => {
    if (qa)
      reset({
        question_ru: qa.question_ru,
        question_uz: qa.question_uz,
        answer_ru: qa.answer_ru,
        answer_uz: qa.answer_uz,
        status: qa.status,
      });
  }, [qa]);

  if ((isLoading && !!id) || isPending) return <Loading />;

  return (
    <Container>
      <div className="flex justify-end">
        <MyButton onClick={() => navigate(-1)} btnType={BtnTypes.black}>
          {t("back")}
        </MyButton>
      </div>
      <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
        <BaseInputs label="question_ru" error={errors.question_ru}>
          <MainInput
            register={register("question_ru", {
              required: t("required_field"),
            })}
          />
        </BaseInputs>
        <BaseInputs label="question_uz" error={errors.question_uz}>
          <MainInput
            register={register("question_uz", {
              required: t("required_field"),
            })}
          />
        </BaseInputs>
        <BaseInputs label="answer_ru" error={errors.answer_ru}>
          <MainTextArea
            className="!h-24"
            placeholder={t("answer_ru")}
            register={register("answer_ru", { required: t("required_field") })}
          />
        </BaseInputs>
        <BaseInputs label="answer_uz" error={errors.answer_uz}>
          <MainTextArea
            className="!h-24"
            placeholder={t("answer_uz")}
            register={register("answer_uz", { required: t("required_field") })}
          />
        </BaseInputs>

        <BaseInputs label="status">
          <MainCheckBox label={"active"} register={register("status")} />
        </BaseInputs>

        <MyButton type="submit" btnType={BtnTypes.black}>
          {t("save")}
        </MyButton>
      </form>
    </Container>
  );
};

export default EditAddHRQa;
