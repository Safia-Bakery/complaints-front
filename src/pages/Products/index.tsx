import Header from '@/components/Header';
import Loading from '@/components/Loader';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { useNavigateParams } from '@/hooks/custom/useCustomNavigate';
import useQueryString from '@/hooks/custom/useQueryString';
import cl from 'classnames';
import TableViewBtn from '@/components/TableViewBtn';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ProductsFilter from './filter';
import AntdTable from '@/components/AntdTable';
import Table, { ColumnsType } from 'antd/es/table';
import useTgProducts from '@/hooks/useTgProducts.ts';
import Container from '@/components/Container';
import MyButton from '@/components/Button';

const Products = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const navigateParams = useNavigateParams();
  const handleNavigate = (route: string) => () => navigate(route);

  const name = useQueryString('name');
  const parent_id = useQueryString('parent_id');
  const parent_name = useQueryString('parent_name');

  const { data, isLoading, isFetching } = useTgProducts({
    ...(!!parent_id && { parent_id }),
    ...(!!name && { name }),
  });

  const goBack = () => navigate(-1);

  const handleParentId = (id: string, name: string) => () =>
    navigateParams({ parent_id: id, parent_name: name });

  const columns = useMemo<ColumnsType<Product>>(
    () => [
      {
        render: (_, r, idx) => idx + 1,
        title: '№',
        width: 50,
      },
      {
        dataIndex: 'name',
        title: t('name_in_table'),
      },
      {
        dataIndex: 'num',
        title: t('num'),
      },
      {
        dataIndex: 'status',
        title: t('status'),
        render: (_, record) => (!record.status ? t('not_active') : t('active')),
      },
      {
        dataIndex: 'action',
        width: 50,
        title: '',
        render: (_, record) => {
          return <TableViewBtn onClick={handleNavigate(`${record.id}`)} />;
        },
      },
    ],
    []
  );

  const renderFilter = useMemo(() => {
    return <ProductsFilter />;
  }, []);

  const renderItems = useMemo(() => {
    if (!!parent_id)
      return (
        <AntdTable
          data={data?.products}
          virtual
          scroll={{ y: 400 }}
          columns={columns}
          loading={isFetching || isLoading}
          summary={() => (
            <Table.Summary fixed={'top'}>
              <Table.Summary.Row className="sticky top-0 z-10">
                {renderFilter}
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      );
  }, [data?.products, isFetching, isLoading]);

  if (isFetching || isLoading) return <Loading />;

  return (
    <Container className="pb-4">
      <Header title={!parent_name ? 'Инвентарь / Товары' : parent_name}>
        <div className="flex gap-2">
          <MyButton className="btn btn-primary" onClick={goBack}>
            {t('back')}
          </MyButton>
        </div>
      </Header>

      <ul>
        {data?.folders?.map((folder) => (
          <li
            className={cl(styles.folder, 'bg-gray-300')}
            onClick={handleParentId(folder.id, folder.name)}
            key={folder.id}
          >
            <img src="/icons/folder.svg" alt="folder" />
            <span>{folder.name}</span>
          </li>
        ))}
        <hr />
        {renderItems}
      </ul>
    </Container>
  );
};

export default Products;
