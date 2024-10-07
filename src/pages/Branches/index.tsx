import Container from "@/components/Container";
import Loading from "@/components/Loader";
import TableViewBtn from "@/components/TableViewBtn";
import useQueryString from "@/hooks/custom/useQueryString";
import { handleIdx } from "@/utils/helper";
import { BranchType, BtnTypes } from "@/utils/types";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import MyButton from "@/components/Button";
import useBranches from "@/hooks/useBranches";
import AntdTable from "@/components/AntdTable";
import Table, { ColumnsType } from "antd/es/table";
import BranchFilter from "./filter";

const Branches = () => {
  const { t } = useTranslation();
  const page = Number(useQueryString("page")) || 1;
  const name = useQueryString("name");
  const status = useQueryString("status");
  const navigate = useNavigate();

  const { data, isLoading } = useBranches({
    page,
    size: 50,
    name,
    ...(!!status && { status: Number(status) }),
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

  const renderFilter = useMemo(() => {
    return (
      <Table.Summary fixed={"top"}>
        <Table.Summary.Row>
          <BranchFilter />
        </Table.Summary.Row>
      </Table.Summary>
    );
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Container>
      <div className="flex justify-between items-end">
        <div />
        <div className="flex gap-2 mb-3">
          <MyButton
            onClick={() => navigate(`add?page=${page}`)}
            btnType={BtnTypes.black}
          >
            {t("add")}
          </MyButton>
        </div>
      </div>

      <AntdTable
        columns={columns}
        data={data?.items}
        rowClassName={"text-center"}
        totalItems={data?.total}
        summary={() => renderFilter}
      />
    </Container>
  );
};

export default Branches;
