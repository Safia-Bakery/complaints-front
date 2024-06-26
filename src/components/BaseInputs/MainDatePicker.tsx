import { FC } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import cl from "classnames";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./index.module.scss";
import { ru } from "date-fns/locale";

registerLocale("ru", ru);
setDefaultLocale("ru");

interface Props {
  onChange?: any;
  className?: string;
  wrapperClassName?: string;
  value?: string;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  selected?: Date | null | undefined;
  filter?: boolean;
  showTimeSelect?: boolean;
  iconClassName?: string;
  dateFormat?: string;
}

const MainDatePicker: FC<Props> = ({
  className,
  selected,
  register,
  onChange,
  wrapperClassName,
  showTimeSelect,
  iconClassName,
  dateFormat, //"Pp"
}) => {
  const handleClear = () => onChange(undefined);

  return (
    <div className={cl(wrapperClassName, "relative h-[38px]")}>
      <DatePicker
        selected={selected}
        onChange={onChange}
        timeCaption="Время"
        dateFormat={dateFormat}
        timeIntervals={10}
        showTimeSelect={showTimeSelect}
        wrapperClassName={cl("w-full h-full !mb-0")}
        className={cl("form-control", styles.inputBox, className)}
        {...register}
      />

      {!!selected && (
        <img
          onClick={handleClear}
          src="/icons/clear.svg"
          alt="clear"
          width={15}
          height={15}
          className={cl(iconClassName, styles.close)}
        />
      )}
    </div>
  );
};

export default MainDatePicker;
