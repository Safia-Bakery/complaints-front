import { Outlet } from 'react-router-dom';
import useQueryString from 'custom/useQueryString.ts';
import { useAppDispatch, useAppSelector } from '@/store/rootConfig';
import { useEffect } from 'react';
import { loginHandler, tokenSelector } from 'reducers/auth.ts';
import { getBranch } from 'reducers/tg-get-titles.ts';
import TgHeader from '@/web-ui/components/header';
import useTgUser from '@/hooks/useTgUser.ts';
import Loading from '@/components/Loader';
import { TelegramApp } from '@/web-ui/utils/helper';

const TgLayout = () => {
  const tokenKey = useQueryString('token');
  const telegram_id = useQueryString('telegram_id');
  const dispatch = useAppDispatch();
  const token = useAppSelector(tokenSelector);

  const { isLoading } = useTgUser({ telegram_id, enabled: !!telegram_id });

  useEffect(() => {
    if (!!tokenKey) dispatch(loginHandler(tokenKey));
    if (!!telegram_id) dispatch(getBranch({ telegram_id }));
  }, [tokenKey, telegram_id]);

  useEffect(() => {
    setTimeout(() => {
      TelegramApp?.expand();
      TelegramApp?.confirmClose();
    }, 400);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-web-app.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (isLoading || !token) return <Loading />;

  return (
    <>
      <TgHeader />
      <Outlet />
    </>
  );
};

export default TgLayout;
