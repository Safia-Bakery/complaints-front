import MyButton from '@/components/Button';
import Container from '@/components/Container';
import TableViewBtn from '@/components/TableViewBtn';
import {
  BtnTypes,
  ComplaintsSpheres,
  CountrySelect,
  GenderType,
  ModalTypes,
  OrderStatus,
} from '@/utils/types';
import { useTranslation } from 'react-i18next';
import trashIcon from '/icons/trash.svg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '@/components/Loader';
import dayjs from 'dayjs';
import { dateTimeFormat } from '@/utils/helper';
import { useMemo, useState } from 'react';
import { baseURL } from '@/api/baseApi';
import complaintsMutation from '@/hooks/mutations/complaints';
import { useNavigateParams } from '@/hooks/custom/useCustomNavigate';
import ComplaintModals from './modals';
import Header from '@/components/Header';
import errorToast from '@/utils/error-toast.ts';
import successToast from '@/utils/success-toast.ts';
import Otkchild from './Otkchild';
import { Flex } from 'antd';
import AddStampers from './add-stampers';
import { useComplaintV2 } from '@/hooks/complaint';

const DisableAction: { [key: number]: boolean } = {
  [OrderStatus.denied]: true,
  [OrderStatus.done]: true,
};

const ShowComplaint = () => {
  const { t } = useTranslation();
  const { id, com_sphere } = useParams();
  const navigate = useNavigate();
  const navigateParams = useNavigateParams();

  const renderStampers = useMemo(() => {
    return <AddStampers />;
  }, []);

  const {
    data: complaint,
    isLoading,
    refetch,
  } = useComplaintV2({
    complaint_id: Number(id),
    enabled: !!id,
  });

  const { mutate, isPending } = complaintsMutation();

  const handleModal = (modal: ModalTypes) => () => navigateParams({ modal });

  const handleStatus = (st: OrderStatus) => {
    mutate(
      {
        [+ComplaintsSpheres[com_sphere! as any] === ComplaintsSpheres.otk
          ? 'otk_status'
          : 'status']: st,
        id: Number(id),
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

  const handleExpenseModal = () => {
    return complaint?.status === OrderStatus.received &&
      +ComplaintsSpheres[com_sphere! as any] !== ComplaintsSpheres.otk
      ? navigateParams({ modal: ModalTypes.add_expense })
      : handleStatus(OrderStatus.done);
  };

  const renderBtns = useMemo(() => {
    if (
      !DisableAction[
        +ComplaintsSpheres[com_sphere! as any] === ComplaintsSpheres.otk
          ? complaint?.otk_status!
          : complaint?.status!
      ]
    )
      return (
        <div className="flex justify-end items-center gap-2 mt-4">
          <MyButton
            btnType={BtnTypes.red}
            onClick={handleModal(ModalTypes.deny_reason)}
          >
            {t('cancel')}
          </MyButton>
          {complaint?.status === OrderStatus.new ? (
            <MyButton
              btnType={BtnTypes.darkBlue}
              onClick={() => handleStatus(OrderStatus.received)}
            >
              {t('receive')}
            </MyButton>
          ) : (
            <MyButton btnType={BtnTypes.green} onClick={handleExpenseModal}>
              {t('to_close')}
            </MyButton>
          )}
        </div>
      );
  }, [complaint?.status, complaint?.otk_status]);

  if (isLoading || isPending) return <Loading />;

  return (
    <>
      <Container>
        <ComplaintModals />
        <Header>
          <MyButton onClick={() => navigate(`/complaints/${com_sphere}`)}>
            {t('back')}
          </MyButton>
        </Header>
        <div className="w-full flex gap-3">
          <div className="w-full">
            <table className="w-full bordered gray">
              <tbody>
                <tr>
                  <th className="w-60">{t('type')}</th>
                  <td>{t(`${complaint?.subcategory?.category?.name}`)}</td>
                </tr>
                <tr>
                  <th>{t('category')}</th>
                  <td>
                    <div className="flex justify-between">
                      <p>{complaint?.subcategory?.name}</p>
                      <TableViewBtn
                        onClick={handleModal(ModalTypes.edit_category)}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>{t('country')}</th>
                  <td>
                    {CountrySelect[Number(complaint?.branch?.country_id)]}
                  </td>
                </tr>
                <tr>
                  <th>{t('branch')}</th>
                  <td>
                    <div className="flex justify-between">
                      <p>{complaint?.branch?.name}</p>
                      <TableViewBtn
                        onClick={handleModal(ModalTypes.edit_branch)}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>{t('name')}</th>
                  <td>{complaint?.client_name}</td>
                </tr>
                {complaint?.client?.name && (
                  <tr>
                    <th>{t('author')}</th>
                    <td>{complaint?.client?.name}</td>
                  </tr>
                )}
                <tr>
                  <th>{t('phone')}</th>
                  <td>
                    {complaint?.client_number ? (
                      <Link
                        to={`tel:${complaint?.client_number}`}
                        className="text-blue-500"
                      >
                        {complaint?.client_number}
                      </Link>
                    ) : (
                      t('not_given')
                    )}
                  </td>
                </tr>
                <tr>
                  <th>{t('comments')}</th>
                  <td>
                    <div className="flex justify-between">
                      <p
                        style={{
                          width: '90%',
                        }}
                      >
                        {complaint?.comment}
                      </p>
                      <TableViewBtn
                        onClick={handleModal(ModalTypes.edit_comment)}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full">
            <table className="w-full bordered gray">
              <tbody>
                <tr>
                  <th className="w-60">{t('status')}</th>
                  <td>{t(OrderStatus[Number(complaint?.status)])}</td>
                </tr>
                {com_sphere === ComplaintsSpheres[ComplaintsSpheres.otk] && (
                  <tr>
                    <th className="w-60">{t('otk_status')}</th>
                    <td>{t(OrderStatus[Number(complaint?.otk_status)])}</td>
                  </tr>
                )}
                {/* <tr>
                  <th>{t("gender")}</th>
                  <td>{t(GenderType[Number(order?.client)])}</td>
                </tr> */}
                <tr>
                  <th>Изменил:</th>
                  <td>{complaint?.updated_by || t('not_given')}</td>
                </tr>
                <tr>
                  <th>Дата последнего обновления:</th>
                  <td>
                    {complaint?.updated_at
                      ? dayjs(complaint?.updated_at)?.format(dateTimeFormat)
                      : t('not_given')}
                  </td>
                </tr>
                <tr>
                  <th>{t('purchase_date')}</th>
                  <td>
                    <div className="flex justify-between">
                      <p>
                        {complaint?.date_purchase
                          ? dayjs(complaint?.date_purchase).format(
                              dateTimeFormat
                            )
                          : t('not_given')}
                      </p>
                      <TableViewBtn
                        onClick={handleModal(ModalTypes.edit_purchase_date)}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>{t('sending_date')}</th>
                  <td>
                    <div className="flex justify-between">
                      <p>
                        {complaint?.date_return
                          ? dayjs(complaint?.date_return).format(dateTimeFormat)
                          : t('not_given')}
                      </p>
                      <TableViewBtn
                        onClick={handleModal(ModalTypes.edit_sending_date)}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>{t('created_at')}</th>
                  <td>{dayjs(complaint?.created_at).format(dateTimeFormat)}</td>
                </tr>
                <tr>
                  <th>Блюдо/Продукт</th>
                  <td>
                    {!!complaint?.product_name
                      ? complaint?.product_name
                      : t('not_given')}
                  </td>
                </tr>
                <tr>
                  <th>{t('expence')}</th>
                  <td>
                    {complaint?.expense ? complaint?.expense : t('not_given')}
                  </td>
                </tr>
                {!!complaint?.deny_reason && (
                  <tr>
                    <th>{t('deny_reason')}</th>
                    <td>{complaint?.deny_reason}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Flex className="w-full mt-4" gap={20} flex={'wrap'}>
          {/* <div className=""></div> */}
          {renderStampers}
        </Flex>
        {com_sphere === ComplaintsSpheres[ComplaintsSpheres.otk] && (
          <Otkchild />
        )}

        {renderBtns}
      </Container>

      {!!complaint?.file.length && (
        <Container className="flex justify-end w-full !mt-2">
          <div className="flex flex-col ">
            <h3 className="font-bold text-xl mb-3">{t('files')}</h3>
            <ul>
              {complaint?.file.map((item, idx) => (
                <li key={idx}>
                  <Link
                    className="flex items-center p-1 gap-2"
                    to={`${baseURL}/${item.url}`}
                    target="_blank"
                  >
                    <span>image</span>
                    <button>
                      <img
                        height={30}
                        width={30}
                        src={trashIcon}
                        alt="delete"
                      />
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      )}
    </>
  );
};

export default ShowComplaint;
