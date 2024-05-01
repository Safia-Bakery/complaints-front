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
import { ModalTypes, OrderStatus } from "@/utils/types";
import cl from "classnames";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

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

  const closeModal = () => removeParams(["modal"]);

  const { getValues, register, handleSubmit, watch, reset } = useForm();

  const handleComplaint = (body?: ComplaintsBody) => () => {
    const { fixedReason, cancel_reason } = getValues();
    mutate(
      {
        id: Number(id),
        ...(!!date_return && { date_return: date_return?.toISOString() }),
        ...(!!date_purchase && { date_purchase: date_purchase?.toISOString() }),
        deny_reason:
          fixedReason < 4 ? t(CancelReason[fixedReason]) : cancel_reason,
        ...body,
      },
      {
        onSuccess: () => {
          refetch();
          successToast("success");
          closeModal();
        },
        onError: (e) => errorToast(e.message),
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
