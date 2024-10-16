import cl from 'classnames';
import styles from './index.module.scss';
import { ReactNode } from 'react';
import { BtnTypes } from '@/utils/types';
import { Button, ButtonProps } from 'antd';
import { BaseButtonProps } from 'antd/es/button/button';

interface Props extends BaseButtonProps {
  green?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  htmlType?: 'submit' | 'reset' | 'button';
  btnType?: BtnTypes;
  disabled?: boolean;
}

const MyButton = ({
  green,
  children,
  className = '',
  htmlType,
  btnType = BtnTypes.black,
  ...others
}: Props) => {
  return (
    <Button
      htmlType={htmlType}
      style={{ height: 40 }}
      className={`${className} ${cl(styles.btn, styles[btnType])} text-wrap`}
      {...others}
    >
      {children}
    </Button>
  );
};

export default MyButton;
