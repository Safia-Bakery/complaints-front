import AntdTable from '@/components/AntdTable';
import { useComplaintV2 } from '@/hooks/complaint';
import {
  getStamperRoles,
  getStampers,
  handleStampers,
} from '@/hooks/complaint-stampers';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { ComplaintStamp } from '@/types/order-details';
import {
  Flex,
  Typography,
  Modal,
  Collapse,
  Spin,
  CollapseProps,
  Popconfirm,
  Tooltip,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PlusCircleOutlined } from '@ant-design/icons';
import successToast from '@/utils/success-toast';
import errorToast from '@/utils/error-toast';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { dateTimeFormat } from '@/utils/helper';
import TableViewBtn from '@/components/TableViewBtn';
import { useForm } from 'react-hook-form';
import MainTextArea from '@/components/BaseInputs/MainTextArea';
import complaintsMutation from '@/hooks/mutations/complaintv2';
import { baseURL } from '@/api/baseApi';
import { statusTip } from '@/utils/complaints';
import { OrderStatus } from '@/utils/types';

const DisableAction: { [key: number]: boolean } = {
  [OrderStatus.denied]: true,
  [OrderStatus.done]: true,
};

const statusObj: { [key: number]: ReactNode } = {
  0: <ExclamationCircleOutlined className="text-blue-500 text-xl" />,
  1: <CheckCircleOutlined className="text-green-500 text-xl" />,
  2: <CloseCircleOutlined className="text-red-400 text-xl" />,
};

enum Modals {
  none,
  first_res,
  second_res,
  role,
}

