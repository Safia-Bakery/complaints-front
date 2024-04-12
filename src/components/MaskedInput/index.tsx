import {
  ChangeEvent,
  FC,
  HTMLInputTypeAttribute,
  KeyboardEventHandler,
} from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import InputMask from "react-input-mask";
import styles from "./index.module.scss";

interface Props {
  onChange?: (val: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string | null;
  autoFocus?: boolean;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  onFocus?: () => void;
  ref?: any;
  defaultValue?: any;
  onKeyDown?: KeyboardEventHandler;
  mask?: string;
}

const MaskedInput: FC<Props> = ({
  className = "",
  placeholder = "",
  register,
  ref,
  mask = "+99999 999 99 99",
  ...others
}) => {
  return (
    <InputMask
      maskChar=""
      mask={mask}
      className={`${className} ${styles.inputBox}`}
      placeholder={placeholder || ""}
      ref={ref}
      type="tel"
      {...register}
      {...others}
    />
  );
};

export default MaskedInput;
