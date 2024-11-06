import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Divider, Empty, Flex, Image, Tooltip, Typography } from 'antd';
import TgContainer from '@/web-ui/components/tg-container';
import Button from '@/components/Button';
import { BtnTypes, ModalTypes } from '@/utils/types.ts';
import {
  FolderOutlined,
  InfoCircleOutlined,
  SearchOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useTgProducts from '@/hooks/useTgProducts.ts';
import { qualityCategs, qualityKeys } from '@/utils/keys.ts';
import TgDatepicker from '@/web-ui/components/tg-datepicker';
import MaskedInput from '@/components/MaskedInput';
import { useForm } from 'react-hook-form';
import MainTextArea from '@/components/BaseInputs/MainTextArea.tsx';
import UploadImages from '@/web-ui/components/upload-images';
import dayjs from 'dayjs';
import AntdTable from '@/components/AntdTable';
import Table, { ColumnsType } from 'antd/es/table';
import './index.scss';
import Modal from '@/components/Modal';
import { dateTimeFormat, fixedString } from '@/utils/helper';
import { baseURL } from '@/api/baseApi';
import { clearImages, imageSelector } from '@/store/reducers/images';
import { useAppDispatch, useAppSelector } from '@/store/rootConfig';
import complaintsMutation from '@/hooks/mutations/complaintv2';
import warnToast from '@/utils/warn-toast.ts';
import useTgUser from '@/hooks/useTgUser.ts';
import { branchSelector } from 'reducers/tg-get-titles.ts';
import errorToast from '@/utils/error-toast.ts';
import MainInput from '@/components/BaseInputs/MainInput';

interface LocalFolderType {
  name: string;
  id: string;
}

const CreateOrderScreen = () => {
  const { childId, subId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const [search, $search] = useState('');
  const [selectedProd, $selectedProd] = useState<Product>();
  const [received_at, $received_at] = useState<dayjs.Dayjs>();
  const [date_clients_complaint, $date_clients_complaint] =
    useState<dayjs.Dayjs>();
  const [selling_at, $selling_at] = useState<dayjs.Dayjs>();
  const [folderStack, $folderStack] = useState<LocalFolderType[]>([]);
  const images = useAppSelector(imageSelector);
  const { telegram_id } = useAppSelector(branchSelector);
  const [modal, $modal] = useState<ModalTypes>();
  const { data: user } = useTgUser({ telegram_id, enabled: false });

  const { mutate, isPending } = complaintsMutation();

  const handleModal = useCallback(() => {
    $modal((prev) =>
      !prev?.toString() ? ModalTypes.product_images : undefined
    );
  }, [modal]);

  const { register, getValues } = useForm();

  const { data: searchedItems, isLoading } = useTgProducts({
    enabled: qualityKeys[+childId!],
    parent_id: folderStack?.at(-1)?.id,
    ...(!!search && { name: search }),
  });

  const handleNavigate = () => {
    const { manager_phone, client_phone } = getValues();
    if (
      (qualityKeys[+childId!] && !selectedProd?.id) ||
      fixedString(manager_phone)?.length < 10 ||
      (qualityCategs.shop !== Number(childId) &&
        fixedString(client_phone)?.length < 10)
    )
      warnToast(
        `${
          (qualityKeys[+childId!] && !selectedProd?.id && 'Выберите продукт') ||
          (fixedString(manager_phone)?.length < 10 &&
            'Номер управляющего филиала неверный') ||
          (fixedString(client_phone)?.length < 10 &&
            qualityCategs.shop !== Number(childId) &&
            'Номер клиента неверный')
        }`
      );
    else $modal(ModalTypes.confirm);
  };
  const onSearch = () => $search(getValues('search'));

  const handleSubmit = () => {
    const { manager_phone, client_phone, description, client_name } =
      getValues();
    mutate(
      {
        ...(selectedProd?.id && { products: [selectedProd?.id] }),
        client_id: Number(telegram_id),
        branch_id: user?.branch?.id?.toString(),
        subcategory_id: Number(subId),
        date_purchase: selling_at?.toISOString(),
        date_return: received_at?.toISOString(),
        date_clients_complaint: date_clients_complaint?.toISOString(),
        manager_phone: fixedString(manager_phone),
        client_number: fixedString(client_phone),
        comment: description,
        files: images['product_images']?.map((item) => item.file_name),
        client_name,
      },
      {
        onSuccess: (data) => {
          navigate(`/tg/success/${data.id}`);
          dispatch(clearImages({ key: 'product_images' }));
        },
        onError: (e) => errorToast(e.message),
      }
    );
  };

  const handleFolder = (item: Folder) => {
    $folderStack((prev) => [...prev, { name: item.name, id: item.id }]);
  };

  const handleBack = () => $folderStack((prev) => prev.slice(0, -1));

  const folderColumns = useMemo<ColumnsType<Folder>>(
    () => [
      {
        dataIndex: 'name',
        render: (_, record) => (
          <Button
            icon={<FolderOutlined />}
            btnType={BtnTypes.tgBrown}
            onClick={() => handleFolder(record)}
            className={'w-full !p-2 !h-max justify-start mb-2'}
          >
            {record.name}
          </Button>
        ),
      },
    ],
    []
  );

  const prodsColumns = useMemo<ColumnsType<Product>>(
    () => [
      {
        dataIndex: 'name',
        render: (_, record) => (
          <Button
            btnType={BtnTypes.tgLighBrown}
            onClick={() => $selectedProd(record)}
            className={'w-full !p-2 !h-max justify-start mb-2'}
          >
            {record.name}
          </Button>
        ),
      },
    ],
    []
  );

  const renderList = useMemo(() => {
    return (
      <>
        {!selectedProd?.id ? (
          <>
            <AntdTable
              sticky
              className="tg-table pt-3"
              loading={isLoading}
              scroll={{ y: 250 }}
              rowClassName={'!bg-transparent'}
              columns={folderColumns}
              data={searchedItems?.folders}
              locale={{ emptyText: '' }}
              summary={() =>
                !!folderStack?.length && (
                  <Table.Summary fixed={'top'}>
                    <Table.Summary.Row>
                      <td>
                        <Button
                          className="w-full"
                          btnType={BtnTypes.tgSelected}
                        >
                          Выбрано: {folderStack?.at(-1)?.name}
                        </Button>
                      </td>
                    </Table.Summary.Row>
                  </Table.Summary>
                )
              }
            />
            {!selectedProd?.id && (
              <AntdTable
                className="tg-table pt-3"
                loading={isLoading}
                scroll={{ y: 250 }}
                rowClassName={'!bg-transparent pt-2'}
                columns={prodsColumns}
                data={searchedItems?.products}
                showHeader={false}
                locale={{
                  emptyText: () => (
                    <>
                      <Empty className={'p-2'} description={'Список пуст'} />
                    </>
                  ),
                }}
              />
            )}
          </>
        ) : (
          <Flex justify={'center'} className="mt-4">
            <Button
              btnType={BtnTypes.tgPrimary}
              className={'w-full !p-2 !h-max'}
            >
              {selectedProd?.name}
            </Button>
            <button onClick={() => $selectedProd(undefined)} className={'w-8'}>
              <CloseOutlined />
            </button>
          </Flex>
        )}
      </>
    );
  }, [searchedItems, folderStack, isLoading, selectedProd]);

  const renderModal = useMemo(() => {
    const { manager_phone, client_phone, description, client_name } =
      getValues();
    return (
      <Modal
        loading={isPending}
        open={modal === ModalTypes.confirm}
        closable
        onCancel={() => $modal(undefined)}
        onOk={handleSubmit}
        okButtonProps={{ className: 'bg-tgLighBrown' }}
        okText="Отправить"
      >
        <Flex vertical className={'overflow-y-auto'}>
          <Typography className={'w-full font-bold text-center mb-2'}>
            Детали заказа
          </Typography>
          <span>
            <span className={'font-bold'}>Филиал:</span> {user?.branch?.name}
          </span>

          <span>
            <span className={'font-bold'}>Время оформления:</span>{' '}
            {dayjs().format(dateTimeFormat)}
          </span>

          <span>
            <span className={'font-bold'}>Категория заявки:</span>{' '}
            {state?.sub_category}
          </span>

          {selectedProd?.id && (
            <span>
              <span className={'font-bold'}>Блюдо:</span> {selectedProd?.name}
            </span>
          )}

          {qualityKeys[+childId!] && (
            <span>
              <span className={'font-bold'}>Дата поступления товара:</span>{' '}
              {received_at?.format(dateTimeFormat)}
            </span>
          )}
          {qualityCategs.client === Number(childId) && (
            <span>
              <span className={'font-bold'}>Дата продажи товара:</span>{' '}
              {selling_at?.format(dateTimeFormat)}
            </span>
          )}
          {!qualityKeys[+childId!] && (
            <span>
              <span className={'font-bold'}>
                Дата поступления жалобы со стороны клиента:
              </span>{' '}
              {date_clients_complaint?.format(dateTimeFormat)}
            </span>
          )}

          <span>
            <span className={'font-bold'}>Номер управляющего:</span>{' '}
            {manager_phone || 'Не задано'}
          </span>

          {(qualityCategs.client === Number(childId) ||
            !qualityKeys[+childId!]) && (
            <span>
              <span className={'font-bold'}>Номер клиента:</span>{' '}
              {client_phone || 'Не задано'}
            </span>
          )}

          {!qualityKeys[+childId!] && (
            <span>
              <span className={'font-bold'}>Имя клиента:</span>{' '}
              {client_name || 'Не задано'}
            </span>
          )}
          <span>
            <span className={'font-bold'}>Описание:</span>{' '}
            {description || 'Не задано'}
          </span>

          <span>
            <span className={'font-bold'}>Фото:</span>
          </span>
          <Flex gap={10} className="p-2" flex={'wrap'}>
            {images['product_images']?.map((item) => (
              <div
                className={'w-16 h-16 cursor-pointer relative'}
                key={item.file_name}
              >
                <Image
                  src={`${baseURL}/${item.file_name}`}
                  className={'rounded-full shadow-md'}
                  alt={`${item.file_name}`}
                  height={50}
                  width={50}
                />
              </div>
            ))}
          </Flex>
        </Flex>
      </Modal>
    );
  }, [modal === ModalTypes.confirm, isPending]);

  const renderUploadImage = useMemo(() => {
    return (
      <UploadImages
        handleModal={handleModal}
        open={modal === ModalTypes.product_images}
        keyObj={ModalTypes.product_images}
      />
    );
  }, [modal === ModalTypes.product_images]);

  useEffect(() => {
    if (!state?.title) navigate('/tg/select-category');
  }, [state?.title]);

  return (
    <>
      <TgContainer>
        <Flex vertical gap={5}>
          <Typography>Категория</Typography>
          <Button btnType={BtnTypes.tgLighBrown}>{state?.sub_category}</Button>
        </Flex>
      </TgContainer>
      {qualityKeys[+childId!] && <Divider className="bg-black" />}
      <TgContainer className="overflow-y-auto h-full">
        {qualityKeys[+childId!] && (
          <>
            <Flex align="center" justify="space-between">
              <Flex align={'center'} gap={10}>
                {!!folderStack.length && !selectedProd?.id && (
                  <Button
                    className={'!min-w-9'}
                    onClick={handleBack}
                    btnType={BtnTypes.tgLighBrown}
                    icon={
                      <img
                        src="/icons/arrow.svg"
                        className="-rotate-90"
                        alt="go-back"
                        height={24}
                        width={24}
                      />
                    }
                    children={null}
                  />
                )}
                <Typography>Выбрать продукт</Typography>
              </Flex>

              <div className={'border-b border-b-black w-36 relative'}>
                <input
                  disabled={!!selectedProd?.id}
                  placeholder={'Поиск'}
                  onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                  // onChange={(e) => onSearch(e.target.value)}
                  className={
                    'w-full h-full outline-none border-none pr-10 !bg-transparent'
                  }
                  {...register('search')}
                />

                <button
                  onClick={onSearch}
                  className={'absolute top-auto right-2'}
                >
                  <SearchOutlined />
                </button>
              </div>
            </Flex>

            {renderList}
          </>
        )}

        <Divider />

        {qualityKeys[+childId!] && (
          <>
            <Flex justify="space-between" align="center" className="mt-3">
              <Typography className="font-bold">
                Дата поступления товара
              </Typography>

              <Tooltip
                color="white"
                placement="bottomRight"
                zIndex={9}
                title={
                  <div className="text-xs text-black">
                    <p className="font-bold inline">
                      Дата поступления товара -{' '}
                    </p>
                    дата когда товар поступил на склад магазина (время прихода)
                  </div>
                }
              >
                <button className="w-8">
                  <InfoCircleOutlined />
                </button>
              </Tooltip>
            </Flex>
            <TgDatepicker
              className="w-full h-12 bg-transparent mt-3"
              showTime
              placeholder="Дата поступления"
              format="YYYY-MM-DD HH:mm"
              onChange={(date: dayjs.Dayjs) => $received_at(date)}
            />
          </>
        )}

        {qualityCategs.client === Number(childId) && (
          <>
            <Flex justify="space-between" align="center" className="mt-6">
              <Typography className="font-bold">Дата продажи товара</Typography>

              <Tooltip
                color="white"
                zIndex={9}
                placement="bottomRight"
                title={
                  <div className="text-xs text-black">
                    <p className="font-bold inline">Дата продажи товара - </p>
                    дата когда вы покупали товар из магазина
                  </div>
                }
              >
                <button className="w-8">
                  <InfoCircleOutlined />
                </button>
              </Tooltip>
            </Flex>
            <TgDatepicker
              className="w-full h-12 bg-transparent mt-3"
              showTime
              format="YYYY-MM-DD HH:mm"
              placeholder="Дата продажи товара"
              onChange={(date: dayjs.Dayjs) => $selling_at(date)}
            />
          </>
        )}
        {!qualityKeys[+childId!] && (
          <>
            <Flex justify="space-between" align="center" className="mt-6">
              <Typography className="font-bold">
                Дата поступления жалобы со стороны клиента
              </Typography>

              <Tooltip
                color="white"
                zIndex={9}
                placement="bottomRight"
                title={
                  <div className="text-xs text-black">
                    <p className="font-bold inline">
                      Дата поступления жалобы со стороны клиента -{' '}
                    </p>
                    дата когда гость оставил жалобу
                  </div>
                }
              >
                <button className="w-8">
                  <InfoCircleOutlined />
                </button>
              </Tooltip>
            </Flex>
            <TgDatepicker
              className="w-full h-12 bg-transparent mt-3"
              showTime
              format="YYYY-MM-DD HH:mm"
              placeholder="Дата поступления жалобы"
              onChange={(date: dayjs.Dayjs) => $date_clients_complaint(date)}
            />
          </>
        )}

        {!qualityKeys[+childId!] && (
          <>
            <Typography className="font-bold mt-4">
              Укажите имя клиента
            </Typography>

            <MainInput
              register={register('client_name')}
              placeholder={'Имя клиента'}
              className={'mt-2 bg-transparent !border-[#d9d9d9]'}
            />
          </>
        )}

        <Typography className="font-bold mt-4">
          Укажите номер управляющего филиала
        </Typography>

        <MaskedInput
          register={register('manager_phone')}
          placeholder={'Номер управляющего филиала'}
          className={'mt-2 bg-transparent !border-[#d9d9d9]'}
        />

        {(qualityCategs.client === Number(childId) ||
          !qualityKeys[+childId!]) && (
          <>
            <Typography className="font-bold mt-4">
              Укажите номер клиента
            </Typography>
            <MaskedInput
              placeholder={'Номер клиента'}
              register={register('client_phone')}
              className={'mt-2 bg-transparent !border-[#d9d9d9]'}
            />
          </>
        )}

        <Typography className={'mt-4 mb-1 font-bold'}>
          Описание жалобы
        </Typography>
        <MainTextArea register={register('description')} />

        <Typography className={'mt-4'}>
          <span className="font-bold">Фото</span> (если есть)
        </Typography>
        {renderUploadImage}

        <Button
          onClick={handleNavigate}
          btnType={BtnTypes.tgLighBrown}
          className={'mt-4 w-full'}
        >
          Далее
        </Button>

        {renderModal}
      </TgContainer>
    </>
  );
};

export default CreateOrderScreen;
