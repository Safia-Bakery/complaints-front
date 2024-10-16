import { useForm } from 'react-hook-form';
import cl from 'classnames';
import { useEffect, useState } from 'react';
import useQueryString from '@/hooks/custom/useQueryString';
import { useTranslation } from 'react-i18next';
import Loading from '../Loader';
import useComplaintExcel from '@/hooks/useComplaintExcel.ts';
import Button from '@/components/Button';
import MainInput from '@/components/BaseInputs/MainInput.tsx';
import { useParams } from 'react-router-dom';
import useExcel from '@/utils/useExcel.ts';

interface Props {}

const DownloadExcell = () => {
  const { com_sphere } = useParams();
  const { t } = useTranslation();
  const [active, $active] = useState(false);
  const { register, getValues, watch } = useForm();

  const { data, isLoading, refetch } = useComplaintExcel({
    from_date: watch('from_date'),
    to_date: watch('to_date'),
    otk_status: 1,
    enabled: false,
  });

  useEffect(() => {
    if (data?.filename) useExcel(data?.filename);
  }, [data?.filename]);

  const handleActive = () => {
    if (active) {
      refetch();
      // const {start_date, finish_date} = getValues();
      // mutate(
      //     {
      //         start_date,
      //         finish_date,
      //     },
      //     {
      //         onSuccess: (data) => {
      //             if (data.file_name) useBackExcel(data.file_name);
      //         },
      //     }
      // );
    } else $active((prev) => !prev);
  };

  return (
    <form
      className={cl('flex gap-2 md:flex-row flex-col-reverse', {
        ['md:flex-row flex-col']: active,
      })}
    >
      <div
        className={cl(
          'gap-2 md:opacity-0 hidden transition-opacity md:flex-row flex-col',
          {
            ['md:opacity-100 !flex']: active,
          }
        )}
      >
        <MainInput type="date" register={register('from_date')} />
        <MainInput type="date" register={register('to_date')} />
      </div>
      <Button
        className="btn btn-primary md:mr-2"
        htmlType="button"
        onClick={handleActive}
      >
        {t('export_to_excel')}
      </Button>

      {isLoading && <Loading />}
    </form>
  );
};

export default DownloadExcell;
