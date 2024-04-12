import VirtualTable from "@/components/VirtualTable";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import ComplaintsFilter from "./filter";
import Container from "@/components/Container";
import StatusBlock from "@/components/StatusBlock";
import { numberWithCommas } from "@/utils/helper";
import ItemsCount from "@/components/ItemsCount";
import Button from "@/components/Button";
import { BtnTypes } from "@/utils/types";
import { Link, useNavigate } from "react-router-dom";

type MockDataType = {
  id: number;
  country: string;
  type: string;
  category: string;
  branch: string;
  name: string;
  phone: string;
  created_at: string;
  expence: number;
  author: string;
  status: number;
};

const mockData = {
  items: [
    {
      id: 1,
      country: "KZ",
      type: "service",
      category: "Касса",
      branch: "Паркентский",
      name: "Толиб",
      phone: "+998933696969",
      created_at: "28.03.2024 12:44",
      expence: 230000,
      author: "Хужаазиз",
      status: 0,
    },
    {
      id: 2,
      country: "UZB",
      type: "Качество",
      category: "Цех",
      branch: "ЦУМ",
      name: "Толиб",
      phone: "+998933696969",
      created_at: "28.03.2024 12:44",
      expence: 230000,
      author: "Хужаазиз",
      status: 1,
    },
  ],
  page: 1,
  pages: 1,
  size: 50,
  total: 24,
};

const Complaints = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = useMemo<ColumnDef<MockDataType>[]>(
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
            {row.index + 1}
          </Link>
        ),
      },
      {
        accessorKey: "country",
        header: t("country"),
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "type",
        header: t("type"),
      },
      {
        accessorKey: "category",
        header: t("category"),
      },
      {
        accessorKey: "branch",
        header: t("branch"),
      },
      {
        accessorKey: "name",
        header: t("name"),
      }, //numberWithCommas
      {
        accessorKey: "phone",
        header: t("phone"),
      },
      {
        accessorKey: "created_at",
        header: t("created_at"),
      },
      {
        accessorKey: "expence",
        header: t("expence"),
        cell: ({ row }) => numberWithCommas(row.original.expence),
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

  return (
    <Container>
      <div className="flex justify-between items-end">
        <ItemsCount data={mockData} />
        <div className="flex gap-2 mb-3">
          <Button onClick={() => navigate("add")} btnType={BtnTypes.black}>
            {t("add")}
          </Button>
          <Button btnType={BtnTypes.green}>Excel </Button>
        </div>
      </div>
      <VirtualTable columns={columns} data={mockData?.items}>
        {renderFilter}
      </VirtualTable>
    </Container>
  );
};

export default Complaints;
