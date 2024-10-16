import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/rootConfig.ts';
import { branchSelector } from 'reducers/tg-get-titles.ts';
import { Flex, Image } from 'antd';
import routePath from '@/routes.ts';
import useTgUser from '@/hooks/useTgUser.ts';

const TgHeader = () => {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const { telegram_id } = useAppSelector(branchSelector);

  const { data } = useTgUser({ telegram_id, enabled: false });

  return (
    <header className="py-4 px-3 flex items-center w-full bg-tgHeader sticky top-0 z-10">
      {pathname !== `${routePath.mainTgRoute}/${routePath.tgSelectCategory}` ? (
        <button onClick={() => navigate(-1)}>
          <img
            src="/icons/arrow.svg"
            className="-rotate-90"
            alt="go-back"
            height={24}
            width={24}
          />
        </button>
      ) : (
        <div />
      )}
      <Flex align="center" justify="space-between" flex={1}>
        <div className="flex items-center">
          {!state?.title && <Image preview={false} src={'/icons/marker.svg'} />}

          <h4 className="text-center text-white font-normal text-xl">
            {data?.branch?.name}
          </h4>
        </div>
        {state?.title && (
          <div className="h-full w-full text-xl text-white max-w-[60vw] text-end text-nowrap overflow-ellipsis truncate">
            {state.title}
          </div>
        )}
      </Flex>
    </header>
  );
};

export default TgHeader;
