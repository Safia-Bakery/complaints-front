import Button from "@/components/Button";
import Container from "@/components/Container";
import TableViewBtn from "@/components/TableViewBtn";
import { BtnTypes } from "@/utils/types";
import { useTranslation } from "react-i18next";
import trashIcon from "/icons/trash.svg";

const ShowComplaint = () => {
  const { t } = useTranslation();
  return (
    <>
      <Container>
        <div className="w-full flex gap-3">
          <div className="w-full">
            <table className="w-full bordered gray">
              <tbody>
                <tr>
                  <th className="w-60">{t("type")}</th>
                  <td>{t("service")}</td>
                </tr>
                <tr>
                  <th>{t("category")}</th>
                  <td>{t("service")}</td>
                </tr>
                <tr>
                  <th>{t("country")}</th>
                  <td>{t("service")}</td>
                </tr>
                <tr>
                  <th>{t("branch")}</th>
                  <td>{t("service")}</td>
                </tr>
                <tr>
                  <th>{t("name")}</th>
                  <td>{t("service")}</td>
                </tr>
                <tr>
                  <th>{t("phone")}</th>
                  <td>{t("service")}</td>
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
                              <span>item.message</span>
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
                  <td>{t("service")}</td>
                </tr>
                <tr>
                  <th>{t("gender")}</th>
                  <td>{t("service")}</td>
                </tr>
                <tr>
                  <th>{t("purchase_date")}</th>
                  <td>{t("service")}</td>
                </tr>
                <tr>
                  <th>{t("sending_date")}</th>
                  <td>{t("service")}</td>
                </tr>
                <tr>
                  <th>{t("created_at")}</th>
                  <td>{t("service")}</td>
                </tr>
                <tr>
                  <th>{t("author")}</th>
                  <td>{t("service")}</td>
                </tr>
                <tr>
                  <th>{t("name_table")}</th>
                  <td>{t("service")}</td>
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
