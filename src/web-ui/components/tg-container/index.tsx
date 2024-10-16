import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const TgContainer = ({ children, className }: Props) => {
  return <div className={`${className} p-2`}>{children}</div>;
};
export default TgContainer;
