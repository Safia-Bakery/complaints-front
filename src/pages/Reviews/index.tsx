import Container from "@/components/Container";
import Loading from "@/components/Loader";
import VirtualTable from "@/components/VirtualTable";
import useQueryString from "@/hooks/custom/useQueryString";
import useHRRequests from "@/hooks/useHRRequests";
import { HRStatusOBJ, handleIdx } from "@/utils/helper";
import {
  BtnTypes,
  ComplaintType,
  HRDeps,
  HRRequest,
  HRSpheres,
} from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import chatIcon from "/icons/chat.svg";
import Button from "@/components/Button";
import HRRequestModals from "../HRRequests/modals";
import useComplaints from "@/hooks/useComplaints";

const Reviews = () => {
  const { hrdep, sphere } = useParams();
  const { t } = useTranslation();
  const page = Number(useQueryString("page")) || 1;

  const { data, isLoading, isPending } = useComplaints({ is_client: true });

  // const { data, isLoading } = useHRRequests({
  //   hrtype: HRDeps[hrdep! as unknown as HRDeps],
  //   sphere_id: HRSpheres[sphere! as unknown as HRSpheres],
  //   page,
  // });

  const columns = useMemo<ColumnDef<ComplaintType>[]>(
    () => [
      {
        cell: ({ row }) => handleIdx(row.index),
        header: "№",
        size: 5,
      },

      {
        accessorKey: "name",
        header: t("user"),

        cell: ({ row }) => row.original.client.name,
      },

      {
        accessorKey: "comment",
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
            to={`?chat_modal=${row.original?.id}&chat=${row.original?.client_id}`}
            className="w-full"
          >
            <img src={chatIcon} alt="chat" className="mx-auto" />
          </Link>
        ),
      },
    ],
    []
  );

  const renderModal = useMemo(() => {
    return <HRRequestModals />;
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Container>
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
