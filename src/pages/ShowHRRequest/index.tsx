import BaseInput from '@/components/BaseInputs';
import MainSelect from '@/components/BaseInputs/MainSelect';
import MainTextArea from '@/components/BaseInputs/MainTextArea';
import MyButton from '@/components/Button';
import Container from '@/components/Container';
import Header from '@/components/Header';
import Loading from '@/components/Loader';
import Modal from '@/components/Modal';
import hrRequestMutation from '@/hooks/mutations/hrRequest';
import useHRRequests from '@/hooks/useHRRequests';
import { CancelReason, HRStatusOBJ, dateTimeFormat } from '@/utils/helper';
import errorToast from '@/utils/error-toast.ts';
import successToast from '@/utils/success-toast.ts';
import { BtnTypes, HRDeps, HRSpheres, OrderStatus } from '@/utils/types';
import cl from 'classnames';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const ShowHRRequest = () => {
  const { t } = useTranslation();
  const { hrdep, id } = useParams();
  const navigate = useNavigate();
  const [modal, $modal] = useState(false);
  const { register, handleSubmit, watch, getValues } = useForm();

  const toggleModal = () => $modal((prev) => !prev);

  const { mutate, isPending } = hrRequestMutation();

  const { data, isLoading, refetch } = useHRRequests({
    hrtype: HRDeps[hrdep! as unknown as HRDeps],

    id,
  });

  const request = data?.items?.[0];

  const handleRequst = (st: OrderStatus) => {
    const { fixedReason, cancel_reason } = getValues();
    mutate(
      {
        status: st,
        id: Number(id),
        deny_reason:
          fixedReason < 4 ? t(CancelReason[fixedReason]) : cancel_reason,
      },
      {
        onSuccess: () => {
          successToast('success');
          refetch();
          if (modal) toggleModal();
        },
        onError: (e) => errorToast(e.message),
      }
    );
  };

  if (isLoading) return <Loading />;

  return (
    <Container>
      <div className="flex w-full justify-end mb-4">
        <MyButton onClick={() => navigate(-1)} btnType={BtnTypes.darkBlue}>
          {t('back')}
        </MyButton>
      </div>
      <table className="bordered gray w-full">
        <tbody>
          <tr>
            <th>{t('question')}</th>
            <td>{request?.complaint}</td>
          </tr>
          <tr>
            <th>{t('received_at')}</th>
            <td>{dayjs(request?.created_at).format(dateTimeFormat)}</td>
          </tr>
          <tr>
            <th>{t('answer')}</th>
            <td>{request?.complaint}</td>
          </tr>
          <tr>
            <th>{t('status')}</th>
            <td>{t(HRStatusOBJ?.[request?.status!])}</td>
          </tr>
          <tr>
            <th>{t('sphere')}</th>
            <td>{t(HRSpheres[request?.sphere_id!])}</td>
          </tr>
          {request?.deny_reason && (
            <tr>
              <th>{t('deny_reason')}</th>
              <td>{request?.deny_reason}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-end w-full mt-4 gap-3">
        {data?.items?.[0]?.status! === OrderStatus.new && (
          <>
            <MyButton
              onClick={() => handleRequst(OrderStatus.done)}
              btnType={BtnTypes.green}
            >
              {t('answered')}
            </MyButton>
            <MyButton onClick={toggleModal} btnType={BtnTypes.red}>
              {t('deny')}
            </MyButton>
          </>
        )}
      </div>

      <Modal
        onCancel={toggleModal}
        open={modal}
        closable={false}
        loading={isPending}
        maskClosable
        classNames={{
          content: '!p-0',
        }}
        footer={false}
        className={cl('!h-[400px] !w-min p-1 overflow-y-auto')}
      >
        <form
          onSubmit={handleSubmit(() => handleRequst(OrderStatus.denied))}
          className={'w-[420px]'}
        >
          <Header title="deny_reason">
            <button onClick={toggleModal} className="close" type="button">
              <span aria-hidden="true">&times;</span>
            </button>
          </Header>
          <div className="p-3">
            <BaseInput label="select_reason">
              <MainSelect
                register={register('fixedReason', {
                  required: t('required_field'),
                })}
              >
                <option value={undefined} />

                {Object.keys(CancelReason).map((item) => (
                  <option key={item} value={item}>
                    {t(CancelReason[+item])}
                  </option>
                ))}
              </MainSelect>
            </BaseInput>

            {watch('fixedReason') == 4 && (
              <BaseInput label="comments">
                <MainTextArea register={register('cancel_reason')} />
              </BaseInput>
            )}

            <MyButton className="w-full mt-3" htmlType="submit">
              {t('send')}
            </MyButton>
          </div>
        </form>
      </Modal>
    </Container>
  );
};

export default ShowHRRequest;
