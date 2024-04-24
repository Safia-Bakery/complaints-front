import Button from "@/components/Button";
import Container from "@/components/Container";
import Loading from "@/components/Loader";
import useHRRequests from "@/hooks/useHRRequests";
import { HRStatusOBJ, dateTimeFormat } from "@/utils/helper";
import { BtnTypes, HRDeps, HRSpheres } from "@/utils/types";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const ShowHRRequest = () => {
  const { t } = useTranslation();
  const { hrdep, id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useHRRequests({
    hrtype: HRDeps[hrdep! as unknown as HRDeps],
    id,
  });

  const request = data?.items?.[0];

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
        </tbody>
      </table>

      <div className="flex justify-end w-full mt-4 gap-3">
        <Button btnType={BtnTypes.green}>{t("answered")}</Button>
        <Button btnType={BtnTypes.red}>{t("deny")}</Button>
      </div>
    </Container>
  );
};

export default ShowHRRequest;
