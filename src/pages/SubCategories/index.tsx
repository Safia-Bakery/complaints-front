import Container from "@/components/Container";
import Loading from "@/components/Loader";
import TableViewBtn from "@/components/TableViewBtn";
import useQueryString from "@/hooks/custom/useQueryString";
import { handleIdx } from "@/utils/helper";
import { BtnTypes, SubCategoryType } from "@/utils/types";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import MyButton from "@/components/Button";
import useSubCategories from "@/hooks/useSubCategories";
import AntdTable from "@/components/AntdTable";
import { ColumnsType } from "antd/es/table";

const SubCategories = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const page = Number(useQueryString("page")) || 1;
  const navigate = useNavigate();

  const { data, isLoading } = useSubCategories({
    page,
    category_id: id,
  });

  const columns = useMemo<ColumnsType<SubCategoryType>>(
    () => [
      {
        render: (_, r, index) => handleIdx(index),
        title: "№",
        width: 50,
      },

      {
        dataIndex: "name",
        title: t("name_table"),
      },

      {
        dataIndex: "code",
        title: t("code"),
      },
      {
        dataIndex: "status",
        title: t("status"),
        render: (_, record) => (!!record?.status ? t("active") : t("inactive")),
      },
      {
        dataIndex: "action",
        title: t(""),
        width: 50,
        render: (_, record) => (
          <Link className="w-18" to={`${record.id}`}>
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
          <MyButton onClick={() => navigate("add")} btnType={BtnTypes.black}>
            {t("add")}
          </MyButton>
        </div>
      </div>
      <AntdTable
        columns={columns}
        data={data?.items}
        totalItems={data?.total}
        rowClassName={"text-center"}
      />
    </Container>
  );
};

export default SubCategories;
