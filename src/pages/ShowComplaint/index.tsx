import MyButton from "@/components/Button";
import Container from "@/components/Container";
import TableViewBtn from "@/components/TableViewBtn";
import {
  BtnTypes,
  ComplaintsSpheres,
  CountrySelect,
  GenderType,
  ModalTypes,
  OrderStatus,
  OrderTypeSelect,
} from "@/utils/types";
import { useTranslation } from "react-i18next";
import trashIcon from "/icons/trash.svg";
import useComplaints from "@/hooks/useComplaints";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/Loader";
import dayjs from "dayjs";
import { dateTimeFormat } from "@/utils/helper";
import { lazy, useMemo } from "react";
import { baseURL } from "@/api/baseApi";
import complaintsMutation from "@/hooks/mutations/complaints";
import { useNavigateParams } from "@/hooks/custom/useCustomNavigate";
import ComplaintModals from "./modals";
import Header from "@/components/Header";
import { errorToast, successToast } from "@/utils/toast";
import Otkchild from "./Otkchild";
import useQueryString from "@/hooks/custom/useQueryString";

// const ComplaintModals = lazy(() => import("./modals"));

const DisableAction: { [key: number]: boolean } = {
  [OrderStatus.denied]: true,
  [OrderStatus.done]: true,
};

