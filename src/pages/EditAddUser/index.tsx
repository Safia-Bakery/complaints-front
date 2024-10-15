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
import errorToast from "@/utils/error-toast.ts";
import { DeleteOutlined } from "@ant-design/icons";
import successToast from "@/utils/success-toast.ts";
import { BtnTypes, ModalTypes } from "@/utils/types";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import UploadImages from "@/web-ui/components/upload-images";
import { useAppDispatch, useAppSelector } from "@/store/rootConfig.ts";
import { clearImages, imageSelector, uploadImage } from "reducers/images.ts";

const EditAddUser = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { data: roles, isLoading: roleLoading } = useRoles({ status: 1 });
  const { mutate: postUser, isPending } = userMutation();
  const { user_images } = useAppSelector(imageSelector);

  const [modal, $modal] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const { data, isLoading, refetch } = useUsers({
    id: Number(id),
    enabled: !!id,
  });

  const user = data?.items?.[0];

  const toggleModal = () => $modal((prev) => !prev);

  const onSubmit = () => {
    const {
      status,
      name,
      username,
      role_id,
      phone_number,
      password,
      telegram_id,
    } = getValues();
    postUser(
      {
        status: status ? 1 : 0,
        name,
        username,
        role_id: +role_id,
        phone_number: fixedString(phone_number),
        password,
        telegram_id,
        stamp: user_images?.[user_images?.length - 1]?.file_name,
        ...(!!id && { id: Number(id) }),
      },
      {
        onSuccess: () => {
          goBack();
          successToast(!id ? "created" : "updated");
          refetch();
          if (!!user_images?.length)
            dispatch(
              clearImages({
                key: "user_images",
              })
            );
        },
        onError: (e) => errorToast(e.message),
      }
    );
  };

  useEffect(() => {
    if (user) {
      if (!!user?.stamp) {
        dispatch(
          uploadImage({
            key: "user_images",
            value: [{ file_name: user.stamp }],
          })
        );
      }
      reset({
        status: !!user.status,
        name: user.name,
        username: user.username,
        role_id: user.role_id,
        phone_number: user.phone_number,
        telegram_id: user.telegram_id,
      });
    }
  }, [user]);

  useEffect(() => {
    return () => {
      if (!!user_images?.length) {
        dispatch(
          clearImages({
            key: "user_images",
          })
        );
      }
    };
  }, [user_images]);

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

            <BaseInputs label="stamps" className="flex-1 flex flex-col">
              <UploadImages
                handleModal={toggleModal}
                keyObj={ModalTypes.user_images}
                open={modal}
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
            <BaseInputs label="telegram_id">
              <MainInput register={register("telegram_id")} />
            </BaseInputs>
            <BaseInputs label="status">
              <MainCheckBox label={"active"} register={register("status")} />
            </BaseInputs>
          </div>
        </div>
        <MyButton htmlType="submit" btnType={BtnTypes.black}>
          {t("save")}
        </MyButton>
      </form>
    </Container>
  );
};

export default EditAddUser;

//EditAddUser
