import { FC, useEffect } from 'react';
import BaseInput from '@/components/BaseInputs';
import MainInput from '@/components/BaseInputs/MainInput';
import { useNavigateParams } from 'custom/useCustomNavigate';
import { useForm } from 'react-hook-form';
import useQueryString from '@/hooks/custom/useQueryString';
import { OrderStatus } from '@/utils/types';
import useSubCategories from '@/hooks/useSubCategories';
import MainSelect from '@/components/BaseInputs/MainSelect';
import { EPresetTimes } from '@/utils/helper';

const StatusSelect = [
  { id: OrderStatus.new, name: 'new' },
  { id: OrderStatus.done, name: 'answered' },
  { id: OrderStatus.denied, name: 'denied' },
];

const HRComplaintsFilter: FC = () => {
  const navigate = useNavigateParams();
  const status = useQueryString('status');

  const subcategory_id = useQueryString('category_id');
  const client_name = useQueryString('client_name');
  const complaint = useQueryString('complaint');

  const { data: subCategs, refetch: subcategsRefech } = useSubCategories({
    status: 1,
    enabled: false,
    staleTime: EPresetTimes.MINUTE * 10,
  });

  const { register, reset, getValues } = useForm();

  useEffect(() => {
    reset({ client_name, complaint });
  }, []);

  return (
    <>
      <td></td>
      <td>
        <BaseInput className="!m-1">
          <MainInput
            register={register('client_name')}
            onKeyDown={(e) =>
              e.key === 'Enter' &&
              navigate({ client_name: getValues('client_name') })
            }
          />
        </BaseInput>
      </td>
      <td>
        <BaseInput className="!m-1">
          <MainInput
            register={register('complaint')}
            onKeyDown={(e) =>
              e.key === 'Enter' &&
              navigate({ complaint: getValues('complaint') })
            }
          />
        </BaseInput>
      </td>
      <td>
        <BaseInput className="!m-1">
          <MainSelect
            value={subcategory_id}
            onChange={(e) => navigate({ category_id: e.target.value })}
            values={subCategs?.items}
            onFocus={() => subcategsRefech()}
          />
        </BaseInput>
      </td>

      <td>
        <BaseInput className="!m-1">
          <MainSelect
            values={StatusSelect}
            value={status ?? undefined}
            onChange={(status) => navigate({ status: status.target.value })}
          />
        </BaseInput>
      </td>
      <td></td>
      <td></td>
    </>
  );
};

export default HRComplaintsFilter;
