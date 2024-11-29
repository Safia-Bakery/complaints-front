import { useTgComplaints } from '@/hooks/useTgComplaints.ts';
import AntdTable from '@/components/AntdTable';
import { useMemo } from 'react';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { dateTimeFormat } from '@/utils/helper.ts';
import { ComplaintsResponse } from '@/types/order-details.ts';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/rootConfig.ts';
import { branchSelector } from 'reducers/tg-get-titles.ts';
import { Tooltip } from 'antd';
import { statusTip } from '@/utils/complaints';
import { bgColor } from '@/web-ui/utils/status-colors';

interface Props {
  complaintParam?: {
    results?: boolean;
    in_process?: boolean;
    archived?: boolean;
  };
}

const TgComplaints = ({ complaintParam }: Props) => {
  const navigate = useNavigate();
  const { telegram_id } = useAppSelector(branchSelector);
  const { data, isLoading } = useTgComplaints({
    client_id: Number(telegram_id),
    ...complaintParam,
  });

  const columns = useMemo<ColumnsType<ComplaintsResponse>>(
    () => [
      {
        render: (_, r, index) => index + 1,
        title: '№Документа',
      },
      {
        dataIndex: 'id',
        title: 'ID',
      },
      {
        dataIndex: 'created_at',
        title: 'Время',
        render: (_, record) =>
          dayjs(record.date_purchase).format(dateTimeFormat),
      },
      {
        dataIndex: 'status',
        title: 'Статус',
        render: (_, record) => (
          <Tooltip placement="topLeft" title={statusTip[Number(record.status)]}>
            <div
              className={`h-5 w-5 rounded-full m-auto`}
              style={{
                backgroundColor: bgColor(record),
              }}
            />
          </Tooltip>
        ),
      },
    ],
    []
  );

  return (
    <AntdTable
      columns={columns}
      onRow={(record) => {
        return {
          onClick: () => navigate(`/tg/complaint/${record.id}`),
        };
      }}
      loading={isLoading}
      data={data?.items}
    />
  );
};

export default TgComplaints;
