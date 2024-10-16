import { FC, ReactNode } from 'react';
import { Modal as AntMdoal, ModalProps } from 'antd';

interface Props extends ModalProps {
  children: ReactNode;
}

const Modal: FC<Props> = ({ centered = true, children, ...rest }) => {
  return <AntMdoal {...rest}>{children}</AntMdoal>;
};

export default Modal;
