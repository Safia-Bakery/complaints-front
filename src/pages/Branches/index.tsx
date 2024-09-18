import Container from "@/components/Container";
import Loading from "@/components/Loader";
import TableViewBtn from "@/components/TableViewBtn";
import useQueryString from "@/hooks/custom/useQueryString";
import { handleIdx } from "@/utils/helper";
import { BranchType, BtnTypes } from "@/utils/types";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import useBranches from "@/hooks/useBranches";
import AntdTable from "@/components/AntdTable";
import { ColumnsType } from "antd/es/table";

const Branches = () => {
  const { t } = useTranslation();
  const page = Number(useQueryString("page")) || 1;
  const navigate = useNavigate();

  const { data, isLoading } = useBranches({
    page,
    size: 50,
  });

  const columns = useMemo<ColumnsType<BranchType>>(
    () => [
      {
        render: (_, r, index) => handleIdx(index),
        title: "№",
        width: 50,
        className: "!p-0",
      },

      {
        dataIndex: "name",
        title: t("name_table"),
      },
      {
        title: t("status"),
        dataIndex: "status",
        render: (_, record) => (!!record.status ? t("active") : t("inactive")),
      },
      {
        dataIndex: "action",
        title: "",
        width: 50,
        className: "!p-1",
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
          <Button
            onClick={() => navigate(`add?page=${page}`)}
            btnType={BtnTypes.black}
          >
            {t("add")}
          </Button>
        </div>
      </div>

      <AntdTable
        columns={columns}
        data={data?.items}
        rowClassName={"text-center"}
        totalItems={data?.total}
      />
    </Container>
  );
};

export default Branches;
