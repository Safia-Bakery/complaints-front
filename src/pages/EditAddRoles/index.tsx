import BaseInputs from '@/components/BaseInputs';
import MainCheckBox from '@/components/BaseInputs/MainCheckBox';
import MainInput from '@/components/BaseInputs/MainInput';
import MyButton from '@/components/Button';
import Container from '@/components/Container';
import Loading from '@/components/Loader';
import roleMutation from '@/hooks/mutations/roles';
import useRoles from '@/hooks/useRoles';
import errorToast from '@/utils/error-toast.ts';
import successToast from '@/utils/success-toast.ts';
import { BtnTypes } from '@/utils/types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

const EditAddRoles = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { mutate: postCountry, isPending } = roleMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const { data, isLoading } = useRoles({
    id: Number(id),
    enabled: !!id,
  });

  const role = data?.items?.[0];
  const { refetch } = useRoles({ enabled: false });

  const onSubmit = () => {
    const { name, status } = getValues();
    postCountry(
      {
        name,
        ...(!!id && { id: +id }),
        ...(!!status?.toString() && { status: +status }),
      },
      {
        onSuccess: () => {
          refetch();
          goBack();
          successToast(!id ? 'created' : 'updated');
        },
        onError: (e) => errorToast(e.message),
      }
    );
  };

  useEffect(() => {
    if (role)
      reset({
        status: role.status,
        name: role.name,
      });
  }, [role]);

  if ((isLoading && !!id) || isPending) return <Loading />;

  return (
    <Container>
      <div className="flex justify-end">
        <MyButton onClick={() => navigate(-1)} btnType={BtnTypes.black}>
          {t('back')}
        </MyButton>
      </div>
      <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
        <BaseInputs label="name" error={errors.name}>
          <MainInput
            register={register('name', {
              required: t('required_field'),
            })}
          />
        </BaseInputs>

        {!!id && (
          <BaseInputs label="status">
            <MainCheckBox label={'active'} register={register('status')} />
          </BaseInputs>
        )}

        <MyButton htmlType="submit" btnType={BtnTypes.black}>
          {t('save')}
        </MyButton>
      </form>
    </Container>
  );
};

export default EditAddRoles;
