import {
  ChangeEvent,
  FC,
  HTMLInputTypeAttribute,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';

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
}

const MainInput: FC<Props> = ({
  className = '',
  placeholder = '',
  register,
  ref,
  defaultValue,
  onFocus,
  ...others
}) => {
  const { t } = useTranslation();
  const initialLoadRef = useRef(true);

  const handleFocus = () => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      onFocus?.();
    }
  };
  return (
    <input
      className={`${className} ${styles.inputBox}`}
      placeholder={t(placeholder || '')}
      ref={ref}
      onFocus={handleFocus}
      // @ts-ignore
      onWheel={(e) => e.target?.blur()}
      defaultValue={defaultValue}
      {...register}
      {...others}
    />
  );
};

export default MainInput;
