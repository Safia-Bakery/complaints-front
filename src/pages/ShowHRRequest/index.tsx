import BaseInput from "@/components/BaseInputs";
import MainSelect from "@/components/BaseInputs/MainSelect";
import MainTextArea from "@/components/BaseInputs/MainTextArea";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Header from "@/components/Header";
import Loading from "@/components/Loader";
import Modal from "@/components/Modal";
import {
  useNavigateParams,
  useRemoveParams,
} from "@/hooks/custom/useCustomNavigate";
import useQueryString from "@/hooks/custom/useQueryString";
import hrRequestMutation from "@/hooks/mutations/hrRequest";
import useHRRequests from "@/hooks/useHRRequests";
import { CancelReason, HRStatusOBJ, dateTimeFormat } from "@/utils/helper";
import { errorToast, successToast } from "@/utils/toast";
import {
  BtnTypes,
  HRDeps,
  HRSpheres,
  ModalTypes,
  OrderStatus,
} from "@/utils/types";
import cl from "classnames";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const ShowHRRequest = () => {
  const { t } = useTranslation();
  const { hrdep, id } = useParams();
  const navigate = useNavigate();
  const modal = useQueryString("modal");
  const { register, handleSubmit, watch, getValues } = useForm();
  const removeParams = useRemoveParams();
  const navigateParams = useNavigateParams();

  const closeModal = () => removeParams(["modal"]);

  const { mutate, isPending } = hrRequestMutation();

  const { data, isLoading, refetch } = useHRRequests({
    hrtype: HRDeps[hrdep! as unknown as HRDeps],

    id,
  });

  const request = data?.items?.[0];

  const handleRequst = (st: OrderStatus) => {
    const { fixedReason, cancel_reason } = getValues();
    mutate(
      {
        status: st,
        id: Number(id),
        deny_reason:
          fixedReason < 4 ? t(CancelReason[fixedReason]) : cancel_reason,
      },
      {
        onSuccess: () => {
          successToast("success");
          refetch();
          closeModal();
        },
        onError: (e) => errorToast(e.message),
      }
    );
  };

  if (isLoading) return <Loading />;

  return (
    <Container>
      <div className="flex w-full justify-end mb-4">
        <Button onClick={() => navigate(-1)} btnType={BtnTypes.darkBlue}>
          {t("back")}
        </Button>
      </div>
      <table className="bordered gray w-full">
        <tbody>
          <tr>
            <th>{t("question")}</th>
            <td>{request?.complaint}</td>
          </tr>
          <tr>
            <th>{t("received_at")}</th>
            <td>{dayjs(request?.created_at).format(dateTimeFormat)}</td>
          </tr>
          <tr>
            <th>{t("answer")}</th>
            <td>{request?.complaint}</td>
          </tr>
          <tr>
            <th>{t("status")}</th>
            <td>{t(HRStatusOBJ?.[request?.status!])}</td>
          </tr>
          <tr>
            <th>{t("sphere")}</th>
            <td>{t(HRSpheres[request?.sphere_id!])}</td>
          </tr>
          {request?.deny_reason && (
            <tr>
              <th>{t("deny_reason")}</th>
              <td>{request?.deny_reason}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-end w-full mt-4 gap-3">
        {data?.items?.[0]?.status! === OrderStatus.new && (
          <>
            <Button
              onClick={() => handleRequst(OrderStatus.done)}
              btnType={BtnTypes.green}
            >
              {t("answered")}
            </Button>
            <Button
              onClick={() => navigateParams({ modal: ModalTypes.deny_reason })}
              btnType={BtnTypes.red}
            >
              {t("deny")}
            </Button>
          </>
        )}
      </div>

      <Modal
        onClose={closeModal}
        open={!!modal}
        closable={false}
        maskClosable
        classNames={{
          content: "!p-0",
        }}
        footer={false}
        className={cl("!h-[400px] !w-min p-1 overflow-y-auto")}
      >
        <form
          onSubmit={handleSubmit(() => handleRequst(OrderStatus.denied))}
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
      </Modal>
    </Container>
  );
};

export default ShowHRRequest;
