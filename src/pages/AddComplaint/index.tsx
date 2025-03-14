import BaseInput from '@/components/BaseInputs';
import MainDatePicker from '@/components/BaseInputs/MainDatePicker';
import MainInput from '@/components/BaseInputs/MainInput';
import MainRadioBtns from '@/components/BaseInputs/MainRadioBtns';
import MainTextArea from '@/components/BaseInputs/MainTextArea';
import BranchSelect from '@/components/BranchSelect';
import MyButton from '@/components/Button';
import Container from '@/components/Container';
import MaskedInput from '@/components/MaskedInput';
import { GenderTypeSelect, fixedString } from '@/utils/helper';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useCategories from '@/hooks/useCategories';
import useSubCategories from '@/hooks/useSubCategories';
import MainSelect from '@/components/BaseInputs/MainSelect';
import useCountries from '@/hooks/useCountries';
import useQueryString from '@/hooks/custom/useQueryString';

import { BranchJsonVal } from '@/utils/types';
import Loading from '@/components/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import errorToast from '@/utils/error-toast.ts';
import successToast from '@/utils/success-toast.ts';
import complaintsMutation from '@/hooks/mutations/complaintv2';
import MainDropZone from '@/components/MainAntDropZone';
import { Col, Flex, Row } from 'antd';

const AddComplaint = () => {
  const navigate = useNavigate();
  const [date_purchase, $date_purchase] = useState<Date>();
  const [date_return, $date_return] = useState<Date>();
  const { com_sphere } = useParams();
  const [files, $files] = useState<string[]>([]);

  const { t } = useTranslation();
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const branchJson = useQueryString('branch');
  const branch: BranchJsonVal = branchJson && JSON.parse(branchJson);

  const { mutate, isPending } = complaintsMutation();

  const { data: categs, isLoading: categsLoading } = useCategories({
    status: 1,
  });
  const { data: country, isLoading: countryLoading } = useCountries({
    status: 1,
  });
  const { data: subCategs, isFetching: subCategFetching } = useSubCategories({
    status: 1,
    enabled: !!watch('categ'),
    category_id: watch('categ'),
  });

  const handleDatePurchase = (event: Date) => $date_purchase(event);
  const handleDateReturn = (event: Date) => $date_return(event);

  const onSubmit = () => {
    const {
      subcategory_id,
      product_name,
      client_name,
      client_number,
      client_gender,
      comment,
    } = getValues();

    if (!date_purchase) errorToast('Введите дату покупки!!!');
    else
      mutate(
        {
          branch_id: branch?.id,
          subcategory_id,
          product_name,
          client_name,
          client_number: fixedString(client_number),
          client_gender,
          date_purchase: date_purchase?.toISOString(),
          date_return: date_return?.toISOString(),
          comment,
          files,
        },
        {
          onSuccess: () => {
            navigate(`/complaints/${com_sphere}`);
            successToast('created');
          },
          onError: (e) => errorToast(e.message),
        }
      );
  };

  if (isPending || categsLoading || countryLoading || subCategFetching)
    return <Loading />;

  return (
    <Container className="!pb-14 rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput label="branch" className="flex-1">
          <BranchSelect enabled />
        </BaseInput>
        <BaseInput label="type" className="h-max">
          <MainRadioBtns
            values={categs}
            register={register('categ')}
            className="!h-max"
          />
        </BaseInput>

        <BaseInput label="category" className="h-max">
          <MainRadioBtns
            values={subCategs?.items}
            className="!h-max min-h-10"
            register={register('subcategory_id')}
          />
        </BaseInput>

        <div className="flex gap-4">
          <BaseInput label="country" className="flex-1">
            <MainSelect
              values={country?.items}
              value={branch?.country_id}
              disabled
            />
          </BaseInput>

          <BaseInput
            label="product_name"
            className="flex-1"
            error={errors.product_name}
          >
            <MainInput
              register={register('product_name', {
                required: t('required_field'),
              })}
            />
          </BaseInput>
        </div>

        <div className="flex gap-4 mt-3">
          <BaseInput label="name" className="flex-1">
            <MainInput register={register('client_name')} />
          </BaseInput>

          <BaseInput label="phone" className="flex-1">
            <MaskedInput register={register('client_number')} />
          </BaseInput>

          <BaseInput label="gender" className="flex-1">
            <MainRadioBtns
              values={GenderTypeSelect}
              register={register('client_gender')}
            />
          </BaseInput>
        </div>
        <Flex gap={16} flex={1} className="md:flex-row flex-col mt-3">
          <Col md={16} sm={24}>
            <Row className="flex gap-4">
              <BaseInput label="purchase_date" className="flex-1">
                <MainDatePicker
                  dateFormat="dd.MM.YYYY, h:mm"
                  showTimeSelect
                  onChange={handleDatePurchase}
                  selected={date_purchase}
                />
              </BaseInput>
              <BaseInput label="date_sending_samples" className="flex-1">
                <MainDatePicker
                  dateFormat="dd.MM.YYYY, h:mm"
                  showTimeSelect
                  onChange={handleDateReturn}
                  selected={date_return}
                />
              </BaseInput>
            </Row>

            {/* <div className="flex gap-4"> */}
            <BaseInput label="comments" className="flex-1 !mb-0">
              <MainTextArea
                className="!max-h-full"
                register={register('comment')}
              />
            </BaseInput>
            {/* </div> */}
          </Col>

          <BaseInput label="files" className="flex-1 flex flex-col ">
            <MainDropZone onChange={$files} />
          </BaseInput>
        </Flex>

        <MyButton className="float-end mt-2 w-52" htmlType="submit">
          {t('create')}
        </MyButton>
      </form>
    </Container>
  );
};

export default AddComplaint;
