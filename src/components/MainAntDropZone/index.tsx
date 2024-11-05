import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { useTranslation } from 'react-i18next';
import { tokenSelector } from '@/store/reducers/auth';
import Loading from '../Loader';
import { SetStateAction } from 'react';
import { baseURL } from '@/api/baseApi';
import { useAppSelector } from '@/store/rootConfig';

const { Dragger } = Upload;

interface Props {
  onChange: (value: SetStateAction<string[]>) => void;
  className?: string;
}

const MainDropZone = ({ onChange, className }: Props) => {
  const { t } = useTranslation();
  const token = useAppSelector(tokenSelector);

  const props: UploadProps = {
    name: 'file',
    openFileDialogOnClick: true,
    action: `${baseURL}/api/v2/files/`,
    headers: { Authorization: `Bearer ${token}` },

    onChange(info) {
      const { status } = info?.file;
      if (status !== 'uploading') {
        <Loading />;
      }
      if (status === 'done') {
        onChange((prev) => [...prev, info?.file?.response?.file_name]);
        // forwardedRef?.current?.push(info?.file?.response?.files?.[0]);
        message.success(`${info?.file?.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info?.file?.name} file upload failed.`);
      }
    },
    onRemove(info) {
      onChange((prev) =>
        prev.filter((item) => item !== info?.response?.file_name)
      );
    },
  };
  return (
    <Dragger {...props} className={className}>
      <p className="ant-upload-drag-icon !mb-2">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">{t('upload_files')}</p>
      <p className="ant-upload-hint">{t('file_upload_descr')}</p>
    </Dragger>
  );
};

export default MainDropZone;
