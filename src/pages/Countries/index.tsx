import Container from '@/components/Container';
import Loading from '@/components/Loader';
import TableViewBtn from '@/components/TableViewBtn';
import useQueryString from '@/hooks/custom/useQueryString';
import { handleIdx } from '@/utils/helper';
import { BtnTypes, CountryType } from '@/utils/types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MyButton from '@/components/Button';
import useCountries from '@/hooks/useCountries';
import AntdTable from '@/components/AntdTable';
import { ColumnsType } from 'antd/es/table';

const Countries = () => {
  const { t } = useTranslation();
  const page = Number(useQueryString('page')) || 1;
  const navigate = useNavigate();

  const { data, isLoading } = useCountries({
    page,
  });

  const columns = useMemo<ColumnsType<CountryType>>(
    () => [
      {
        render: (_, r, index) => handleIdx(index),
        title: '№',
        width: 50,
      },
      {
        dataIndex: 'name',
        title: t('name_table'),
      },
      {
        dataIndex: 'code',
        title: t('code'),
      },
      {
        dataIndex: 'status',
        title: t('status'),
        render: (_, record) => (!!record?.status ? t('active') : t('inactive')),
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

export default Countries;
