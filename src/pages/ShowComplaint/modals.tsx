import BaseInput from "@/components/BaseInputs";
import MainDatePicker from "@/components/BaseInputs/MainDatePicker";
import MainSelect from "@/components/BaseInputs/MainSelect";
import MainTextArea from "@/components/BaseInputs/MainTextArea";
import MyButton from "@/components/Button";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import {useRemoveParams} from "@/hooks/custom/useCustomNavigate";
import useQueryString from "@/hooks/custom/useQueryString";
import complaintsMutation, {
    ComplaintsBody,
} from "@/hooks/mutations/complaints";
import useComplaints from "@/hooks/useComplaints";
import {CancelReason} from "@/utils/helper";
import errorToast from "@/utils/error-toast.ts";
import successToast from "@/utils/success-toast.ts";
import {
    BranchJsonVal,
    BtnTypes,
    ModalTypes,
    OrderStatus,
} from "@/utils/types";
import cl from "classnames";
import dayjs from "dayjs";
import {useEffect, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import BranchSelect from "@/components/BranchSelect";
import useSubCategories from "@/hooks/useSubCategories.ts";
import MainRadioBtns from "@/components/BaseInputs/MainRadioBtns.tsx";
import MainInput from "@/components/BaseInputs/MainInput";
import {Footer} from "antd/es/layout/layout";

const ComplaintModals = () => {
    const {t} = useTranslation();
    const {id} = useParams();
    const removeParams = useRemoveParams();
    const modal = Number(useQueryString("modal")) as ModalTypes;
    const photo = useQueryString("photo");
    const [date_purchase, $date_purchase] = useState<Date>();
    const [date_return, $date_return] = useState<Date>();

    const {refetch, data} = useComplaints({id: Number(id), enabled: !!id});
    const order = data?.items?.[0];

    const {mutate, isPending} = complaintsMutation();

    const branchJson = useQueryString("branch");
    const branch: BranchJsonVal = branchJson && JSON.parse(branchJson);

    const closeModal = () => removeParams(["modal"]);

    const {getValues, register, handleSubmit, watch, reset} = useForm();

    const {data: subCategs, isFetching: subCategFetching} = useSubCategories({
        status: 1,
        category_id: watch("categ"),
    });

    const handleExpense = (has_expense: boolean) => {
        const {comment, expense} = getValues();
        if (has_expense && !expense) return;
        else
            mutate(
                {
                    id: Number(id),
                    ...(comment && comment !== "" && {comment}),
                    ...(!!branch?.id && {branch_id: branch.id}),
                    ...(has_expense && expense && {expense: +expense}),
                    status: OrderStatus.done,
                },
                {
                    onSuccess: () => {
                        refetch();
                        successToast("success");
                        closeModal();
                    },
                    onError: (e: { message: string }) => errorToast(e.message),
                }
            );
    };

    const subcategory_id = watch("subcategory_id");
    const handleComplaint = (body?: ComplaintsBody) => () => {
        const {fixedReason, cancel_reason, comment, expense} = getValues();

        mutate(
            {
                id: Number(id),
                date_return: date_return?.toISOString(),
                ...(!!date_purchase && {
                    date_purchase: date_purchase?.toISOString(),
                }),
                deny_reason:
                    fixedReason < 4 ? t(CancelReason[fixedReason]) : cancel_reason,

                ...(!!branch?.id && {branch_id: branch.id}),
                ...(subcategory_id && {subcategory_id}),
                ...(expense && {expense: +expense}),
                ...(comment && comment !== "" && {comment}),
                ...body,
            },
            {
                onSuccess: () => {
                    refetch();
                    successToast("success");
                    closeModal();
                },
                onError: (e: { message: string }) => errorToast(e.message),
            }
        );
    };
    const handleDatePurchase = (event: Date) => $date_purchase(event);
    const handleDateReturn = (event: Date) => $date_return(event);

    const renderModal = useMemo(() => {
        if (modal === ModalTypes.deny_reason)
            return (
                <form
                    onSubmit={handleSubmit(
                        handleComplaint({
                            status: OrderStatus.denied,
                        })
                    )}
                    className={"w-[420px]"}
                >
                    <Header title="deny_reason">
                        <button onClick={closeModal} className="close" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Header>
                    <div className="p-3">
                        <BaseInput label="select_reason">
                            <MainSelect
                                register={register("fixedReason", {
                                    required: t("required_field"),
                                })}
                            >
                                <option value={undefined}/>

                                {Object.keys(CancelReason).map((item) => (
                                    <option key={item} value={item}>
                                        {t(CancelReason[+item])}
                                    </option>
                                ))}
                            </MainSelect>
                        </BaseInput>

                        {watch("fixedReason") == 4 && (
                            <BaseInput label="comments">
                                <MainTextArea register={register("cancel_reason")}/>
                            </BaseInput>
                        )}

                        <MyButton className="w-full mt-3" htmlType="submit">
                            {t("send")}
                        </MyButton>
                    </div>
                </form>
            );

        if (modal === ModalTypes.edit_purchase_date)
            return (
                <form
                    onSubmit={handleSubmit(handleComplaint())}
                    className={"w-[420px]"}
                >
                    <Header title="edit_purchase_date">
                        <button onClick={closeModal} className="close" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Header>
                    <div className="p-3">
                        <BaseInput label="date_sending_samples">
                            <MainDatePicker
                                showTimeSelect
                                dateFormat="Pp"
                                selected={
                                    !!date_purchase ? dayjs(date_purchase).toDate() : undefined
                                }
                                onChange={handleDatePurchase}
                            />
                        </BaseInput>

                        <MyButton className="w-full mt-3" htmlType="submit">
                            {t("apply")}
                        </MyButton>
                    </div>
                </form>
            );

        if (modal === ModalTypes.edit_sending_date)
            return (
                <form
                    onSubmit={handleSubmit(handleComplaint())}
                    className={"w-[420px]"}
                >
                    <Header title="edit_date_return">
                        <button onClick={closeModal} className="close" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Header>
                    <div className="p-3">
                        <BaseInput label="date_return">
                            <MainDatePicker
                                showTimeSelect
                                dateFormat="Pp"
                                selected={
                                    !!date_return ? dayjs(date_return).toDate() : undefined
                                }
                                onChange={handleDateReturn}
                            />
                        </BaseInput>

                        <MyButton className="w-full mt-3" htmlType="submit">
                            {t("apply")}
                        </MyButton>
                    </div>
                </form>
            );

        if (modal === ModalTypes.edit_comment)
            return (
                <form
                    onSubmit={handleSubmit(handleComplaint())}
                    className={"w-[420px]"}
                >
                    <Header title="edit_comment">
                        <button onClick={closeModal} className="close" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Header>
                    <div className="p-3">
                        <BaseInput label="comments">
                            <MainTextArea
                                className="!h-[220px]"
                                register={register("comment")}
                            />
                        </BaseInput>

                        <MyButton className="w-full mt-3" htmlType="submit">
                            {t("apply")}
                        </MyButton>
                    </div>
                </form>
            );

        if (modal === ModalTypes.edit_branch)
            return (
                <form
                    onSubmit={handleSubmit(handleComplaint())}
                    className={"w-[420px]"}
                >
                    <Header title="edit_branch">
                        <button onClick={closeModal} className="close" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Header>
                    <div className="p-3">
                        <BaseInput label="branch" className="flex-1">
                            <BranchSelect enabled/>
                        </BaseInput>

                        <MyButton className="w-full mt-3" htmlType="submit">
                            {t("apply")}
                        </MyButton>
                    </div>
                </form>
            );

        if (modal === ModalTypes.add_expense)
            return (
                <div className={"w-[420px]"}>
                    <Header title="add_summ_of_expense">
                        <button onClick={closeModal} className="close" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Header>
                    <Footer className="p-3">
                        <MainInput
                            register={register("expense")}
                            placeholder={"summ"}
                            type="number"
                            className="mb-4"
                        />
                        <MainTextArea register={register("comment")}/>

                        <MyButton
                            btnType={BtnTypes.green}
                            className="w-full mt-3"
                            onClick={() => handleExpense(true)}
                        >
                            {t("save")}
                        </MyButton>
                        <MyButton
                            btnType={BtnTypes.brown}
                            className="w-full mt-3"
                            onClick={() => handleExpense(false)}
                        >
                            {t("close_wothout_expense")}
                        </MyButton>
                    </Footer>
                </div>
            );

        if (modal === ModalTypes.edit_category)
            return (
                <form
                    onSubmit={handleSubmit(handleComplaint())}
                    className={"w-[420px]"}
                >
                    <Header title="edit_category">
                        <button onClick={closeModal} className="close" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Header>

                    <div className="p-3">
                        <BaseInput label="category" className="h-fit">
                            <MainRadioBtns
                                values={subCategs?.items}
                                className="!max-h-40 !overflow-y-auto !h-full"
                                register={register("subcategory_id")}
                            />
                        </BaseInput>

                        <MyButton className="w-full mt-3" htmlType="submit">
                            {t("apply")}
                        </MyButton>
                    </div>
                </form>
            );
    }, [modal, date_purchase, date_return, data, getValues, reset, subCategs]);

    useEffect(() => {
        reset({
            purchase_date: new Date(),
            comment: order?.comment,
            subcategory_id: order?.subcategory_id?.toString(),
        });
        if (order?.date_purchase)
            $date_purchase(dayjs(order.date_purchase).toDate());
        if (order?.date_return) $date_return(dayjs(order.date_return).toDate());
        // reset({ purchase_date: data?.items?.[0]?.date_purchase });
    }, [order]);

    return (
        <Modal
            onClose={() => removeParams(["modal", !!photo ? "photo" : ""])}
            open={!!modal}
            closable={false}
            classNames={{
                content: "!p-0",
            }}
            loading={isPending}
            footer={false}
            className={cl("!h-[400px] !w-min p-1 overflow-y-auto")}
        >
            {/* {renderModal} */}

            {modal === ModalTypes.deny_reason && (
                <form
                    onSubmit={handleSubmit(
                        handleComplaint({
                            status: OrderStatus.denied,
                        })
                    )}
                    className={"w-[420px]"}
                >
                    <Header title="deny_reason">
                        <button onClick={closeModal} className="close" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Header>
                    <div className="p-3">
                        <BaseInput label="select_reason">
                            <MainSelect
                                register={register("fixedReason", {
                                    required: t("required_field"),
                                })}
                            >
                                <option value={undefined}/>

                                {Object.keys(CancelReason).map((item) => (
                                    <option key={item} value={item}>
                                        {t(CancelReason[+item])}
                                    </option>
                                ))}
                            </MainSelect>
                        </BaseInput>

                        {watch("fixedReason") == 4 && (
                            <BaseInput label="comments">
                                <MainTextArea register={register("cancel_reason")}/>
                            </BaseInput>
                        )}

                        <MyButton className="w-full mt-3" htmlType="submit">
                            {t("send")}
                        </MyButton>
                    </div>
                </form>
            )}

            {modal === ModalTypes.edit_purchase_date && (
                <form
                    onSubmit={handleSubmit(handleComplaint())}
                    className={"w-[420px]"}
                >
                    <Header title="edit_purchase_date">
                        <button onClick={closeModal} className="close" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Header>
                    <div className="p-3">
                        <BaseInput label="date_sending_samples">
                            <MainDatePicker
                                showTimeSelect
                                dateFormat="Pp"
                                selected={
                                    !!date_purchase ? dayjs(date_purchase).toDate() : undefined
                                }
                                onChange={handleDatePurchase}
                            />
                        </BaseInput>

                        <MyButton className="w-full mt-3" htmlType="submit">
                            {t("apply")}
                        </MyButton>
                    </div>
                </form>
            )}

            {modal === ModalTypes.edit_sending_date && (
                <form
                    onSubmit={handleSubmit(handleComplaint())}
                    className={"w-[420px]"}
                >
                    <Header title="edit_date_return">
                        <button onClick={closeModal} className="close" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Header>
                    <div className="p-3">
                        <BaseInput label="date_return">
                            <MainDatePicker
                                showTimeSelect
                                dateFormat="Pp"
                                selected={
                                    !!date_return ? dayjs(date_return).toDate() : undefined
                                }
                                onChange={handleDateReturn}
                            />
                        </BaseInput>

                        <MyButton className="w-full mt-3" htmlType="submit">
                            {t("apply")}
                        </MyButton>
                    </div>
                </form>
            )}

            {modal === ModalTypes.edit_comment && (
                <form
                    onSubmit={handleSubmit(handleComplaint())}
                    className={"w-[420px]"}
                >
                    <Header title="edit_comment">
                        <button onClick={closeModal} className="close" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Header>
                    <div className="p-3">
                        <BaseInput label="comments">
                            <MainTextArea
                                className="!h-[220px]"
                                register={register("comment")}
                            />
                        </BaseInput>

                        <MyButton className="w-full mt-3" htmlType="submit">
                            {t("apply")}
                        </MyButton>
                    </div>
                </form>
            )}

            {modal === ModalTypes.edit_branch && (
                <form
                    onSubmit={handleSubmit(handleComplaint())}
                    className={"w-[420px]"}
                >
                    <Header title="edit_branch">
                        <button onClick={closeModal} className="close" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Header>
                    <div className="p-3">
                        <BaseInput label="branch" className="flex-1">
                            <BranchSelect enabled/>
                        </BaseInput>

                        <MyButton className="w-full mt-3" htmlType="submit">
                            {t("apply")}
                        </MyButton>
                    </div>
                </form>
            )}

            {modal === ModalTypes.add_expense && (
                <div className={"w-[420px]"}>
                    <Header title="add_summ_of_expense">
                        <button onClick={closeModal} className="close" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Header>
                    <Footer className="p-3">
                        <MainInput
                            register={register("expense")}
                            placeholder={"summ"}
                            type="number"
                            className="mb-4"
                        />
                        <MainTextArea register={register("comment")}/>

                        <MyButton
                            btnType={BtnTypes.green}
                            className="w-full mt-3"
                            onClick={() => handleExpense(true)}
                        >
                            {t("save")}
                        </MyButton>
                        <MyButton
                            btnType={BtnTypes.brown}
                            className="w-full mt-3"
                            onClick={() => handleExpense(false)}
                        >
                            {t("close_wothout_expense")}
                        </MyButton>
                    </Footer>
                </div>
            )}

            {modal === ModalTypes.edit_category && (
                <form
                    onSubmit={handleSubmit(handleComplaint())}
                    className={"w-[420px]"}
                >
                    <Header title="edit_category">
                        <button onClick={closeModal} className="close" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Header>

                    <div className="p-3">
                        <BaseInput label="category" className="h-fit">
                            <MainRadioBtns
                                values={subCategs?.items}
                                className="!max-h-40 !overflow-y-auto !h-full"
                                register={register("subcategory_id")}
                            />
                        </BaseInput>

                        <MyButton className="w-full mt-3" htmlType="submit">
                            {t("apply")}
                        </MyButton>
                    </div>
                </form>
            )}
        </Modal>
    );
};

export default ComplaintModals;