const ShowComplaint = () => {
  const { t } = useTranslation();
  const { id, com_sphere } = useParams();
  const navigate = useNavigate();
  const modal = useQueryString("modal");
  const navigateParams = useNavigateParams();
  const { data, isLoading, refetch } = useComplaints({
    id: Number(id),
    enabled: !!id,
  });
  const order = data?.items?.[0];

  const { mutate, isPending } = complaintsMutation();

  const handleModal = (modal: ModalTypes) => () => navigateParams({ modal });

  const handleStatus = (st: OrderStatus) => {
    mutate(
      {
        [+ComplaintsSpheres[com_sphere! as any] === ComplaintsSpheres.otk
          ? "otk_status"
          : "status"]: st,
        id: Number(id),
      },
      {
        onSuccess: () => {
          refetch();
          successToast("success");
        },
        onError: (e) => errorToast(e.message),
      }
    );
  };

  const handleExpenceMdoal = () => {
    return order?.status === OrderStatus.received &&
      +ComplaintsSpheres[com_sphere! as any] !== ComplaintsSpheres.otk
      ? navigateParams({ modal: ModalTypes.add_expense })
      : handleStatus(OrderStatus.done);
  };

  const renderBtns = useMemo(() => {
    if (
      !DisableAction[
        +ComplaintsSpheres[com_sphere! as any] === ComplaintsSpheres.otk
          ? order?.otk_status!
          : order?.status!
      ]
    )
      return (
        <div className="flex justify-end items-center gap-2 mt-4">
          <MyButton
            btnType={BtnTypes.red}
            onClick={handleModal(ModalTypes.deny_reason)}
          >
            {t("cancel")}
          </MyButton>
          {order?.status === OrderStatus.new ? (
            <MyButton
              btnType={BtnTypes.darkBlue}
              onClick={() => handleStatus(OrderStatus.received)}
            >
              {t("receive")}
            </MyButton>
          ) : (
            <MyButton btnType={BtnTypes.green} onClick={handleExpenceMdoal}>
              {t("to_close")}
            </MyButton>
          )}
        </div>
      );
  }, [order?.status, order?.otk_status]);

  if (isLoading || isPending) return <Loading />;

  return (
    <>
      <Container>
        <ComplaintModals />
        <Header>
          <MyButton onClick={() => navigate(`/complaints/${com_sphere}`)}>
            {t("back")}
          </MyButton>
        </Header>
        <div className="w-full flex gap-3">
          <div className="w-full">
            <table className="w-full bordered gray">
              <tbody>
                <tr>
                  <th className="w-60">{t("type")}</th>
                  <td>{t(`${order?.subcategory?.category?.name}`)}</td>
                </tr>
                <tr>
                  <th>{t("category")}</th>
                  <td>
                    <div className="flex justify-between">
                      <p>{order?.subcategory?.name}</p>
                      <TableViewBtn
                        onClick={handleModal(ModalTypes.edit_category)}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>{t("country")}</th>
                  <td>{CountrySelect[Number(order?.branch?.country_id)]}</td>
                </tr>
                <tr>
                  <th>{t("branch")}</th>
                  <td>
                    <div className="flex justify-between">
                      <p>{order?.branch?.name}</p>
                      <TableViewBtn
                        onClick={handleModal(ModalTypes.edit_branch)}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>{t("name")}</th>
                  <td>{order?.client_name}</td>
                </tr>
                <tr>
                  <th>{t("phone")}</th>
                  <td>
                    <Link
                      to={`tel:${order?.client_number}`}
                      className="text-blue-500"
                    >
                      {order?.client_number}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th>{t("comments")}</th>
                  <td>
                    <div className="flex justify-between">
                      <p
                        style={{
                          width: "90%",
                        }}
                      >
                        {order?.comment}
                      </p>
                      <TableViewBtn
                        onClick={handleModal(ModalTypes.edit_comment)}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full">
            <table className="w-full bordered gray">
              <tbody>
                <tr>
                  <th className="w-60">{t("status")}</th>
                  <td>{t(OrderStatus[Number(order?.status)])}</td>
                </tr>
                {com_sphere === ComplaintsSpheres[ComplaintsSpheres.otk] && (
                  <tr>
                    <th className="w-60">{t("otk_status")}</th>
                    <td>{t(OrderStatus[Number(order?.otk_status)])}</td>
                  </tr>
                )}
                <tr>
                  <th>{t("gender")}</th>
                  <td>{t(GenderType[Number(order?.client_gender)])}</td>
                </tr>
                <tr>
                  <th>{t("purchase_date")}</th>
                  <td>
                    <div className="flex justify-between">
                      <p>
                        {dayjs(order?.date_purchase).format(dateTimeFormat)}
                      </p>
                      <TableViewBtn
                        onClick={handleModal(ModalTypes.edit_purchase_date)}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>{t("sending_date")}</th>
                  <td>
                    <div className="flex justify-between">
                      <p>{dayjs(order?.date_return).format(dateTimeFormat)}</p>
                      <TableViewBtn
                        onClick={handleModal(ModalTypes.edit_sending_date)}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>{t("created_at")}</th>
                  <td>{dayjs(order?.created_at).format(dateTimeFormat)}</td>
                </tr>
                <tr>
                  <th>{t("name_table")}</th>
                  <td>
                    {!!order?.product_name
                      ? order?.product_name
                      : t("not_given")}
                  </td>
                </tr>
                <tr>
                  <th>{t("expence")}</th>
                  <td>{order?.expense ? order?.expense : t("not_given")}</td>
                </tr>
                {!!order?.deny_reason && (
                  <tr>
                    <th>{t("deny_reason")}</th>
                    <td>{order?.deny_reason}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {com_sphere === ComplaintsSpheres[ComplaintsSpheres.otk] && (
          <Otkchild />
        )}

        {renderBtns}
      </Container>

      {!!order?.file.length && (
        <Container className="flex justify-end w-full !mt-2">
          <div className="flex flex-col ">
            <h3 className="font-bold text-xl mb-3">{t("files")}</h3>
            <ul>
              {order?.file.map((item, idx) => (
                <li key={idx}>
                  <Link
                    className="flex items-center p-1 gap-2"
                    to={`${baseURL}/${item.url}`}
                    target="_blank"
                  >
                    <span>image</span>
                    <button>
                      <img
                        height={30}
                        width={30}
                        src={trashIcon}
                        alt="delete"
                      />
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      )}
    </>
  );
};

export default ShowComplaint;
