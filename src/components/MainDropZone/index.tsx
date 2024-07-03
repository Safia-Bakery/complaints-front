import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import dragimg from "/icons/add-folder.svg";

interface Props {
  forwardedRef?: any;
}

const MainDropZone = ({ forwardedRef }: Props) => {
  const { t } = useTranslation();
  const [fileLength, $fileLength] = useState(0);

  const onDrop = useCallback((acceptedFiles: any) => {
    $fileLength(acceptedFiles.length);
    forwardedRef.current = acceptedFiles;
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="flex flex-1 bg-white rounded-xl border border-borderColor p-4 items-center justify-center relative h-[80px]"
    >
      <input
        onChange={onDrop}
        {...getInputProps()}
        multiple
        className="h-full w-full !flex opacity-0 absolute inset-0"
      />
      {!isDragActive ? (
        <div className="w-full items-center justify-center flex bg-green-400 h-min">
          <img src={dragimg} alt="dragFile" className="w-14 h-14" />
        </div>
      ) : (
        <div className="flex h-full w-full justify-center items-center border border-borderColor text-[#00000063]">
          {!!fileLength
            ? `${t("selected_files")} ${fileLength}`
            : t("drag_files")}
        </div>
      )}
    </div>
  );
};

export default MainDropZone;
