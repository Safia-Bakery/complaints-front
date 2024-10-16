import BaseInputs from '@/components/BaseInputs';
import MainCheckBox from '@/components/BaseInputs/MainCheckBox';
import MainInput from '@/components/BaseInputs/MainInput';
import MainTextArea from '@/components/BaseInputs/MainTextArea';
import MyButton from '@/components/Button';
import Container from '@/components/Container';
import Loading from '@/components/Loader';
import countriesMutation from '@/hooks/mutations/countries';
import useCountries from '@/hooks/useCountries';
import errorToast from '@/utils/error-toast.ts';
import successToast from '@/utils/success-toast.ts';
import { BtnTypes } from '@/utils/types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

const EditAddCountries = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { mutate: postCountry, isPending } = countriesMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const { data, isLoading } = useCountries({
    id: Number(id),
    enabled: !!id,
  });

  const country = data?.items?.[0];

  const onSubmit = () => {
    postCountry(
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
    if (country)
      reset({
        status: country.status,
        name: country.name,
        code: country.code,
        service_id: country.service_id,
        quality_id: country.quality_id,
        callcenter_id: country.callcenter_id,
      });
  }, [country]);

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
        <BaseInputs label="code" error={errors.code}>
          <MainInput
            register={register('code', {
              required: t('required_field'),
            })}
          />
        </BaseInputs>
        <BaseInputs label="service_id">
          <MainTextArea
            className="!h-24"
            placeholder={t('service_id')}
            register={register('service_id')}
          />
        </BaseInputs>
        <BaseInputs label="quality_id">
          <MainTextArea
            className="!h-24"
            placeholder={t('quality_id')}
            register={register('quality_id')}
          />
        </BaseInputs>
        <BaseInputs label="callcenter_id">
          <MainTextArea
            className="!h-24"
            placeholder={t('callcenter_id')}
            register={register('callcenter_id')}
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

export default EditAddCountries;
