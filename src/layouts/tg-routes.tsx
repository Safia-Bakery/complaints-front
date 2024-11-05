import { Outlet, useNavigate } from 'react-router-dom';
import useQueryString from 'custom/useQueryString.ts';
import { useAppDispatch } from '@/store/rootConfig';
import { useEffect } from 'react';
import { loginHandler } from 'reducers/auth.ts';
import { getBranch } from 'reducers/tg-get-titles.ts';
import TgHeader from '@/web-ui/components/header';
import useTgUser from '@/hooks/useTgUser.ts';
import Loading from '@/components/Loader';
import { TelegramApp } from '@/web-ui/utils/helper';
import '@/web-ui/styles/index.scss';

const TgLayout = () => {
  const tokenKey = useQueryString('token');
  const telegram_id = useQueryString('telegram_id');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, isError } = useTgUser({
    telegram_id,
    enabled: !!telegram_id,
  });

  useEffect(() => {
    if (isError) navigate('/tg/unauthorized');
  }, [isError]);

  useEffect(() => {
    if (!!tokenKey) dispatch(loginHandler(tokenKey));
    if (!!telegram_id) dispatch(getBranch({ telegram_id }));
  }, [tokenKey, telegram_id]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-web-app.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      TelegramApp?.expand();
      TelegramApp?.confirmClose();
    }, 400);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <TgHeader />
      <Outlet />
    </>
  );
};

export default TgLayout;
