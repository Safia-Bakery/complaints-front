import Container from "@/components/Container";
import Loading from "@/components/Loader";
import TableViewBtn from "@/components/TableViewBtn";
import useQueryString from "@/hooks/custom/useQueryString";
import { handleIdx } from "@/utils/helper";
import { BtnTypes, HRQaType, HRSpheres } from "@/utils/types";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import useHRQa from "@/hooks/useHRQa";
import MyButton from "@/components/Button";
import AntdTable from "@/components/AntdTable";
import { ColumnsType } from "antd/es/table";

const HRQa = () => {
  const { sphere } = useParams();
  const { t } = useTranslation();
  const page = Number(useQueryString("page")) || 1;
  const navigate = useNavigate();

  const { data, isLoading } = useHRQa({
    sphere_id: HRSpheres[sphere! as unknown as HRSpheres],
    page,
  });

  const columns = useMemo<ColumnsType<HRQaType>>(
    () => [
      {
        render: (_, r, index) => handleIdx(index),
        title: "№",
        width: 50,
      },

      {
        dataIndex: "question_ru",
        title: t("question"),
        width: 250,
      },

      {
        dataIndex: "answer_ru",
        title: t("answer"),
      },
      {
        dataIndex: "status",
        title: t("status"),
        width: 150,
        render: (_, record) => (
          <p className="text-center w-full">
            {!!record?.status ? t("active") : t("inactive")}
          </p>
        ),
      },
      {
        dataIndex: "action",
        title: t(""),
        width: 50,
        render: (_, record) => (
          <Link className="w-18" to={`edit/${record.id}`}>
            <TableViewBtn />
          </Link>
        ),
      },
    ],
    []
  );

  if (isLoading) return <Loading />;

  return (
    <Container>
      <div className="flex justify-between items-end">
        <div />
        <div className="flex gap-2 mb-3">
          <MyButton
            onClick={() => navigate("edit/add")}
            btnType={BtnTypes.black}
          >
            {t("add")}
          </MyButton>
        </div>
      </div>
      <AntdTable
        columns={columns}
        data={data?.items}
        totalItems={data?.total}
      />
    </Container>
  );
};

export default HRQa;
