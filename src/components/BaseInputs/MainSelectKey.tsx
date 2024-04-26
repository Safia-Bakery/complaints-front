import { FC, ReactNode } from "react";
import cl from "classnames";
import styles from "./index.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Props {
  onChange?: (val: string) => void;
  className?: string;
  value?: string | number;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  values?: { [key: string]: string };
  children?: ReactNode;
  onFocus?: () => void;
}

const MainSelectKey: FC<Props> = ({
  className,
  register,
  values,
  children,
  onFocus,
  onChange,
  ...others
}) => {
  const { t } = useTranslation();
  return (
    <select
      className={cl(className, styles.select, styles.inputBox)}
      onFocus={onFocus}
      onChange={(e) => onChange?.(e.target.value)}
      {...others}
      {...register}
    >
      {!children && values ? (
        <>
          <option value={undefined}></option>
          {Object.entries(values)?.map((item) => (
            <option key={item[0]} value={item[1]}>
              {t(item[1])}
            </option>
          ))}
        </>
      ) : (
        children
      )}
    </select>
  );
};

export default MainSelectKey;
