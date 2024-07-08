import cl from "classnames";
import styles from "./index.module.scss";
import { ReactNode } from "react";
import { BtnTypes } from "@/utils/types";

type Props = {
  green?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  btnType?: BtnTypes;
  disabled?: boolean;
};

const Button = ({
  green,
  children,
  className = "",
  btnType = BtnTypes.black,
  ...others
}: Props) => {
  return (
    <button
      className={`${className} ${cl(styles.btn, styles[btnType])}`}
      {...others}
    >
      {children}
    </button>
  );
};

export default Button;
