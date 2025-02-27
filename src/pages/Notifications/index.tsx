import Container from '@/components/Container';
import Loading from '@/components/Loader';
import TableViewBtn from '@/components/TableViewBtn';
import useQueryString from '@/hooks/custom/useQueryString';
import { dateTimeFormat, handleIdx } from '@/utils/helper';
import { BtnTypes, CountryType } from '@/utils/types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MyButton from '@/components/Button';
import useCountries from '@/hooks/useCountries';
import AntdTable from '@/components/AntdTable';
import { ColumnsType } from 'antd/es/table';
import { Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteNotification, getNotifications } from '@/hooks/notifications';
import dayjs from 'dayjs';
import TableDeleteBtn from '@/components/TableDeleteBtn';
import successToast from '@/utils/success-toast';
import errorToast from '@/utils/error-toast';

const Notifications = () => {
  const { t } = useTranslation();
  const page = Number(useQueryString('page')) || 1;
  const navigate = useNavigate();

  const { data, isLoading, refetch } = getNotifications({
    page,
  });

  const { mutate, isPending } = deleteNotification();

  const handleDelete = (id: string) => {
    mutate(Number(id), {
      onSuccess: () => {
        refetch();
        successToast('deleted');
      },
      onError: (e) => errorToast(e.message),
    });
  };

  const columns = useMemo<ColumnsType<NotificationsRes>>(
    () => [
      {
        render: (_, r, index) => handleIdx(index),
        title: '№',
        width: 50,
      },
      {
        dataIndex: 'text',
        title: t('text'),
      },
      {
        dataIndex: 'user',
        title: t('Отправил'),
        render: (_, record) => record.user?.name,
      },
      {
        dataIndex: 'created_at',
        title: t('created_at'),
        render: (_, record) => dayjs(record.created_at).format(dateTimeFormat),
      },
      {
        dataIndex: 'scheduled_at',
        title: t('sending_time'),
        render: (_, record) =>
          !!record.scheduled_at
            ? dayjs(record.scheduled_at).format(dateTimeFormat)
            : t('not_given'),
      },
      {
        dataIndex: 'Отправлено',
        title: t('sent'),
        render: (_, record) => (!!+record?.status ? t('yes') : t('no')),
      },
      {
        dataIndex: 'action',
        title: t(''),
        width: 50,
        render: (_, record) => (
          <Link className="w-18" to={`${record.id}`}>
            <TableViewBtn />
          </Link>
        ),
      },
      {
        dataIndex: 'action',
        title: t(''),
        width: 50,
        render: (_, record) => (
          <TableDeleteBtn id={record.id.toString()} callback={handleDelete} />
        ),
      },
    ],
    []
  );

  if (isLoading) return <Loading />;
  return (
    <Container>
      <div className="flex justify-between items-end">
        <div />
        <div className="flex gap-2 mb-3">
          <MyButton onClick={() => navigate('add')} btnType={BtnTypes.black}>
            {t('add')}
          </MyButton>
        </div>
      </div>
      <AntdTable
        columns={columns}
        totalItems={data?.total}
        data={data?.items}
        rowClassName={'text-center'}
      />
    </Container>
  );
};

export default Notifications;
