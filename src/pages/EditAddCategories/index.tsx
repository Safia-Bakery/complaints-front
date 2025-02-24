import BaseInputs from '@/components/BaseInputs';
import MainCheckBox from '@/components/BaseInputs/MainCheckBox';
import MainInput from '@/components/BaseInputs/MainInput';
import MyButton from '@/components/Button';
import Container from '@/components/Container';
import Loading from '@/components/Loader';
import categoryMutation from '@/hooks/mutations/category';
import useCategories from '@/hooks/useCategories';
import errorToast from '@/utils/error-toast.ts';
import successToast from '@/utils/success-toast.ts';
import { BtnTypes } from '@/utils/types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import MainTextArea from '@/components/BaseInputs/MainTextArea.tsx';

const EditAddCategories = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { mutate: postCategory, isPending } = categoryMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const { data, isLoading } = useCategories({
    id: Number(id),
    enabled: !!id,
  });

  const category = data?.[0];

  const onSubmit = () => {
    postCategory(
      {
        id: Number(id),
        status: +getValues('status'),
        ...getValues(),
      },
      {
        onSuccess: () => {
          successToast(!id ? 'created' : 'updated');
          goBack();
        },
        onError: (e) => errorToast(e.message),
      }
    );
  };

  useEffect(() => {
    if (category)
      reset({
        status: category.status,
        description: category.description,
        name: category.name,
      });
  }, [category]);

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

        <BaseInputs label="status">
          <MainCheckBox label={'active'} register={register('status')} />
        </BaseInputs>
        <BaseInputs label="description" error={errors.name}>
          <MainTextArea
            placeholder={t('description')}
            register={register('description')}
          />
        </BaseInputs>
        <MyButton htmlType="submit" btnType={BtnTypes.black}>
          {t('save')}
        </MyButton>
      </form>
    </Container>
  );
};

export default EditAddCategories;
