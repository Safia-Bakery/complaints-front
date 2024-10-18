import { Link, useNavigate } from 'react-router-dom';
import useCategories from '@/hooks/useCategories.ts';
import { Flex } from 'antd';
import Loading from '@/components/Loader';
import Button from '@/components/Button';
import { BtnTypes } from '@/utils/types.ts';
import TgContainer from '@/web-ui/components/tg-container';
import { useEffect } from 'react';

const SelectCategory = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useCategories({ status: 1 });

  useEffect(() => {
    if (isError) navigate('/tg/unauthorized');
  }, [isError]);

  if (isLoading) return <Loading />;

  return (
    <TgContainer>
      <Flex gap={20} className={'w-full my-4 flex-wrap'}>
        <Link to={'/tg/new-orders'} className={'flex flex-1'}>
          <Button
            className={'!h-28 flex flex-1 flex-col !leading-4 !min-w-min'}
            btnType={BtnTypes.tgLighBrown}
            icon={<img src="/icons/active-orders.svg" alt="" />}
          >
            Активные заявки
          </Button>
        </Link>
        <Link to={'/tg/orders-results'} className={'flex flex-1'}>
          <Button
            className={'!h-28 flex flex-1 flex-col !leading-4 !min-w-min'}
            btnType={BtnTypes.tgSelected}
            icon={<img src="/icons/results.svg" alt="" />}
          >
            Результаты
          </Button>
        </Link>
        <Link to={'/tg/orders-archive'} className={'flex flex-1'}>
          <Button
            className={'!h-28 flex flex-1 flex-col !leading-4 !min-w-min '}
            btnType={BtnTypes.tgBrown}
            icon={<img src="/icons/archieve.svg" alt="" />}
          >
            Архив
          </Button>
        </Link>
      </Flex>
      <Flex vertical gap={20}>
        {data?.map((item) => (
          <Link
            to={`${item.id}`}
            key={item.id}
            state={{ title: item.name }}
            className={'h-[124px] flex'}
          >
            <Button
              btnType={BtnTypes.tgPrimary}
              icon={<img src={`/icons/${item.id}.svg`} alt={item.name} />}
              classNames={{ icon: 'h-6 mr-4' }}
              className={
                'w-full !p-5 !h-full !text-start justify-start items-center !font-bold'
              }
            >
              <Flex vertical>
                <span>{item?.name}</span>
                <span className={'font-normal mt-2 text-xs'}>
                  {item?.description}
                </span>
              </Flex>
            </Button>
          </Link>
        ))}
      </Flex>
    </TgContainer>
  );
};
export default SelectCategory;
