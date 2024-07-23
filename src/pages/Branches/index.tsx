import Container from "@/components/Container";
import Loading from "@/components/Loader";
import TableViewBtn from "@/components/TableViewBtn";
import VirtualTable from "@/components/VirtualTable";
import useQueryString from "@/hooks/custom/useQueryString";
import { handleIdx } from "@/utils/helper";
import { BranchType, BtnTypes } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import Pagination from "@/components/Pagination";
import useBranches from "@/hooks/useBranches";

const Branches = () => {
  const { t } = useTranslation();
  const page = Number(useQueryString("page")) || 1;
  const navigate = useNavigate();

  const { data, isLoading } = useBranches({
    page,
    size: 50,
  });

  const columns = useMemo<ColumnDef<BranchType>[]>(
    () => [
      {
        cell: ({ row }) => handleIdx(row.index),
        header: "№",
        size: 5,
      },

      {
        accessorKey: "name",
        header: t("name_table"),
      },
      {
        accessorKey: "status",
        header: t("status"),
        cell: ({ row }) =>
          !!row.original?.status ? t("active") : t("inactive"),
      },
      {
        accessorKey: "action",
        header: "",
        size: 1,
        cell: ({ row }) => (
          <Link className="w-18" to={`${row.original.id}`}>
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
        {/* <ItemsCount data={data} /> */}
        <div className="" />
        <div className="flex gap-2 mb-3">
          <Button onClick={() => navigate("add")} btnType={BtnTypes.black}>
            {t("add")}
          </Button>
        </div>
      </div>
      <VirtualTable
        columns={columns}
        data={data?.items}
        rowClassName={"text-center"}
      />

      <Pagination totalPages={data?.pages} />
    </Container>
  );
};

export default Branches;
