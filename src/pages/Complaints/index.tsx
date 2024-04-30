import VirtualTable from "@/components/VirtualTable";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import ComplaintsFilter from "./filter";
import Container from "@/components/Container";
import StatusBlock from "@/components/StatusBlock";
import ItemsCount from "@/components/ItemsCount";
import Button from "@/components/Button";
import {
  BtnTypes,
  ComplaintType,
  CountrySelect,
  OrderTypeSelect,
} from "@/utils/types";
import { Link, useNavigate } from "react-router-dom";
import useComplaints from "@/hooks/useComplaints";
import Loading from "@/components/Loader";
import Pagination from "@/components/Pagination";
import dayjs from "dayjs";
import { dateTimeFormat } from "@/utils/helper";

const Complaints = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, isLoading } = useComplaints({});

  const columns = useMemo<ColumnDef<ComplaintType>[]>(
    () => [
      {
        accessorFn: (_, idx) => idx + 1,
        cell: (props) => <div className="w-4">{props.row.index + 1}</div>,
        header: "№",
        size: 10,
      },
      {
        accessorKey: "id",
        header: t("name_in_table"),
        cell: ({ row }) => (
          <Link className="text-blue-500" to={`${row.original.id}`}>
            {row.original.id}
          </Link>
        ),
      },
      {
        accessorKey: "country",
        header: t("country"),
        cell: ({ row }) =>
          CountrySelect[Number(row.original?.subcategory?.country_id)],
      },
      {
        accessorKey: "subcategory",
        header: t("type"),
        cell: ({ row }) =>
          OrderTypeSelect[Number(row.original?.subcategory?.category_id)],
      },
      {
        accessorKey: "category",
        header: t("category"),
        cell: ({ row }) => row.original?.subcategory?.name,
      },
      {
        accessorKey: "branch",
        header: t("branch"),
        cell: ({ row }) => row.original?.branch?.name,
      },
      {
        accessorKey: "client_name",
        header: t("name"),
      }, //numberWithCommas
      {
        accessorKey: "client_number",
        header: t("phone"),
      },
      {
        accessorKey: "created_at",
        header: t("created_at"),
        cell: ({ row }) =>
          dayjs(row.original?.created_at).format(dateTimeFormat),
      },
      {
        accessorKey: "expence",
        header: t("expence"),
        // cell: ({ row }) => numberWithCommas(row.original.autonumber),
      },
      {
        accessorKey: "author",
        header: t("author"),
      },
      {
        accessorKey: "status",
        header: t("status"),
        cell: ({ row }) => <StatusBlock status={row.original.status} />,
      },
    ],
    []
  );

  const renderFilter = useMemo(() => {
    return <ComplaintsFilter />;
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Container>
      <div className="flex justify-between items-end">
        <ItemsCount data={data} />
        <div className="flex gap-2 mb-3">
          <Button onClick={() => navigate("add")} btnType={BtnTypes.black}>
            {t("add")}
          </Button>
          <Button btnType={BtnTypes.green}>Excel</Button>
        </div>
      </div>
      <VirtualTable columns={columns} data={data?.items}>
        {renderFilter}
      </VirtualTable>

      <Pagination totalPages={data?.pages} />
    </Container>
  );
};

export default Complaints;
