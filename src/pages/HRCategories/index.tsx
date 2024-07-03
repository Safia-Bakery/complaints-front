import Container from "@/components/Container";
import Loading from "@/components/Loader";
import TableViewBtn from "@/components/TableViewBtn";
import VirtualTable from "@/components/VirtualTable";
import { handleIdx } from "@/utils/helper";
import { BtnTypes, CategoriesType, HRSpheres } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "@/components/Button";
import useHrCategories from "@/hooks/useHrCategories";

const HRCategories = () => {
  const { t } = useTranslation();
  const { sphere } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useHrCategories({
    hrsphere_id: +HRSpheres[sphere as any],
  });

  const columns = useMemo<ColumnDef<CategoriesType>[]>(
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
    </Container>
  );
};

export default HRCategories;
