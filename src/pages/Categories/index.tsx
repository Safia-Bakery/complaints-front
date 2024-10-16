import Container from '@/components/Container';
import Loading from '@/components/Loader';
import TableViewBtn from '@/components/TableViewBtn';
import { handleIdx } from '@/utils/helper';
import { BtnTypes, CategoriesType } from '@/utils/types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import MyButton from '@/components/Button';
import useCategories from '@/hooks/useCategories';
import AntdTable from '@/components/AntdTable';
import { ColumnsType } from 'antd/es/table';

const Categories = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, isLoading } = useCategories({});

  const columns = useMemo<ColumnsType<CategoriesType>>(
    () => [
      {
        render: (_, r, index) => handleIdx(index),
        title: '№',
        width: 50,
      },

      {
        dataIndex: 'name',
        title: t('name_table'),
        render: (_, record) => (
          <Link className="w-18 text-blue-400" to={`${record.id}/child`}>
            {record.name}
          </Link>
        ),
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
        <div className="" />
        <div className="flex gap-2 mb-3">
          <MyButton onClick={() => navigate('add')} btnType={BtnTypes.black}>
            {t('add')}
          </MyButton>
        </div>
      </div>
      <AntdTable columns={columns} data={data} rowClassName={'text-center'} />
    </Container>
  );
};

export default Categories;
