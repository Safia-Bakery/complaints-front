import Container from "@/components/Container";
import Loading from "@/components/Loader";
import TableViewBtn from "@/components/TableViewBtn";
import VirtualTable from "@/components/VirtualTable";
import useQueryString from "@/hooks/custom/useQueryString";
import useHRRequests from "@/hooks/useHRRequests";
import { HRStatusOBJ, handleIdx } from "@/utils/helper";
import { HRDeps, HRRequest, HRSpheres } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import chatIcon from "/icons/chat.svg";
import arrow from "/icons/arrow-black.svg";
import userIcon from "/icons/user.svg";
import Modal from "@/components/Modal";
import {
  useNavigateParams,
  useRemoveParams,
} from "@/hooks/custom/useCustomNavigate";
import useClients from "@/hooks/useClients";

const HRRequests = () => {
  const { hrdep, sphere } = useParams();
  const { t } = useTranslation();
  const page = Number(useQueryString("page")) || 1;
  const chat_modal = Number(useQueryString("chat_modal"));
  const chat = Number(useQueryString("chat"));
  const removeParam = useRemoveParams();
  const navigateParam = useNavigateParams();

  const closeModal = () => removeParam(["chat_modal", "chat"]);
  const { data, isLoading } = useHRRequests({
    hrtype: HRDeps[hrdep! as unknown as HRDeps],
    sphere_id: HRSpheres[sphere! as unknown as HRSpheres],
    page,
  });

  const { data: clients, isLoading: clientsloading } = useClients({
    enabled: !!chat_modal,
  });

  const columns = useMemo<ColumnDef<HRRequest>[]>(
    () => [
      {
        cell: ({ row }) => (
          <div className="w-4 text-center">{handleIdx(row.index)}</div>
        ),
        header: "№",
        size: 5,
      },

      {
        accessorKey: "complaint",
        header: t("question"),
      },
      {
        accessorKey: "status",
        header: t("status"),

        cell: ({ row }) => (
          <p className="text-center w-full">
            {!!row.original?.status?.toString() &&
              t(HRStatusOBJ[row.original.status])}
          </p>
        ),
      },
      {
        accessorKey: "chat",
        header: t("chat"),
        size: 10,
        cell: ({ row }) => (
          <Link to={`?chat_modal=${row.original?.id}`} className="w-full">
            <img src={chatIcon} alt="chat" className="mx-auto" />
          </Link>
        ),
      },
      {
        accessorKey: "action",
        header: t(""),
        size: 1,
        cell: ({ row }) => (
          <Link
            className="w-18"
            to={
              hrdep == HRDeps[HRDeps.qa]
                ? `edit/${row.original.id}`
                : `${row.original.id}`
            }
          >
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
      <VirtualTable
        columns={columns}
        data={data?.items}
        rowClassName={"text-center"}
      />

      <Modal isOpen={!!chat_modal} onClose={closeModal}>
        {clientsloading && <Loading />}
        <div className="">
          <div className="w-full p-3 bg-green-700 rounded-t-xl">
            <h3 className="text-white text-center">{t("chat")}</h3>
          </div>

          <ul className="h-full overflow-y-auto">
            {clients?.items.map((client) => (
              <li
                className="px-3 cursor-pointer"
                key={client.id}
                onClick={() => navigateParam({ chat: client.id })}
              >
                <div className="flex justify-between items-center py-3 border-b border-b-borderColor">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-green-700 h-10 w-10">
                      <img
                        src={userIcon}
                        alt="avatar-img"
                        className="w-full h-full"
                      />
                    </div>

                    <p>{client.name}</p>
                  </div>
                  <img src={arrow} alt="go-to-chat" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </Container>
  );
};

export default HRRequests;
