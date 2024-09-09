import Container from "@/components/Container";
import Loading from "@/components/Loader";
import TableViewBtn from "@/components/TableViewBtn";
import { handleIdx } from "@/utils/helper";
import { BtnTypes, RoleTypes } from "@/utils/types";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import useRoles from "@/hooks/useRoles";
import AntdTable from "@/components/AntdTable";
import { ColumnsType } from "antd/es/table";

const Roles = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, isLoading } = useRoles({});

  const columns = useMemo<ColumnsType<RoleTypes>>(
    () => [
      {
        render: (_, r, index) => handleIdx(index),
        title: "№",
        width: 50,
      },

      {
        dataIndex: "name",
        title: t("name_table"),
        render: (_, record) => (
          <Link className="w-18 text-blue-400" to={`/permissions/${record.id}`}>
            {record.name}
          </Link>
        ),
      },
      {
        dataIndex: "status",
        title: t("status"),
        render: (_, record) => (!!record?.status ? t("active") : t("inactive")),
      },
      {
        dataIndex: "action",
        title: "",
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
        <div className="" />
        <div className="flex gap-2 mb-3">
          <Button onClick={() => navigate("add")} btnType={BtnTypes.black}>
            {t("add")}
          </Button>
        </div>
      </div>
      <AntdTable
        columns={columns}
        data={data?.items}
        rowClassName={"text-center"}
      />
    </Container>
  );
};

export default Roles;
