import cl from "classnames";
import styles from "./index.module.scss";
import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  onChange?: (val: boolean) => void;
  className?: string;
  value?: boolean;
  disabled?: boolean;
  values: { [key: string]: string };
  register?: UseFormRegisterReturn;
  checked?: number;
}

const MainRadioBtns: FC<Props> = ({ values, register, ...others }) => {
  //   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const newActive = event.target.value == "1";
  //     onChange?.(newActive);
  //   };

  return (
    <div className={cl(styles.formControl, styles.inputBox)}>
      {Object.entries(values).map((item) => (
        <label key={item[0]} className={styles.radioBtn}>
          <input
            type="radio"
            value={item[0]}
            // checked={value === !!item[0]}
            // onChange={handleCheckboxChange}

            {...register}
          />
          {item[1]}
        </label>
      ))}
    </div>
  );
};

export default MainRadioBtns;
