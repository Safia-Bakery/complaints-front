import {
  ChangeEvent,
  FC,
  HTMLInputTypeAttribute,
  KeyboardEventHandler,
} from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './index.module.scss';
import InputMask from 'comigo-tech-react-input-mask';

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
  inputRef?: any;
  defaultValue?: any;
  onKeyDown?: KeyboardEventHandler;
  mask?: string;
  alwaysShowMask?: boolean;
  maskPlaceholder?: string;
  permanents?: number[];
}

const MaskedInput: FC<Props> = ({
  className = '',
  placeholder = '',
  register,
  inputRef,
  maskPlaceholder = ' ',
  mask = '+999 99 999 99 99',
  ...others
}) => {
  return (
    <InputMask
      mask={mask}
      ref={inputRef}
      maskPlaceholder={maskPlaceholder}
      className={`${className} ${styles.inputBox} pl-3`}
      placeholder={placeholder || ''}
      // type="tel"
      {...register}
      {...others}
    />
  );
};

export default MaskedInput;
