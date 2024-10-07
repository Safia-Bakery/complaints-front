import BaseInputs from "@/components/BaseInputs";
import MainCheckBox from "@/components/BaseInputs/MainCheckBox";
import MainInput from "@/components/BaseInputs/MainInput";
import MainSelect from "@/components/BaseInputs/MainSelect";
import MyButton from "@/components/Button";
import Container from "@/components/Container";
import Loading from "@/components/Loader";
import userMutation from "@/hooks/mutations/user";
import useRoles from "@/hooks/useRoles";
import useUsers from "@/hooks/useUsers";
import { fixedString } from "@/utils/helper";
import { errorToast, successToast } from "@/utils/toast";
import { BtnTypes } from "@/utils/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const EditAddUser = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { data: roles, isLoading: roleLoading } = useRoles({ status: 1 });
  const { mutate: postUser, isPending } = userMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const { data, isLoading } = useUsers({
    id: Number(id),
    enabled: !!id,
  });

  const role = data?.items?.[0];

  const onSubmit = () => {
    const { status, name, username, role_id, phone_number, password } =
      getValues();
    postUser(
      {
        status: status ? 1 : 0,
        name,
        username,
        role_id: +role_id,
        phone_number: fixedString(phone_number),
        password,
        ...(!!id && { id: Number(id) }),
      },
      {
        onSuccess: () => {
          goBack();
          successToast(!id ? "created" : "updated");
        },
        onError: (e) => errorToast(e.message),
      }
    );
  };

  useEffect(() => {
    if (role)
      reset({
        status: !!role.status,
        name: role.name,
        username: role.username,
        role_id: role.role_id,
        phone_number: role.phone_number,
      });
  }, [role]);

  if ((isLoading && !!id) || isPending || roleLoading) return <Loading />;

  return (
    <Container>
      <div className="flex justify-end">
        <MyButton onClick={() => navigate(-1)} btnType={BtnTypes.black}>
          {t("back")}
        </MyButton>
      </div>
      <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full gap-6 flex-wrap">
          <div className="flex flex-1 flex-col gap-3">
            <BaseInputs label="name" error={errors.name}>
              <MainInput
                register={register("name", {
                  required: t("required_field"),
                })}
              />
            </BaseInputs>

            <BaseInputs label="login" error={errors.username}>
              <MainInput
                register={register("username", {
                  required: t("required_field"),
                })}
              />
            </BaseInputs>

            <BaseInputs label="password" error={errors.password}>
              <MainInput
                register={register("password", {
                  required: t("required_field"),
                })}
              />
            </BaseInputs>
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <BaseInputs label="role" error={errors.role_id}>
              <MainSelect
                values={roles?.items}
                register={register("role_id", {
                  required: t("required_field"),
                })}
              />
            </BaseInputs>
            <BaseInputs label="phone_number" error={errors.phone_number}>
              <MainInput
                register={register("phone_number", {
                  required: t("required_field"),
                })}
              />
            </BaseInputs>

            <BaseInputs label="status">
              <MainCheckBox label={"active"} register={register("status")} />
            </BaseInputs>
          </div>
        </div>
        <MyButton type="submit" btnType={BtnTypes.black}>
          {t("save")}
        </MyButton>
      </form>
    </Container>
  );
};

export default EditAddUser;

//EditAddUser
