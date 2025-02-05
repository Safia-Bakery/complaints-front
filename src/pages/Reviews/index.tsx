import Container from '@/components/Container';
import Loading from '@/components/Loader';
import { HRStatusOBJ, handleIdx } from '@/utils/helper';
import { ComplaintType } from '@/utils/types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import chatIcon from '/icons/chat.svg';
import HRRequestModals from '../HRRequests/modals';
import useComplaints from '@/hooks/useComplaints';
import AntdTable from '@/components/AntdTable';
import { ColumnsType } from 'antd/es/table';
import { useNavigateParams } from '@/hooks/custom/useCustomNavigate';
import { useLocation } from 'react-router-dom';

const Reviews = () => {
  const { t } = useTranslation();
  const navigateParams = useNavigateParams();
  const { search } = useLocation();
  const { data, isLoading, isPending } = useComplaints({ is_client: true });

  const columns = useMemo<ColumnsType<ComplaintType>>(
    () => [
      {
        render: (_, r, index) => handleIdx(index),
        title: '№',
        width: 50,
      },

      {
        dataIndex: 'name',
        title: t('user'),

        render: (_, record) => record.client.name,
      },

      {
        dataIndex: 'comment',
        title: t('question'),
      },
      {
        dataIndex: 'status',
        title: t('status'),

        render: (_, record) =>
          !!record?.status?.toString() && t(HRStatusOBJ[record.status]),
      },
      {
        dataIndex: 'chat',
        title: t('chat'),
        width: 50,
        render: (_, record) => (
          <div
            onClick={() =>
              navigateParams({
                chat_modal: record.id,
                chat: record?.client_id,
              })
            }
            className="w-full cursor-pointer"
          >
            <img src={chatIcon} alt="chat" className="mx-auto" />
          </div>
        ),
      },
    ],
    [search]
  );

  const renderModal = useMemo(() => {
    return <HRRequestModals />;
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Container>
      <AntdTable
        isLoading={isPending}
        columns={columns}
        data={data?.items}
        rowClassName={'text-center'}
      />

      {renderModal}
    </Container>
  );
};

export default Reviews;
