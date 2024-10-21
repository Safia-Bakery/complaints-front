import { useAppDispatch, useAppSelector } from '@/store/rootConfig.ts';
import Modal from '@/components/Modal';
import { useCallback, useMemo } from 'react';
import cross from '/icons/crossBlack.svg';
import { useDropzone } from 'react-dropzone';
import drag_img from '/icons/add-folder.svg';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import {
  imageSelector,
  removeImage,
  uploadImage,
} from '@/store/reducers/images.ts';
import { ModalTypes } from '@/utils/types.ts';
import { baseURL } from '@/api/baseApi';
import { fileUploadMutation } from '@/hooks/mutations/files.ts';
import { Image } from 'antd';

interface Props {
  handleModal: () => void;
  keyObj: ModalTypes;
  open: boolean;
}

const UploadImages = ({ handleModal, keyObj: key, open }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const images = useAppSelector(imageSelector);
  const { mutate, isPending } = fileUploadMutation();
  const stateKey = ModalTypes[key] as keyof FileState;
  const removeImages = (value: string) => () => {
    dispatch(removeImage({ key: stateKey, value }));
    // removeFile({ id: value });
  };

  const onDrop = useCallback(
    (files: any) => {
      if (files) {
        mutate(
          { files },
          {
            onSuccess: (data: FileUploadRes) => {
              dispatch(
                uploadImage({
                  key: ModalTypes[key] as keyof FileState,
                  value: data.files,
                })
              );
              handleModal();
            },
          }
        );
      }
    },
    [open]
  );

  const renderImages = useMemo(() => {
    return !images[stateKey]?.length ? (
      <div className={'w-14 h-14 rounded-full overflow-hidden cursor-pointer'}>
        <img
          src={'/images/safia-logo.png'}
          className={'w-full h-full opacity-40'}
          alt={'upload-image'}
        />
      </div>
    ) : (
      images[stateKey]?.map((item) => (
        <div
          className={'w-14 h-14 cursor-pointer relative'}
          key={item.file_name}
        >
          <div
            onClick={removeImages(item.file_name)}
            className={
              'absolute -top-1 -right-1 border border-black rounded-full p-1 w-max z-10'
            }
          >
            <img src={cross} className={'w-3 h-3'} alt={'close'} />
          </div>
          <Image
            src={`${baseURL}/${item.file_name}`}
            className={'w-full h-full rounded-full'}
            alt={`${item.file_name}`}
          />
        </div>
      ))
    );
  }, [images, stateKey]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div className={'flex items-center w-full md:gap-3 gap-1 flex-wrap py-3'}>
      {renderImages}
      <div
        onClick={handleModal}
        className={
          'w-14 h-14 leading-7 rounded-full overflow-hidden cursor-pointer text-3xl font-bold flex justify-center items-center bg-tgLighBrown'
        }
      >
        <PlusOutlined color={'white'} className={'text-white'} />
      </div>

      <Modal
        footer={false}
        open={open}
        onCancel={handleModal}
        closable
        loading={isPending}
        title="Загрузить фото"
        classNames={{ content: '!p-4' }}
        className={'flex !p-0 items-center justify-center'}
      >
        <div className={'relative w-full flex flex-1'}>
          <label
            {...getRootProps()}
            className="flex h-full w-full flex-1 bg-white rounded-xl border border-borderColor p-4 items-center justify-center relative"
          >
            <input
              onChange={(e) => onDrop(e.target.files)}
              // {...getInputProps()}
              accept="image/*"
              type="file"
              className="h-full w-full !flex opacity-0 absolute inset-0"
            />
            {isDragActive ? (
              <div className="h-full w-full items-center justify-center flex bg-green-400">
                <img src={drag_img} alt="dragFile" className="w-40 h-40" />
              </div>
            ) : (
              <div className="flex h-full w-full justify-center items-center border border-borderColor text-[#00000063]">
                {'Добавить фото'}
              </div>
            )}
          </label>
        </div>
      </Modal>
    </div>
  );
};

export default UploadImages;
