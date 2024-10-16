import Container from '@/components/Container';
import Loading from '@/components/Loader';
import TableViewBtn from '@/components/TableViewBtn';
import useQueryString from '@/hooks/custom/useQueryString';
import useHRRequests from '@/hooks/useHRRequests';
import { HRStatusOBJ, handleIdx } from '@/utils/helper';
import { BtnTypes, HRDeps, HRRequest, HRSpheres } from '@/utils/types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import chatIcon from '/icons/chat.svg';

import HRRequestModals from './modals';
import MyButton from '@/components/Button';
import AntdTable from '@/components/AntdTable';
import { ColumnsType } from 'antd/es/table';

const HRRequests = () => {
  const { hrdep, sphere } = useParams();
  const { t } = useTranslation();
  const page = Number(useQueryString('page')) || 1;
  const navigate = useNavigate();

  const { data, isLoading } = useHRRequests({
    hrtype: HRDeps[hrdep! as unknown as HRDeps],
    sphere_id: HRSpheres[sphere! as unknown as HRSpheres],
    page,
  });

  const columns = useMemo<ColumnsType<HRRequest>>(
    () => [
      {
        render: (_, r, index) => handleIdx(index),
        title: '№',
        width: 50,
      },

      {
        dataIndex: 'hrclient.name',
        title: t('user'),

        render: (_, record) => record.hrclient.name,
      },

      {
        dataIndex: 'complaint',
        title: t('question'),
      },

      {
        dataIndex: 'hrcategory.name',
        title: t('category'),
        render: (_, record) => record.hrcategory?.name,
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
          <Link
            to={`?chat_modal=${record?.id}&chat=${record?.hrclient_id}`}
            className="w-full"
          >
            <img src={chatIcon} alt="chat" className="mx-auto" />
          </Link>
        ),
      },
      {
        dataIndex: 'action',
        title: t(''),
        width: 50,
        render: (_, record) => (
          <Link
            className="w-18"
            to={
              hrdep == HRDeps[HRDeps.qa] ? `edit/${record.id}` : `${record.id}`
            }
          >
            <TableViewBtn />
          </Link>
        ),
      },
    ],
    []
  );

  const renderModal = useMemo(() => {
    return <HRRequestModals />;
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Container>
      <div className="flex justify-end mb-2 gap-2">
        <MyButton onClick={() => navigate(-1)} btnType={BtnTypes.black}>
          {t('back')}
        </MyButton>
      </div>
      <AntdTable
        columns={columns}
        data={data?.items}
        rowClassName={'text-center'}
      />

      {renderModal}
    </Container>
  );
};

export default HRRequests;
