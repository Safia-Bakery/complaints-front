import BaseInput from "@/components/BaseInputs";
import MainDatePicker from "@/components/BaseInputs/MainDatePicker";
import MainSelect from "@/components/BaseInputs/MainSelect";
import MainTextArea from "@/components/BaseInputs/MainTextArea";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Loading from "@/components/Loader";
import Modal from "@/components/Modal";
import { useRemoveParams } from "@/hooks/custom/useCustomNavigate";
import useQueryString from "@/hooks/custom/useQueryString";
import complaintsMutation, {
  ComplaintsBody,
} from "@/hooks/mutations/complaints";
import useComplaints from "@/hooks/useComplaints";
import { CancelReason } from "@/utils/helper";
import { errorToast, successToast } from "@/utils/toast";
import {
  BranchJsonVal,
  BtnTypes,
  ModalTypes,
  OrderStatus,
} from "@/utils/types";
import cl from "classnames";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import BranchSelect from "@/components/BranchSelect";
import useSubCategories from "@/hooks/useSubCategories.ts";
import MainRadioBtns from "@/components/BaseInputs/MainRadioBtns.tsx";
import MainInput from "@/components/BaseInputs/MainInput";

const ComplaintModals = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const removeParams = useRemoveParams();
  const modal = Number(useQueryString("modal")) as ModalTypes;
  const photo = useQueryString("photo");
  const [date_purchase, $date_purchase] = useState<Date>();
  const [date_return, $date_return] = useState<Date>();

  const { refetch, data } = useComplaints({ id: Number(id) });
  const order = data?.items?.[0];

  const { mutate, isPending } = complaintsMutation();

  const branchJson = useQueryString("branch");
  const branch: BranchJsonVal = branchJson && JSON.parse(branchJson);

  const closeModal = () => removeParams(["modal"]);

  const { getValues, register, handleSubmit, watch, reset } = useForm();

  const { data: subCategs, isFetching: subCategFetching } = useSubCategories({
    status: 1,
    category_id: watch("categ"),
  });

  const handleExpense = (has_expense: boolean) => {
    const { comment, expense } = getValues();
    if (has_expense && !expense) return;
    else
      mutate(
        {
          id: Number(id),
          ...(comment && comment !== "" && { comment }),
          ...(has_expense && expense && { expense: +expense }),
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

  const handleComplaint = (body?: ComplaintsBody) => () => {
    const { fixedReason, cancel_reason, comment, subcategory_id, expense } =
      getValues();

    mutate(
      {
        id: Number(id),
        ...(!!date_return && { date_return: date_return?.toISOString() }),
        ...(!!date_purchase && {
          date_purchase: date_purchase?.toISOString(),
        }),
        deny_reason:
          fixedReason < 4 ? t(CancelReason[fixedReason]) : cancel_reason,

        ...(comment && comment !== "" && { comment }),
        ...(subcategory_id && { subcategory_id }),
        ...(expense && { expense: +expense }),
        ...(!!branch?.id && { branch_id: branch.id }),
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

  useEffect(() => {
    reset({ purchase_date: new Date() });
    // reset({ purchase_date: data?.items?.[0]?.date_purchase });
  }, []);

  const renderModal = () => {
    switch (modal) {
      case ModalTypes.deny_reason:
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
              <button onClick={closeModal} className="close">
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
                  <option value={undefined} />

                  {Object.keys(CancelReason).map((item) => (
                    <option key={item} value={item}>
                      {t(CancelReason[+item])}
                    </option>
                  ))}
                </MainSelect>
              </BaseInput>

              {watch("fixedReason") == 4 && (
                <BaseInput label="comments">
                  <MainTextArea register={register("cancel_reason")} />
                </BaseInput>
              )}

              <Button className="w-full mt-3" type="submit">
                {t("send")}
              </Button>
            </div>
          </form>
        );

      case ModalTypes.edit_purchase_date:
        return (
          <form
            onSubmit={handleSubmit(handleComplaint())}
            className={"w-[420px]"}
          >
            <Header title="edit_purchase_date">
              <button onClick={closeModal} className="close">
                <span aria-hidden="true">&times;</span>
              </button>
            </Header>
            <div className="p-3">
              <BaseInput label="date_sending_samples">
                <MainDatePicker
                  showTimeSelect
                  dateFormat="Pp"
                  selected={
                    !!date_purchase || order?.date_purchase
                      ? dayjs(date_purchase || order?.date_purchase).toDate()
                      : undefined
                  }
                  onChange={handleDatePurchase}
                />
              </BaseInput>

              <Button className="w-full mt-3" type="submit">
                {t("apply")}
              </Button>
            </div>
          </form>
        );

      case ModalTypes.edit_sending_date:
        return (
          <form
            onSubmit={handleSubmit(handleComplaint())}
            className={"w-[420px]"}
          >
            <Header title="edit_date_return">
              <button onClick={closeModal} className="close">
                <span aria-hidden="true">&times;</span>
              </button>
            </Header>
            <div className="p-3">
              <BaseInput label="date_return">
                <MainDatePicker
                  showTimeSelect
                  dateFormat="Pp"
                  selected={
                    !!date_return || order?.date_return
                      ? dayjs(date_return || order?.date_return).toDate()
                      : undefined
                  }
                  onChange={handleDateReturn}
                />
              </BaseInput>

              <Button className="w-full mt-3" type="submit">
                {t("apply")}
              </Button>
            </div>
          </form>
        );

      case ModalTypes.edit_comment:
        return (
          <form
            onSubmit={handleSubmit(handleComplaint())}
            className={"w-[420px]"}
          >
            <Header title="edit_comment">
              <button onClick={closeModal} className="close">
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

              <Button className="w-full mt-3" type="submit">
                {t("apply")}
              </Button>
            </div>
          </form>
        );

      case ModalTypes.edit_branch:
        return (
          <form
            onSubmit={handleSubmit(handleComplaint())}
            className={"w-[420px]"}
          >
            <Header title="edit_branch">
              <button onClick={closeModal} className="close">
                <span aria-hidden="true">&times;</span>
              </button>
            </Header>
            <div className="p-3">
              <BaseInput label="branch" className="flex-1">
                <BranchSelect enabled />
              </BaseInput>

              <Button className="w-full mt-3" type="submit">
                {t("apply")}
              </Button>
            </div>
          </form>
        );

      case ModalTypes.add_expense:
        return (
          <div className={"w-[420px]"}>
            <Header title="add_summ_of_expense">
              <button onClick={closeModal} className="close">
                <span aria-hidden="true">&times;</span>
              </button>
            </Header>
            <div className="p-3">
              <MainInput
                register={register("expense")}
                placeholder={"summ"}
                type="number"
                className="mb-4"
              />
              <MainTextArea register={register("comment")} />

              <Button
                btnType={BtnTypes.green}
                className="w-full mt-3"
                onClick={() => handleExpense(true)}
              >
                {t("save")}
              </Button>
              <Button
                btnType={BtnTypes.brown}
                className="w-full mt-3"
                onClick={() => handleExpense(false)}
              >
                {t("close_wothout_expense")}
              </Button>
            </div>
          </div>
        );

      case ModalTypes.edit_category:
        return (
          <form
            onSubmit={handleSubmit(handleComplaint())}
            className={"w-[420px]"}
          >
            <Header title="edit_category">
              <button onClick={closeModal} className="close">
                <span aria-hidden="true">&times;</span>
              </button>
            </Header>

            <div className="p-3">
              <BaseInput label="category">
                <MainRadioBtns
                  values={subCategs?.items}
                  register={register("subcategory_id")}
                />
              </BaseInput>

              <Button className="w-full mt-3" type="submit">
                {t("apply")}
              </Button>
            </div>
          </form>
        );

      default:
        break;
    }
  };

  return (
    <Modal
      onClose={() => removeParams(["modal", !!photo ? "photo" : ""])}
      isOpen={!!modal}
      className={cl("!h-[400px] w-min p-1 overflow-y-auto")}
    >
      {renderModal()}
      {isPending && <Loading />}
    </Modal>
  );
};

export default ComplaintModals;
