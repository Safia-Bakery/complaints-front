import BaseInputs from '@/components/BaseInputs';
import MainCheckBox from '@/components/BaseInputs/MainCheckBox';
import MainInput from '@/components/BaseInputs/MainInput';
import MainSelect from '@/components/BaseInputs/MainSelect';
import MyButton from '@/components/Button';
import Container from '@/components/Container';
import Loading from '@/components/Loader';
import useQueryString from '@/hooks/custom/useQueryString';
import branchMutation from '@/hooks/mutations/branches';
import useBranches from '@/hooks/useBranches';
import useCountries from '@/hooks/useCountries';
import errorToast from '@/utils/error-toast.ts';
import successToast from '@/utils/success-toast.ts';
import { BtnTypes } from '@/utils/types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

const EditAddBranches = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const page = Number(useQueryString('page')) || 1;
  const goBack = () => navigate(-1);
  const { mutate: postBranch, isPending } = branchMutation();
  const { refetch } = useBranches({
    page,
    size: 50,
  });

  const { data: countries, isLoading: countryLoading } = useCountries({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const { data, isLoading } = useBranches({
    id: Number(id),
    enabled: !!id,
  });

  const branch = data?.items?.[0];

  const onSubmit = () => {
    postBranch(
      {
        id: Number(id),
        status: +getValues('status'),
        ...getValues(),
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
    if (branch)
      reset({
        status: branch.status,
        name: branch.name,
        country_id: branch.country_id,
        password: branch.password,
      });
  }, [branch]);

  if ((isLoading && !!id) || isPending || countryLoading) return <Loading />;

  return (
    <Container>
      <div className="flex justify-end">
        <MyButton onClick={() => navigate(-1)} btnType={BtnTypes.black}>
          {t('back')}
        </MyButton>
      </div>
      <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
        <BaseInputs label="name_table" error={errors.name_table}>
          <MainInput
            register={register('name', {
              required: t('required_field'),
            })}
          />
        </BaseInputs>

        <BaseInputs label="country" error={errors.country_id}>
          <MainSelect
            values={countries?.items}
            register={register('country_id', {
              required: t('required_field'),
            })}
          />
        </BaseInputs>

        <BaseInputs label="status">
          <MainCheckBox label={'active'} register={register('status')} />
        </BaseInputs>
        <BaseInputs label="password">
          <MainInput register={register('password')} disabled={true} />
        </BaseInputs>

        <MyButton htmlType="submit" btnType={BtnTypes.black}>
          {t('save')}
        </MyButton>
      </form>
    </Container>
  );
};

export default EditAddBranches;