const AddStampers = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [modal, $modal] = useState<Modals>();
  const [activeRoleId, setActiveRoleId] = useState<number>();
  const { mutate: complaint, isPending: complainPending } =
    complaintsMutation();

  const { data: orderNew, refetch } = useComplaintV2({
    complaint_id: Number(id),
    enabled: false,
  });

  const columns = useMemo<ColumnsType<ComplaintStamp>>(
    () => [
      {
        dataIndex: 'role',
        render: (_, record) => record?.user?.role?.name,
      },
      {
        dataIndex: 'name',
        render: (_, record) => record?.user?.name,
      },
      {
        dataIndex: 'status',
        render: (_, record) => (
          <Tooltip placement="topLeft" title={statusTip[Number(record.status)]}>
            {statusObj[Number(record?.status)]}
          </Tooltip>
        ),
      },
      {
        dataIndex: 'action',
        width: 50,
        render: (_, record) =>
          !DisableAction[record?.status!] &&
          !orderNew?.certificate && (
            <Popconfirm
              title="Вы действительно хотите удалить этот пользователь?"
              onConfirm={() =>
                handleStamper({
                  user_id: record.user_id,
                  is_delete: true,
                })
              }
              okText={t('yes')}
              cancelText={t('no')}
            >
              <DeleteOutlined className="text-xl text-red-600" />
            </Popconfirm>
          ),
      },
    ],
    []
  );

  const { mutate, isPending } = handleStampers();
  const { register, getValues, reset } = useForm();

  const { data: stampers, isLoading: stamperLoading } = getStampers({
    id: activeRoleId,
    enabled: !!activeRoleId,
  });

  const { data: stamperRoles, isLoading: stamperRoleLoading } = getStamperRoles(
    { enabled: !!modal }
  );

  useEffect(() => {
    if (!!modal)
      reset(
        modal === Modals.first_res
          ? { response_text: orderNew?.first_response }
          : { response_text: orderNew?.second_response }
      );
  }, [orderNew?.first_response, orderNew?.second_response, modal]);

  const handleRes = () => {
    const { response_text } = getValues();
    complaint(
      {
        id: Number(id),
        ...(modal === Modals.first_res
          ? { first_response: response_text }
          : { second_response: response_text }),
      },
      {
        onSuccess: () => {
          refetch();
          reset({});
          successToast('success');
          handleModal();
        },
        onError: (e) => errorToast(e.message),
      }
    );
  };

  const handleStamper = ({
    user_id,
    is_delete,
  }: {
    user_id: number;
    is_delete?: boolean;
  }) => {
    mutate(
      { complaint_id: Number(id), user_id, is_delete },
      {
        onSuccess: () => {
          refetch();
          successToast('success');
          handleModal();
        },
        onError: (e) => errorToast(e.message),
      }
    );
  };

  const items = useMemo<CollapseProps['items']>(() => {
    return stamperRoles?.map((item) => ({
      key: item.id,
      label: item.name,
      children: (
        <>
          {!stamperRoleLoading ? (
            stampers
              ?.filter((item) => item?.role?.id === activeRoleId)
              ?.map((stamper) => (
                <button
                  key={stamper.id}
                  className="flex p-1 rounded-md shadow-sm w-full"
                  onClick={() => handleStamper({ user_id: stamper.id })}
                >
                  {stamper.name}
                </button>
              ))
          ) : (
            <Spin className="m-auto" />
          )}
        </>
      ),
    }));
  }, [stamperRoles, activeRoleId, stamperLoading, stamperRoleLoading]);

  const handleModal = (modalType?: Modals) => $modal(modalType);

  return (
    <>
      <Flex flex={1} className="h-fit">
        <table className="w-full bordered gray">
          <tbody>
            <tr>
              <th className="w-60 text-left">ОТВЕТ №1</th>
              <td>
                <Flex justify="space-between">
                  <p>{orderNew?.first_response || t('not_given')}</p>
                  {!orderNew?.certificate && (
                    <TableViewBtn
                      onClick={() => handleModal(Modals.first_res)}
                    />
                  )}
                </Flex>
              </td>
              <td>
                {orderNew?.second_response_time
                  ? dayjs(orderNew?.first_response_time).format(dateTimeFormat)
                  : t('not_given')}
              </td>
            </tr>
            <tr>
              <th className="w-60 text-left">Текст заключения</th>
              <td>
                <Flex justify="space-between">
                  <p className="max-w-[95%] w-full">
                    {orderNew?.second_response || t('not_given')}
                  </p>
                  <div className="">
                    {!orderNew?.certificate && (
                      <TableViewBtn
                        onClick={() => handleModal(Modals.second_res)}
                      />
                    )}
                  </div>
                </Flex>
              </td>
              <td>
                {orderNew?.second_response_time
                  ? dayjs(orderNew?.second_response_time).format(dateTimeFormat)
                  : t('not_given')}
              </td>
            </tr>
            <tr>
              <th className="w-60 text-left">Файл заключения</th>
              <td colSpan={2}>
                {!!orderNew?.certificate ? (
                  <Link
                    className="flex items-center p-1 gap-2"
                    to={`${baseURL}/${orderNew?.certificate}`}
                    target="_blank"
                  >
                    <FileTextOutlined className="text-blue-500 text-2xl" />
                  </Link>
                ) : (
                  t('not_given')
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </Flex>

      <Flex vertical gap={10} flex={1} className="h-fit">
        <Flex align="center" justify="space-between" gap={40} className="w-fit">
          <Typography className="font-bold">Добавить сотрудника</Typography>

          {!DisableAction[orderNew?.status!] && !orderNew?.certificate && (
            <button onClick={() => handleModal(Modals.role)}>
              <PlusCircleOutlined />
            </button>
          )}
          <Modal
            title={t('select_role')}
            open={modal === Modals.role}
            onCancel={() => handleModal()}
            loading={isPending || stamperRoleLoading}
            footer={null}
          >
            <Collapse
              onChange={(item) => setActiveRoleId(Number(item?.[0]))}
              accordion
              items={items}
            />
          </Modal>
        </Flex>
        <AntdTable
          showHeader={false}
          columns={columns}
          data={orderNew?.complaint_stamp}
        />

        <Modal
          open={modal === Modals.first_res || modal === Modals.second_res}
          onOk={handleRes}
          closable
          loading={complainPending}
          onCancel={() => handleModal()}
          okText={t('yes')}
          cancelText={t('no')}
          title={'Введите текст для ответа'}
        >
          <MainTextArea
            className="mt-2"
            register={register('response_text')}
            placeholder="Введите текст для ответа"
          />
        </Modal>
      </Flex>
    </>
  );
};

export default AddStampers;
