import BaseInput from '@/components/BaseInputs';
import MainInput from '@/components/BaseInputs/MainInput';
import MainSelect from '@/components/BaseInputs/MainSelect';
import {
  useNavigateParams,
  useRemoveParams,
} from '@/hooks/custom/useCustomNavigate';
import useQueryString from '@/hooks/custom/useQueryString';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Status = [
  { id: 0, name: 'inactive' },
  { id: 1, name: 'active' },
];

const BranchFilter = () => {
  const navigate = useNavigateParams();
  const deleteParam = useRemoveParams();
  const status = useQueryString('status');
  const name = useQueryString('name');

  const { register, reset, getValues } = useForm();
  const handleSubmit = () => navigate({ ...getValues() });

  useEffect(() => {
    reset({ name, status });
  }, []);
  return (
    <>
      <td></td>
      <td>
        <BaseInput className="!m-1">
          <MainInput
            register={register('name')}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </BaseInput>
      </td>

      <td>
        <BaseInput className="!m-1">
          <MainSelect
            values={Status}
            value={status ?? undefined}
            onChange={(status) => navigate({ status: status?.target?.value })}
          />
        </BaseInput>
      </td>
      <td></td>
    </>
  );
};

export default BranchFilter;
