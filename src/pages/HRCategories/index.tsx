import Container from '@/components/Container';
import Loading from '@/components/Loader';
import TableViewBtn from '@/components/TableViewBtn';
import { handleIdx } from '@/utils/helper';
import { BtnTypes, CategoriesType, HRSpheres } from '@/utils/types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MyButton from '@/components/Button';
import useHrCategories from '@/hooks/useHrCategories';
import AntdTable from '@/components/AntdTable';
import { ColumnsType } from 'antd/es/table';

const HRCategories = () => {
  const { t } = useTranslation();
  const { sphere } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useHrCategories({
    hrsphere_id: +HRSpheres[sphere as any],
  });

  const columns = useMemo<ColumnsType<CategoriesType>>(
    () => [
      {
        render: (_, r, index) => handleIdx(index),
        title: '№',
        width: 50,
      },

      {
        dataIndex: 'name',
        title: t('name_table_ru'),
      },

      {
        dataIndex: 'name_uz',
        title: t('name_table_uz'),
      },
      {
        dataIndex: 'status',
        title: t('status'),
        render: (_, record) => (!!record?.status ? t('active') : t('inactive')),
      },
      {
        dataIndex: 'action',
        title: '',
        width: 50,
        render: (_, record) => (
          <Link className="w-18" to={`${record.id}`}>
            <TableViewBtn />
          </Link>
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
        totalItems={data?.total}
        columns={columns}
        data={data?.items}
        rowClassName={'text-center'}
      />
    </Container>
  );
};

export default HRCategories;
