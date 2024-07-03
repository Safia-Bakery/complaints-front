import Container from "@/components/Container";
import Loading from "@/components/Loader";
import TableViewBtn from "@/components/TableViewBtn";
import VirtualTable from "@/components/VirtualTable";
import useQueryString from "@/hooks/custom/useQueryString";
import { handleIdx } from "@/utils/helper";
import { BtnTypes, HRQaType, HRSpheres } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import useHRQa from "@/hooks/useHRQa";
import ItemsCount from "@/components/ItemsCount";
import Button from "@/components/Button";

const HRQa = () => {
  const { sphere } = useParams();
  const { t } = useTranslation();
  const page = Number(useQueryString("page")) || 1;
  const navigate = useNavigate();

  const { data, isLoading } = useHRQa({
    sphere_id: HRSpheres[sphere! as unknown as HRSpheres],
    page,
  });

  const columns = useMemo<ColumnDef<HRQaType>[]>(
    () => [
      {
        cell: ({ row }) => handleIdx(row.index),
        header: "№",
        size: 5,
      },

      {
        accessorKey: "question_ru",
        header: t("question"),
      },

      {
        accessorKey: "answer_ru",
        header: t("answer"),
      },
      {
        accessorKey: "status",
        header: t("status"),

        cell: ({ row }) => (
          <p className="text-center w-full">
            {!!row.original?.status ? t("active") : t("inactive")}
          </p>
        ),
      },
      {
        accessorKey: "action",
        header: t(""),
        size: 1,
        cell: ({ row }) => (
          <Link className="w-18" to={`edit/${row.original.id}`}>
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
        <ItemsCount data={data} />
        <div className="flex gap-2 mb-3">
          <Button onClick={() => navigate("add")} btnType={BtnTypes.black}>
            {t("add")}
          </Button>
        </div>
      </div>
      {data?.items && <VirtualTable columns={columns} data={data?.items} />}
    </Container>
  );
};

export default HRQa;
