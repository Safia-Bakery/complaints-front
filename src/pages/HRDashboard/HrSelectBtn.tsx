import cl from "classnames";
import { ReactNode } from "react";

type Props = {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

const HrSelectBtn = ({ onClick, className, children }: Props) => {
  return (
    <button
      onClick={onClick}
      className={cl(
        className,
        "flex rounded-lg flex-1 bg-mainBlack text-white font-bold justify-center items-center p-2 text-xl"
      )}
    >
      {children}
    </button>
  );
};

export default HrSelectBtn;
