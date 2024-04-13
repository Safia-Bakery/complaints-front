import cl from "classnames";
import styles from "./index.module.scss";
import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Props {
  onChange?: (val: boolean) => void;
  className?: string;
  value?: boolean;
  disabled?: boolean;
  values: { [key: string]: string };
  register?: UseFormRegisterReturn;
  checked?: number;
}

const MainRadioBtns: FC<Props> = ({ values, register }) => {
  const { t } = useTranslation();
  return (
    <div className={cl(styles.inputBox, "bg-white !flex flex-wrap gap-4")}>
      {Object.entries(values).map((item) => (
        <label key={item[0]} className={styles.radioBtn}>
          <input type="radio" value={item[0]} {...register} />
          {t(item[1])}
        </label>
      ))}
    </div>
  );
};

export default MainRadioBtns;
