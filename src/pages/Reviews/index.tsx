import Container from "@/components/Container";
import Loading from "@/components/Loader";
import VirtualTable from "@/components/VirtualTable";
import useQueryString from "@/hooks/custom/useQueryString";
import useHRRequests from "@/hooks/useHRRequests";
import { HRStatusOBJ, handleIdx } from "@/utils/helper";
import { BtnTypes, HRDeps, HRRequest, HRSpheres } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import chatIcon from "/icons/chat.svg";
import Button from "@/components/Button";
import HRRequestModals from "../HRRequests/modals";

const Reviews = () => {
  const { hrdep, sphere } = useParams();
  const { t } = useTranslation();
  const page = Number(useQueryString("page")) || 1;
  const navigate = useNavigate();

  const { data, isLoading } = useHRRequests({
    hrtype: HRDeps[hrdep! as unknown as HRDeps],
    sphere_id: HRSpheres[sphere! as unknown as HRSpheres],
    page,
  });

  const columns = useMemo<ColumnDef<HRRequest>[]>(
    () => [
      {
        cell: ({ row }) => handleIdx(row.index),
        header: "№",
        size: 5,
      },

      {
        accessorKey: "name",
        header: t("user"),

        cell: ({ row }) => row.original.hrclient.name,
      },

      {
        accessorKey: "complaint",
        header: t("question"),
      },
      {
        accessorKey: "status",
        header: t("status"),

        cell: ({ row }) =>
          !!row.original?.status?.toString() &&
          t(HRStatusOBJ[row.original.status]),
      },
      {
        accessorKey: "chat",
        header: t("chat"),
        size: 10,
        cell: ({ row }) => (
          <Link
            to={`?chat_modal=${row.original?.id}&chat=${row.original?.hrclient_id}`}
            className="w-full"
          >
            <img src={chatIcon} alt="chat" className="mx-auto" />
          </Link>
        ),
      },
      //   {
      //     accessorKey: "action",
      //     header: t(""),
      //     size: 1,
      //     cell: ({ row }) => (
      //       <Link
      //         className="w-18"
      //         to={
      //           hrdep == HRDeps[HRDeps.qa]
      //             ? `edit/${row.original.id}`
      //             : `${row.original.id}`
      //         }
      //       >
      //         <TableViewBtn />
      //       </Link>
      //     ),
      //   },
    ],
    []
  );

  const renderModal = useMemo(() => {
    return <HRRequestModals />;
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Container>
      {/* <div className="flex justify-end mb-2 gap-2">
        <Button onClick={() => navigate(-1)} btnType={BtnTypes.black}>
          {t("back")}
        </Button>
      </div> */}
      <VirtualTable
        columns={columns}
        data={data?.items}
        rowClassName={"text-center"}
      />

      {renderModal}
    </Container>
  );
};

export default Reviews;
