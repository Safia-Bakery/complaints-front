import { TelegramApp } from '@/web-ui/utils/helper';
import { Flex, Image, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import Button from '@/components/Button';
import { BtnTypes } from '@/utils/types.ts';

const SuccessScreen = () => {
  const { id } = useParams();
  return (
    <Flex
      vertical
      className={'w-full h-[70svh]'}
      align="center"
      justify="space-evenly"
    >
      <Image
        src="/images/safia-logo.png"
        alt="safia logo"
        height={150}
        width={150}
      />

      <Flex gap={20} vertical align="center" justify={'center'}>
        <Typography className={'font-bold'}>Заявка №{id} принята</Typography>
        <Typography className={'text-center'}>
          При изменении статуса заявки вы получите уведомление
        </Typography>
      </Flex>

      <div className={'absolute bottom-2 left-2 right-2'}>
        <Button
          btnType={BtnTypes.tgPrimary}
          onClick={() => TelegramApp.toMainScreen()}
          className={'w-full '}
        >
          На главную страницу
        </Button>
      </div>
    </Flex>
  );
};

export default SuccessScreen;
