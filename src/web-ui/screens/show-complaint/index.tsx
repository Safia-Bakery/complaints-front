import { Flex, Image, Typography } from 'antd';
import dayjs from 'dayjs';
import { dateTimeFormat } from '@/utils/helper.ts';
import { useComplaintV2 } from '@/hooks/complaint.ts';
import { Link, useParams } from 'react-router-dom';
import { baseURL } from '@/api/baseApi.ts';
import { useTranslation } from 'react-i18next';
import { OrderStatus } from '@/utils/types';
import { formatString } from '@/utils/string-formatter';
import Loading from '@/components/Loader';
import { FileTextOutlined } from '@ant-design/icons';
import { bgColor } from '@/web-ui/utils/status-colors';

const ShowComplaint = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data, isLoading } = useComplaintV2({ complaint_id: Number(id) });

  if (isLoading) return <Loading />;

  return (
    <Flex vertical className={'overflow-y-auto relative pt-2'}>
      <div
        className={`h-5 w-5 rounded-full m-auto absolute top-2 right-2`}
        style={{
          backgroundColor: bgColor(data as any),
        }}
      />
      <Typography className={'w-full font-bold text-center mb-2'}>
        Детали заказа
      </Typography>
      <span>
        <span className={'font-bold'}>№: </span> {data?.id}
      </span>{' '}
      <span>
        <span className={'font-bold'}>{t('status')}:</span>{' '}
        {t(OrderStatus[data?.status!])}
      </span>
      <span>
        <span className={'font-bold'}>{t('Создал')}:</span> {data?.client?.name}
      </span>
      <span>
        <span className={'font-bold'}>Филиал:</span> {data?.branch?.name}
      </span>
      <span>
        <span className={'font-bold'}>Время оформления:</span>{' '}
        {dayjs(data?.created_at).format(dateTimeFormat)}
      </span>
      <span>
        <span className={'font-bold'}>Категория заявки:</span>{' '}
        {data?.subcategory?.name}
      </span>
      <span>
        <span className={'font-bold'}>Блюдо:</span>{' '}
        <Flex vertical>
          {data?.complaint_product?.map((item) => (
            <span key={item?.product_id}>{item?.product?.name}</span>
          ))}
        </Flex>
      </span>
      <span>
        <span className={'font-bold'}>Дата поступления товара:</span>{' '}
        {dayjs(data?.date_return)?.format(dateTimeFormat)}
      </span>
      <span>
        <span className={'font-bold'}>Дата продажи товара:</span>{' '}
        {dayjs(data?.date_purchase)?.format(dateTimeFormat)}
      </span>{' '}
      <span>
        <span className={'font-bold'}>Дата последнего обновления:</span>{' '}
        {dayjs(data?.updated_at)?.format(dateTimeFormat)}
      </span>
      <span>
        <span className={'font-bold'}>Изменил:</span> {data?.updated_by}
      </span>
      <span>
        <span className={'font-bold'}>Номер управляющего:</span>{' '}
        {(data?.manager_phone && formatString(data?.manager_phone)) ||
          'Не задано'}
      </span>
      <span>
        <span className={'font-bold'}>Номер клиента:</span>{' '}
        {(data?.client_number && formatString(data?.client_number)) ||
          'Не задано'}
      </span>
      <span>
        <span className={'font-bold'}>Описание:</span>{' '}
        {data?.comment || 'Не задано'}
      </span>
      <span>
        <span className={'font-bold'}>ОТВЕТ №1:</span>{' '}
        {data?.first_response || 'Не задано'}
      </span>
      <span>
        <span className={'font-bold'}>Текст заключения:</span>{' '}
        {data?.second_response || 'Не задано'}
      </span>
      {!!data?.deny_reason && (
        <span>
          <span className={'font-bold'}>{t('deny_reason')}:</span>{' '}
          {data?.deny_reason}
        </span>
      )}
      <span>
        <span className={'font-bold'}>Подтвердившие пользователи:</span>{' '}
        <Flex vertical>
          {data?.complaint_stamp?.map((item, idx) => (
            <span key={item?.user_id}>
              {idx + 1}. {item?.user?.name}
            </span>
          ))}
        </Flex>
      </span>
      <span>
        <span className={'font-bold'}>Файл заключения:</span>{' '}
        {!!data?.certificate ? (
          <Link
            className="flex items-center p-1 gap-2 "
            to={`${baseURL}/${data?.certificate}`}
            target="_blank"
          >
            <FileTextOutlined className="text-blue-500 text-2xl" />
          </Link>
        ) : (
          t('not_given')
        )}
      </span>
      <span>
        <span className={'font-bold'}>Фото:</span>
      </span>
      <Flex gap={10} className="p-2" flex={'wrap'}>
        {data?.file?.map((item) => (
          <div className={'w-16 h-16 cursor-pointer relative'} key={item.id}>
            <Image
              src={`${baseURL}/${item.url}`}
              className={'rounded-full shadow-md'}
              alt={'product image'}
            />
          </div>
        ))}
      </Flex>
    </Flex>
  );
};
export default ShowComplaint;
