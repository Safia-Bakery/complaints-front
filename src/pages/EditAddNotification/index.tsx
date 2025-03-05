import BaseInputs from '@/components/BaseInputs';
import MainTextArea from '@/components/BaseInputs/MainTextArea';
import MyButton from '@/components/Button';
import Container from '@/components/Container';
import Loading from '@/components/Loader';
import {
  getNotification,
  getNotifications,
  notificationMutation,
} from '@/hooks/notifications';
import errorToast from '@/utils/error-toast';
import successToast from '@/utils/success-toast';
import { BtnTypes, HRSpheres } from '@/utils/types';
import warnToast from '@/utils/warn-toast';
import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

interface ValueLabel {
  label: string;
  value: number | string;
}

const sphereArr = [
  { label: 'Фабрика', value: `${HRSpheres.fabric}` },
  { label: 'Розница', value: `${HRSpheres.retail}` },
];
const disabledDate = (current: dayjs.Dayjs | null) => {
  return current && current.isBefore(dayjs().startOf('day'));
};

const EditAddNotification = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selected_date, $selected_date] = useState<dayjs.Dayjs>();

  const {
    data,
    isLoading,
    refetch: noticeRefetch,
  } = getNotification({
    id: Number(id),
    enabled: !!id,
  });
  const { refetch } = getNotifications({ enabled: false, page: 1 });

  const [selected_spheres, $selected_spheres] = useState<ValueLabel[]>([]);
  const handleSelect = (_: any, e: ValueLabel) => {
    if (!selected_spheres.find((tool) => tool.value === e.value))
      $selected_spheres((prev) => [
        ...prev,
        { value: e.value, label: e.label },
      ]);
  };
  const handleDesect = (id: any, e: ValueLabel) => {
    $selected_spheres((prev) => prev.filter((tool) => tool.value !== id));
  };

  const { mutate, isPending } = notificationMutation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = () => {
    const { text } = getValues();
    if (!!data?.status) warnToast(t('schedule_warn_msg'));
    else
      mutate(
        {
          text,
          scheduled_at: selected_date?.toISOString()!,
          receivers_sphere: selected_spheres.map((item) => +item.value),
          ...(id && { id: Number(id) }),
        },
        {
          onSuccess: () => {
            refetch();
            successToast('notification is created');
            navigate(-1);
            if (id) noticeRefetch();
          },
          onError: (e) => errorToast(e.message),
        }
      );
  };

  useEffect(() => {
    if (!!data && id) {
      $selected_date(dayjs(data.scheduled_at));
      $selected_spheres(
        data.receivers_sphere.map((item) => ({
          value: item.toString(),
          label: t(HRSpheres[item]),
        }))
      );
      reset({
        text: data.text,
      });
    }
  }, [data, id]);

  if (!!id && isLoading) return <Loading />;

  return (
    <Container>
      <div className="flex justify-end">
        <MyButton onClick={() => navigate(-1)} btnType={BtnTypes.black}>
          {t('back')}
        </MyButton>
      </div>
      <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
        <BaseInputs label="Время отправки" error={errors.text}>
          <DatePicker
            showTime
            className="w-full"
            disabledDate={disabledDate as any}
            placeholder="Дата поступления"
            format="YYYY-MM-DD HH:mm"
            value={selected_date ?? null}
            onChange={(date) => $selected_date(date)}
          />
        </BaseInputs>

        <BaseInputs label="Сфера пользователей">
          <Select
            mode="tags"
            // labelInValue
            style={{ width: '100%' }}
            onSelect={handleSelect}
            onDeselect={handleDesect}
            options={sphereArr}
            value={selected_spheres}
          />
        </BaseInputs>

        <BaseInputs label="text" error={errors.text}>
          <MainTextArea
            register={register('text', {
              required: t('required_field'),
            })}
          />
        </BaseInputs>

        <MyButton
          htmlType="submit"
          disabled={isPending}
          btnType={BtnTypes.black}
        >
          {t('save')}
        </MyButton>
      </form>
    </Container>
  );
};

export default EditAddNotification;
