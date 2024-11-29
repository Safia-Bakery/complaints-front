import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ComplaintsFilter from './filter';
import Container from '@/components/Container';
import StatusBlock from '@/components/StatusBlock';
import MyButton from '@/components/Button';
import {
  BranchJsonVal,
  BtnTypes,
  ComplaintType,
  ComplaintsSpheres,
  CountrySelect,
} from '@/utils/types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useComplaints from '@/hooks/useComplaints';
import Loading from '@/components/Loader';
import dayjs from 'dayjs';
import { dateTimeFormat } from '@/utils/helper';
import useQueryString from '@/hooks/custom/useQueryString';
import Table, { ColumnsType } from 'antd/es/table';
import AntdTable from '@/components/AntdTable';
import { Flex } from 'antd';
import DownloadExcell from '@/components/DownloadExcel';

const Complaints = () => {
  const { t } = useTranslation();
  const { com_sphere } = useParams();
  const navigate = useNavigate();
  const id = useQueryString('id');
  const country_id = useQueryString('country_id');
  const category_id = useQueryString('category_id');
  const subcategory_id = useQueryString('subcategory_id');
  const client_name = useQueryString('client_name');
  const phone_number = useQueryString('phone_number');
  const expense = useQueryString('expense');
  const updated_by = useQueryString('updated_by');
  const status = Number(useQueryString('status'));
  const created_at = useQueryString('created_at');
  const branchJson = useQueryString('branch');
  const page = Number(useQueryString('page')) || 1;
  const branch: BranchJsonVal = branchJson && JSON.parse(branchJson);

  const { data, isLoading, isPending } = useComplaints({
    ...(!!id && { id }),
    ...(!!country_id && { country_id }),
    ...(!!category_id && { category_id }),
    ...(!!subcategory_id && { subcategory_id }),
    ...(!!client_name && { client_name }),
    ...(!!phone_number && { phone_number }),
    ...(!!expense && { expense }),
    ...(!!updated_by && { updated_by }),
    ...(!!created_at && { created_at }),
    ...(!!branch?.id && { branch_id: branch.id }),
    ...((!!status || status === 0) && { status: +status }),
    ...(!!com_sphere &&
    com_sphere === ComplaintsSpheres[ComplaintsSpheres.is_client]
      ? { [ComplaintsSpheres[ComplaintsSpheres.is_internal]]: 0 }
      : { [com_sphere!]: 1 }),
    page,
  });

  const columns = useMemo<ColumnsType<ComplaintType>>(
    () => [
      {
        render: (_, r, index) => index + 1,
        title: '№',
        width: 50,
      },
      {
        dataIndex: 'id',
        title: t('name_in_table'),
        render: (_, record) => (
          <Link className="text-blue-500" to={`${record.id}`}>
            {record.id}
          </Link>
        ),
      },
      {
        dataIndex: 'country',
        title: t('country'),
        render: (_, record) =>
          CountrySelect[Number(record?.branch?.country_id)],
      },
      {
        dataIndex: 'subcategory',
        title: t('type'),
        render: (_, record) => record?.subcategory?.category?.name,
      },
      {
        dataIndex: 'category',
        title: t('category'),
        render: (_, record) => record?.subcategory?.name,
      },
      {
        dataIndex: 'branch',
        title: t('branch'),
        render: (_, record) => record?.branch?.name,
      },
      {
        dataIndex: 'client_name',
        title: t('name'),
      },
      {
        dataIndex: 'client_number',
        title: t('phone'),
      },
      {
        dataIndex: 'created_at',
        title: t('created_at'),
        render: (_, record) => dayjs(record?.created_at).format(dateTimeFormat),
      },
      {
        dataIndex: 'product_name',
        title: 'Продукт',
        render: (_, record) => record?.product_name || t('not_given'),
      },
      {
        dataIndex: 'expence',
        title: t('expence'),
      },
      {
        dataIndex: 'updated_by',
        title: t('author'),
      },
      {
        dataIndex: 'status',
        title: t('status'),
        render: (_, record) => (
          <StatusBlock
            status={
              com_sphere === ComplaintsSpheres[ComplaintsSpheres.otk]
                ? record.otk_status
                : record.status
            }
          />
        ),
      },
    ],
    []
  );

  const renderFilter = useMemo(() => {
    return (
      <Table.Summary fixed={'top'}>
        <Table.Summary.Row>
          <ComplaintsFilter />
        </Table.Summary.Row>
      </Table.Summary>
    );
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Container className="main-container">
      {isPending && <Loading />}
      <Flex justify={'space-between'} align="end">
        <div />
        <Flex gap={8} className="mb-3">
          {/*todo*/}
          {com_sphere === 'otk' && <DownloadExcell />}
          <MyButton onClick={() => navigate('add')} btnType={BtnTypes.black}>
            {t('add')}
          </MyButton>
        </Flex>
      </Flex>
      <AntdTable
        columns={columns}
        data={data?.items}
        totalItems={data?.total}
        summary={() => renderFilter}
      />
    </Container>
  );
};

export default Complaints;
