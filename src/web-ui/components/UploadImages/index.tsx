import {useAppDispatch, useAppSelector} from "@/store/rootConfig.ts";
import Modal from "@/components/Modal";
import {useCallback, useMemo,} from "react";
import cross from "/icons/crossBlack.svg";
import {useDropzone} from "react-dropzone";
import drag_img from "/icons/add-folder.svg";
import {useTranslation} from "react-i18next";
import {
    imageSelector,
    removeImage,
    uploadImage,
} from "@/store/reducers/images.ts";
import {
    ModalTypes,
} from "@/utils/types.ts";
import {baseURL} from "@/api/baseApi";
import useQueryString from "custom/useQueryString.ts";
import {useRemoveParams} from "custom/useCustomNavigate.ts";
import {fileUploadMutation, removeFileMutation} from "@/hooks/mutations/files.ts";
import Loading from "@/components/Loader";

interface Props {
    openModal: () => void;
    keyObj: ModalTypes;
}

const UploadImages = ({openModal, keyObj: key}: Props) => {
    const {t} = useTranslation();
    const modal = useQueryString("modal");
    const dispatch = useAppDispatch();
    const removeParams = useRemoveParams();
    const images = useAppSelector(imageSelector);
    const {mutate, isPending} = fileUploadMutation();
    const {mutate: removeFile} = removeFileMutation();
    const stateKey = ModalTypes[key] as keyof FileState;

    const removeImages = (value: number) => () => {
        dispatch(removeImage({key: stateKey, value}));
        removeFile({id: value});
    };

    const onDrop = useCallback(
        (files: any) => {
            if (files) {
                mutate(
                    {files},
                    {
                        onSuccess: (data: FileUploadRes) => {
                            dispatch(
                                uploadImage({
                                    key: ModalTypes[Number(modal)] as keyof FileState,
                                    value: data.files,
                                })
                            );
                            closeModal();
                        },
                    }
                );
            }
        },
        [modal]
    );

    const renderImages = useMemo(() => {
        return !images[stateKey]?.length ? (
            <div className={"w-14 h-14 rounded-full overflow-hidden cursor-pointer"}>
                <img
                    src={"/images/safia-logo.png"}
                    className={"w-full h-full opacity-40"}
                    alt={"upload-image"}
                />
            </div>
        ) : (
            images[stateKey]?.map((item) => (
                <div className={"w-14 h-14 cursor-pointer relative"} key={item.id}>
                    <div
                        onClick={removeImages(item.id)}
                        className={
                            "absolute -top-1 -right-1 border border-black rounded-full p-1 w-max z-10"
                        }
                    >
                        <img src={cross} className={"w-3 h-3"} alt={"close"}/>
                    </div>
                    <img
                        src={`${baseURL}/${item.url}`}
                        className={"w-full h-full rounded-full"}
                        alt={`${item.url}`}
                    />
                </div>
            ))
        );
    }, [images, stateKey]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    const closeModal = () => removeParams(["modal"]);

    return (
        <div className={"flex items-center w-full md:gap-3 gap-1 flex-wrap py-3"}>
            {isPending && <Loading/>}
            {renderImages}
            <div
                onClick={openModal}
                className={
                    "w-14 h-14 leading-7 rounded-full overflow-hidden cursor-pointer text-3xl font-bold flex justify-center items-center bg-gray-300"
                }
            >
                +
            </div>

            <Modal
                open={!!modal?.toString()}
                onClose={closeModal}
                title="upload_image"
                className={"flex items-center justify-center"}
            >
                <div className={"relative w-full flex flex-1"}>
                    <div
                        {...getRootProps()}
                        className="flex h-full w-full flex-1 bg-white rounded-xl border border-borderColor p-4 items-center justify-center relative"
                    >
                        <input
                            onChange={onDrop}
                            {...getInputProps()}
                            multiple
                            accept="image/*"
                            className="h-full w-full !flex opacity-0 absolute inset-0"
                        />
                        {isDragActive ? (
                            <div className="h-full w-full items-center justify-center flex bg-green-400">
                                <img src={drag_img} alt="dragFile" className="w-40 h-40"/>
                            </div>
                        ) : (
                            <div
                                className="flex h-full w-full justify-center items-center border border-borderColor text-[#00000063]">
                                {t("drag_files")}
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default UploadImages;
