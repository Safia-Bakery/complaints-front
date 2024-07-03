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
  BranchJsonVal,
  BtnTypes,
  ComplaintType,
  CountrySelect,
  OrderTypeSelect,
} from "@/utils/types";
import { Link, useNavigate, useParams } from "react-router-dom";
import useComplaints, { ComplaintsParams } from "@/hooks/useComplaints";
import Loading from "@/components/Loader";
import Pagination from "@/components/Pagination";
import dayjs from "dayjs";
import { dateTimeFormat } from "@/utils/helper";
import useQueryString from "@/hooks/custom/useQueryString";

const Complaints = (filter: ComplaintsParams) => {
  const { t } = useTranslation();
  const { com_sphere } = useParams();
  const navigate = useNavigate();
  const id = useQueryString("id");
  const country_id = useQueryString("country_id");
  const category_id = useQueryString("category_id");
  const subcategory_id = useQueryString("subcategory_id");
  const client_name = useQueryString("client_name");
  const phone_number = useQueryString("phone_number");
  const expense = useQueryString("expense");
  const updated_by = useQueryString("updated_by");
  const status = Number(useQueryString("status"));
  const created_at = useQueryString("created_at");
  const branchJson = useQueryString("branch");
  const branch: BranchJsonVal = branchJson && JSON.parse(branchJson);

  const { data, isLoading, isPending } = useComplaints({
    ...filter,
    ...(!!id && { id }),
    ...(!!country_id && { country_id }),
    ...(!!category_id && { category_id }),
    ...(!!subcategory_id && { subcategory_id }),
    ...(!!client_name && { client_name }),
    ...(!!phone_number && { phone_number }),
    ...(!!expense && { expense }),
    ...(!!updated_by && { updated_by }),
    ...(!!created_at && { created_at }),
    ...(!!branch?.id && { branch_id: branch.id }),
    ...(!!status && { status }),
    ...(!!com_sphere && { [com_sphere]: 1 }),
  });

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
          CountrySelect[Number(row.original?.branch?.country_id)],
      },
      {
        accessorKey: "subcategory",
        header: t("type"),
        cell: ({ row }) =>
          t(OrderTypeSelect[Number(row.original?.subcategory?.category_id)]),
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
      {isPending && <Loading />}
      <div className="flex justify-between items-end">
        <ItemsCount data={data} />
        <div className="flex gap-2 mb-3">
          <Button onClick={() => navigate("add")} btnType={BtnTypes.black}>
            {t("add")}
          </Button>
          <Button btnType={BtnTypes.green}>Excel</Button>
        </div>
      </div>
      <VirtualTable columns={columns} data={data?.items} extraHeight={220}>
        {renderFilter}
      </VirtualTable>

      <Pagination totalPages={data?.pages} />
    </Container>
  );
};

export default Complaints;
