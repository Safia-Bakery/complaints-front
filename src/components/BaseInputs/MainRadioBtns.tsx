import cl from 'classnames';
import styles from './index.module.scss';
import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props {
  onChange?: (val: boolean) => void;
  className?: string;
  value?: boolean;
  disabled?: boolean;
  values?: { id: number | string; name: string; status?: number }[];
  register?: UseFormRegisterReturn;
  checked?: number;
}

const MainRadioBtns: FC<Props> = ({ values, register, className }) => {
  const { t } = useTranslation();
  return (
    <div
      className={cl(
        styles.inputBox,
        className,
        'bg-white !flex flex-wrap gap-4'
      )}
    >
      {values?.map((item) => (
        <label key={item.id} className={styles.radioBtn}>
          <input
            type="radio"
            value={item.id}
            id={item.id.toString()}
            {...register}
          />
          {t(item.name)}
        </label>
      ))}
    </div>
  );
};

export default MainRadioBtns;
