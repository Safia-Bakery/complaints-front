import BaseInput from "@/components/BaseInputs";
import MainDatePicker from "@/components/BaseInputs/MainDatePicker";
import MainInput from "@/components/BaseInputs/MainInput";
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
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const ComplaintModals = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const removeParams = useRemoveParams();
  const modal = Number(useQueryString("modal")) as ModalTypes;
  const photo = useQueryString("photo");
  const { refetch } = useComplaints({ id: Number(id) });

  const { mutate, isPending } = complaintsMutation();

  const closeModal = () => removeParams(["modal"]);

  const { getValues, register, handleSubmit, watch } = useForm();

  const handleComplaint = (body?: ComplaintsBody) => () => {
    const { fixedReason, cancel_reason } = getValues();
    mutate(
      {
        id: Number(id),
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
              <BaseInput label="purchase_date">
                <MainInput register={register("purchase_date")} type="date" />
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
