import BaseInputs from "@/components/BaseInputs";
import MainCheckBox from "@/components/BaseInputs/MainCheckBox";
import MainInput from "@/components/BaseInputs/MainInput";
import MainSelect from "@/components/BaseInputs/MainSelect";
import MainSelectKey from "@/components/BaseInputs/MainSelectKey";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Loading from "@/components/Loader";
import subCategoryMutation from "@/hooks/mutations/subCategories";
import useCategories from "@/hooks/useCategories";
import useSubCategories from "@/hooks/useSubCategories";
import { errorToast, successToast } from "@/utils/toast";
import { BtnTypes } from "@/utils/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const EditAddSubCategory = () => {
  const { t } = useTranslation();
  const { id, childId } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { mutate: postCategory, isPending } = subCategoryMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const { data: categories, isLoading: categoryLoading } = useCategories({});

  const { data, isLoading } = useSubCategories({
    id: Number(childId),
    category_id: id,
    enabled: !!childId,
  });

  const category = data?.items?.[0];

  const onSubmit = () => {
    postCategory(
      {
        id: Number(id),
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
    reset({
      category: id,
      ...(category?.name && { name: category.name }),
      ...(category?.status && { status: category.status }),
    });
  }, [category]);

  if ((isLoading && !!id) || isPending || categoryLoading) return <Loading />;

  return (
    <Container>
      <div className="flex justify-end">
        <Button onClick={() => navigate(-1)} btnType={BtnTypes.black}>
          {t("back")}
        </Button>
      </div>
      <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
        <BaseInputs label="category" error={errors.category}>
          <MainSelect
            values={categories}
            register={register("category", {
              required: t("required_field"),
            })}
          />
        </BaseInputs>
        <BaseInputs label="name" error={errors.name}>
          <MainInput
            register={register("name", {
              required: t("required_field"),
            })}
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

export default EditAddSubCategory;
