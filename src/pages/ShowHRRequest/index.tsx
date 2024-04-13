import Button from "@/components/Button";
import Container from "@/components/Container";
import { BtnTypes } from "@/utils/types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ShowHRRequest = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
            <td>
              Chetdan kelgan ishchilar un domlar qurilib unda unda ishchilar
              Safiyada belgilangan pul miqdorini to'lab yashash
            </td>
          </tr>
          <tr>
            <th>{t("received_at")}</th>
            <td>
              Chetdan kelgan ishchilar un domlar qurilib unda unda ishchilar
              Safiyada belgilangan pul miqdorini to'lab yashash
            </td>
          </tr>
          <tr>
            <th>{t("answer")}</th>
            <td>
              Chetdan kelgan ishchilar un domlar qurilib unda unda ishchilar
              Safiyada belgilangan pul miqdorini to'lab yashash
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

export default ShowHRRequest;
