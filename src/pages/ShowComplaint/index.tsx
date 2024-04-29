import Button from "@/components/Button";
import Container from "@/components/Container";
import TableViewBtn from "@/components/TableViewBtn";
import {
  BtnTypes,
  CountrySelect,
  GenderType,
  OrderStatus,
  OrderTypeSelect,
} from "@/utils/types";
import { useTranslation } from "react-i18next";
import trashIcon from "/icons/trash.svg";
import useComplaints from "@/hooks/useComplaints";
import { Link, useParams } from "react-router-dom";
import Loading from "@/components/Loader";
import dayjs from "dayjs";
import { dateTimeFormat } from "@/utils/helper";

const ShowComplaint = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, isLoading } = useComplaints({ id: Number(id) });
  const order = data?.items?.[0];

  if (isLoading) return <Loading />;

  return (
    <>
      <Container>
        <div className="w-full flex gap-3">
          <div className="w-full">
            <table className="w-full bordered gray">
              <tbody>
                <tr>
                  <th className="w-60">{t("type")}</th>
                  <td>
                    {t(
                      `${
                        OrderTypeSelect[Number(order?.subcategory?.category_id)]
                      }`
                    )}
                  </td>
                </tr>
                <tr>
                  <th>{t("category")}</th>
                  <td>{order?.subcategory?.name}</td>
                </tr>
                <tr>
                  <th>{t("country")}</th>
                  <td>
                    {CountrySelect[Number(order?.subcategory?.country_id)]}
                  </td>
                </tr>
                <tr>
                  <th>{t("branch")}</th>
                  <td>{order?.branch?.name}</td>
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
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col flex-1">
                        {
                          // !!order?.communication?.length &&
                          [...Array(3)].map((item, idx) => (
                            <div className="mt-2 flex gap-1" key={idx}>
                              <span className="font-bold flex">
                                item.user.full_name:
                              </span>
                              {!!item?.photo && (
                                <span
                                  // onClick={handleShowPhoto(`${baseURL}/${item.photo}`)}
                                  className="cursor-pointer"
                                >
                                  <img
                                    src="/assets/icons/attached.svg"
                                    alt="file"
                                  />
                                </span>
                              )}
                              <span>{order?.comment}</span>
                            </div>
                          ))
                        }
                      </div>

                      <TableViewBtn onClick={() => null} />
                    </div>
                    <div className="relative"></div>
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
                <tr>
                  <th>{t("gender")}</th>
                  <td>{GenderType[Number(order?.client_gender)]}</td>
                </tr>
                <tr>
                  <th>{t("purchase_date")}</th>
                  <td>{dayjs(order?.date_purchase).format(dateTimeFormat)}</td>
                </tr>
                <tr>
                  <th>{t("sending_date")}</th>
                  <td>{dayjs(order?.date_return).format(dateTimeFormat)}</td>
                </tr>
                <tr>
                  <th>{t("created_at")}</th>
                  <td>{dayjs(order?.created_at).format(dateTimeFormat)}</td>
                </tr>
                <tr>
                  <th>{t("author")}</th>
                  <td>author</td>
                </tr>
                <tr>
                  <th>{t("name_table")}</th>
                  <td>{}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end items-center gap-2">
          <Button btnType={BtnTypes.red}>{t("cancel")}</Button>
          <Button btnType={BtnTypes.darkBlue}>{t("receive")}</Button>
          <Button btnType={BtnTypes.green}>{t("to_close")}</Button>
        </div>
      </Container>

      {true && (
        <Container className="flex justify-end w-full !mt-2">
          <div className="flex flex-col ">
            <h3 className="font-bold text-xl mb-3">{t("files")}</h3>
            <ul>
              {[...Array(3)].map((item, idx) => (
                <li key={idx} className="flex items-center p-1 gap-2">
                  <span>image.png</span>
                  <button>
                    <img height={30} width={30} src={trashIcon} alt="delete" />
                  </button>
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
