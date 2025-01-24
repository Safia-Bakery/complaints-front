import BaseInput from '@/components/BaseInputs';
import MainInput from '@/components/BaseInputs/MainInput';
import MainTextArea from '@/components/BaseInputs/MainTextArea';
import MyButton from '@/components/Button';
import Loading from '@/components/Loader';
import { useComplaintV2 } from '@/hooks/complaint';
import complaintsMutation from '@/hooks/mutations/complaintv2';

import errorToast from '@/utils/error-toast.ts';
import successToast from '@/utils/success-toast.ts';
import { BtnTypes, OrderStatus } from '@/utils/types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

interface ChangeTypes {
  producer_guilty?: string;
  is_returned?: string;
  match_standard?: string;
}

const Otkchild = () => {
  const { t } = useTranslation();
  const { register, reset, getValues, watch } = useForm();
  const { mutate, isPending } = complaintsMutation();
  const { id } = useParams();
  const { data: complaint, refetch } = useComplaintV2({
    complaint_id: Number(id),
    enabled: !!id,
  });
  const { producer_guilty, is_returned, match_standard } = watch();

  const handleChange = ({
    producer_guilty,
    is_returned,
    match_standard,
  }: ChangeTypes) => {
    mutate(
      {
        id: Number(id),
        ...(producer_guilty && { producer_guilty: producer_guilty }),
        ...(is_returned && { is_returned: is_returned }),
        ...(match_standard && { match_standard: match_standard }),
      },
      {
        onSuccess: () => {
          refetch();
          successToast('success');
        },
        onError: (e) => errorToast(e.message),
      }
    );
    console.log({
      producer_guilty,
      is_returned,
      match_standard,
    });
  };

  const handleSubmit = () => {
    const {
      // producer_guilty,
      // is_returned,
      correcting_details,
      car_number,
      // match_standard,
    } = getValues();
    mutate(
      {
        id: Number(id),
        // producer_guilty,
        // is_returned,
        corrections: correcting_details,
        autonumber: car_number,
        otk_status: OrderStatus.done,
        // match_standard,
      },
      {
        onSuccess: () => {
          refetch();
          successToast('success');
        },
        onError: (e) => errorToast(e.message),
      }
    );
  };

  const handleSaveComment = () => {
    const { correcting_details } = getValues();
    if (correcting_details !== complaint?.corrections)
      mutate(
        {
          id: Number(id),
          corrections: correcting_details,
        },
        {
          onSuccess: () => {
            refetch();
            successToast('success');
          },
          onError: (e) => errorToast(e.message),
        }
      );
  };

  useEffect(() => {
    reset({
      producer_guilty: complaint?.producer_guilty ? '1' : '0',
      is_returned: complaint?.is_returned ? '1' : '0',
      match_standard: !!complaint?.match_standard ? '1' : '0',
      correcting_details: complaint?.corrections,
      car_number: complaint?.autonumber,
    });
  }, [complaint]);

  useEffect(() => {}, [producer_guilty, is_returned, match_standard]);

  return (
    <>
      {isPending && <Loading />}
      <div className="w-full flex gap-3 mt-2">
        <div className="w-full pt-6">
          <table className="w-full bordered gray rounded-xl overflow-hidden">
            <tbody>
              <tr>
                <th className="w-60 text-left">{t('guest_or_shop')}</th>
                <td>{complaint?.is_client ? t('guest') : t('shop')}</td>
              </tr>
              <tr>
                <th className="w-60 text-left">{t('car_number')}</th>
                <td>
                  <MainInput
                    className="!border-none bg-transparent"
                    register={register('car_number')}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="w-full flex justify-between items-center mt-3">
            <div>{t('who_is_blamer')}</div>
            <div className="rounded-xl bg-[#ECEDEE] flex py-2 px-4 gap-4">
              <label className="flex items-center gap-2">
                <input
                  disabled={!!complaint?.certificate}
                  type="radio"
                  checked={!!Number(complaint?.producer_guilty)}
                  onChange={(e) =>
                    handleChange({ producer_guilty: e.target.value })
                  }
                  value={'1'}
                  id={'1'}
                  // {...register('producer_guilty')}
                />
                {t('yes')}
              </label>
              <label className="flex items-center gap-2">
                <input
                  disabled={!!complaint?.certificate}
                  type="radio"
                  value={'0'}
                  id={'0'}
                  checked={!Number(complaint?.producer_guilty)}
                  onChange={(e) =>
                    handleChange({ producer_guilty: e.target.value })
                  }
                  // {...register('producer_guilty')}
                />
                {t('no')}
              </label>
            </div>
          </div>
          <div className="w-full flex justify-between items-center mt-1">
            <div>{t('is_product_returned')}</div>
            <div className="rounded-xl bg-[#ECEDEE] flex py-2 px-4 gap-4">
              <label className="flex items-center gap-2">
                <input
                  disabled={!!complaint?.certificate}
                  type="radio"
                  value={'1'}
                  id={'1'}
                  checked={!!Number(complaint?.is_returned)}
                  onChange={(e) =>
                    handleChange({ is_returned: e.target.value })
                  }
                  // {...register('is_returned')}
                />
                {t('yes')}
              </label>
              <label className="flex items-center gap-2">
                <input
                  disabled={!!complaint?.certificate}
                  type="radio"
                  value={'0'}
                  checked={!complaint?.is_returned}
                  onChange={(e) =>
                    handleChange({ is_returned: e.target.value })
                  }
                  id={'0'}
                  // {...register('is_returned')}
                />
                {t('no')}
              </label>
            </div>
          </div>
          <div className="w-full flex justify-between items-center mt-1">
            <div>{t('is_match_standard')}</div>
            <div className="rounded-xl bg-[#ECEDEE] flex py-2 px-4 gap-4">
              <label className="flex items-center gap-2">
                <input
                  disabled={!!complaint?.certificate}
                  type="radio"
                  value={'1'}
                  id={'1'}
                  checked={!!Number(complaint?.match_standard)}
                  onChange={(e) =>
                    handleChange({ match_standard: e.target.value })
                  }
                />
                {t('yes')}
              </label>
              <label className="flex items-center gap-2">
                <input
                  disabled={!!complaint?.certificate}
                  type="radio"
                  value={'0'}
                  id={'0'}
                  checked={!Number(complaint?.match_standard)}
                  onChange={(e) =>
                    handleChange({ match_standard: e.target.value })
                  }
                />
                {t('no')}
              </label>
            </div>
          </div>
        </div>
        <div className="w-full">
          <BaseInput label="correcting_actions">
            <MainTextArea
              className="!bg-[#ECEDEE]"
              placeholder={t('correcting_actions')}
              register={register('correcting_details')}
            />
          </BaseInput>

          <MyButton
            className="float-end"
            onClick={handleSaveComment}
            btnType={BtnTypes.darkBlue}
          >
            {t('save')}
          </MyButton>
        </div>
      </div>
      <div className="flex justify-end">
        {complaint?.otk_status! < OrderStatus.done && (
          <MyButton
            className="float-end"
            onClick={handleSubmit}
            disabled={isPending}
            btnType={BtnTypes.black}
          >
            {t('to_proccess')}
          </MyButton>
        )}
      </div>
    </>
  );
};

export default Otkchild;
