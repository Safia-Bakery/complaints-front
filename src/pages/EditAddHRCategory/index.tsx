import BaseInputs from '@/components/BaseInputs';
import MainCheckBox from '@/components/BaseInputs/MainCheckBox';
import MainInput from '@/components/BaseInputs/MainInput';
import MyButton from '@/components/Button';
import Container from '@/components/Container';
import Loading from '@/components/Loader';
import hrCategoryMutation from '@/hooks/mutations/hrCategory';
import useHrCategories from '@/hooks/useHrCategories';
import errorToast from '@/utils/error-toast.ts';
import successToast from '@/utils/success-toast.ts';
import { BtnTypes, HRSpheres } from '@/utils/types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

const EditAddHRCategory = () => {
  const { t } = useTranslation();
  const { category_id, sphere } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { mutate: postCategory, isPending } = hrCategoryMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const { data, isLoading, refetch } = useHrCategories({
    id: Number(category_id),
    enabled: !!category_id,
  });

  const { refetch: categoriesRefetch } = useHrCategories({
    hrsphere_id: +HRSpheres[sphere as any],
    enabled: false,
  });

  const category = data?.items?.[0];

  const onSubmit = () => {
    postCategory(
      {
        id: Number(category_id),
        status: +getValues('status'),
        hrsphere_id: HRSpheres[sphere as any],
        ...getValues(),
      },
      {
        onSuccess: () => {
          successToast(!category_id ? 'created' : 'updated');
          goBack();
          categoriesRefetch();
          if (category_id) refetch();
        },
        onError: (e) => errorToast(e.message),
      }
    );
  };

  useEffect(() => {
    if (category)
      reset({
        status: category.status,
        name: category.name,
        name_uz: category.name_uz,
      });
  }, [category]);

  if ((isLoading && !!category_id) || isPending) return <Loading />;

  return (
    <Container>
      <div className="flex justify-end">
        <MyButton onClick={() => navigate(-1)} btnType={BtnTypes.black}>
          {t('back')}
        </MyButton>
      </div>
      <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
        <BaseInputs label="name_table_uz" error={errors.name_uz}>
          <MainInput
            register={register('name_uz', {
              required: t('required_field'),
            })}
          />
        </BaseInputs>
        <BaseInputs label="name_table_ru" error={errors.name}>
          <MainInput
            register={register('name', {
              required: t('required_field'),
            })}
          />
        </BaseInputs>

        <BaseInputs label="status">
          <MainCheckBox label={'active'} register={register('status')} />
        </BaseInputs>

        <MyButton htmlType="submit" btnType={BtnTypes.black}>
          {t('save')}
        </MyButton>
      </form>
    </Container>
  );
};

export default EditAddHRCategory;
