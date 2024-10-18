import Button from '@/components/Button';
import { TelegramApp } from '@/web-ui/utils/helper.ts';

const UnAuthorized = () => {
  return (
    <div className="h-svh w-full flex flex-col items-center justify-center gap-4">
      <img
        src="/images/safia-logo.png"
        alt="safia-logo"
        className="max-w-64 w-full"
      />

      <h1 className="text-2xl text-center">
        Срок действия вашего токена истек
      </h1>
      <Button onClick={() => TelegramApp.toMainScreen()}>Закрыть</Button>
    </div>
  );
};

export default UnAuthorized;
