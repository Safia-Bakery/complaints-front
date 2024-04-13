import Container from "@/components/Container";
import HrSelectBtn from "./HrSelectBtn";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { HRDeps } from "@/utils/types";

const HRDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sphere } = useParams();

  const handleNavigate = (url: string) => () =>
    navigate(`/hr-dashboard/${sphere}/${url}`);

  if (!sphere) return;
  return (
    <>
      <Container className="flex gap-14">
        <HrSelectBtn onClick={handleNavigate(`${HRDeps[HRDeps.qa]}`)}>
          {t("qa")}
        </HrSelectBtn>
        <HrSelectBtn onClick={handleNavigate(`${HRDeps[HRDeps.questions]}`)}>
          {t("questions")}
        </HrSelectBtn>
        <div className="flex flex-col gap-2 flex-1">
          <HrSelectBtn
            onClick={handleNavigate(`${HRDeps[HRDeps.complaints]}`)}
            className="min-h-24"
          >
            {t("complaints")}
          </HrSelectBtn>
          <HrSelectBtn onClick={handleNavigate(`${HRDeps[HRDeps.categories]}`)}>
            {t("categories")}
          </HrSelectBtn>
        </div>
        <HrSelectBtn onClick={handleNavigate(`${HRDeps[HRDeps.suggestions]}`)}>
          {t("suggestions")}
        </HrSelectBtn>
      </Container>
      <Container className="!mt-1">s</Container>
    </>
  );
};

export default HRDashboard;
