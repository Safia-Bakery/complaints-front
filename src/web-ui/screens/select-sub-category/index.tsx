import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import useSubCategories from '@/hooks/useSubCategories.ts';
import Loading from '@/components/Loader';
import { Flex } from 'antd';
import Button from '@/components/Button';
import { BtnTypes } from '@/utils/types.ts';
import TgContainer from '@/web-ui/components/tg-container';
import { useEffect } from 'react';

const SelectSubCategory = () => {
  const { childId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { data, isLoading } = useSubCategories({
    category_id: childId,
    enabled: !!childId,
    status: 1,
  });

  useEffect(() => {
    if (!state?.title) navigate('/tg/select-category');
  }, [state?.title]);

  if (isLoading) return <Loading />;

  return (
    <TgContainer>
      <Flex gap={20} className={'w-full mt-4'} vertical>
        {data?.items?.map((item) => (
          <Flex flex={1} key={item.id} className={'w-full'}>
            <Link
              to={`${item.id}`}
              className={'w-full'}
              state={{ title: state.title, sub_category: item.name }}
            >
              <Button
                btnType={BtnTypes.tgPrimary}
                className={'w-full !p-4 !h-max'}
              >
                {item.name}
              </Button>
            </Link>
          </Flex>
        ))}
      </Flex>
    </TgContainer>
  );
};
export default SelectSubCategory;
