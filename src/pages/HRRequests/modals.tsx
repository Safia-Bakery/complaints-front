import Loading from "@/components/Loader";
import useQueryString from "@/hooks/custom/useQueryString";

import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import arrow from "/icons/arrow-black.svg";
import arrowWhite from "/icons/arrow-white.svg";
import sendIcon from "/icons/send.svg";
import attached from "/icons/attached.svg";
import Modal from "@/components/Modal";
import {
  useNavigateParams,
  useRemoveParams,
} from "@/hooks/custom/useCustomNavigate";
import useHRClients from "@/hooks/useHRClients";
import Avatar from "@/components/Avatar";
import useCommunications from "@/hooks/useCommunications";
import MainTextArea from "@/components/BaseInputs/MainTextArea";
import { Fragment, useEffect } from "react";
import ChatMsg from "@/components/ChatMsg";
import { useForm } from "react-hook-form";
import communicationMutation from "@/hooks/mutations/communication";

const resetData = {
  msg_text: "",
  msg_file: null,
};

const HRRequestModals = () => {
  const { hrdep, sphere } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const page = Number(useQueryString("page")) || 1;
  const chat_modal = Number(useQueryString("chat_modal"));
  const chat = Number(useQueryString("chat"));
  const removeParam = useRemoveParams();
  const navigateParam = useNavigateParams();

  const { mutate: sendMsg, isPending } = communicationMutation();
  const { register, getValues, reset } = useForm();
  const closeModal = () => removeParam(["chat_modal", "chat"]);

  const {
    data: communication,
    isLoading: commLoading,
    refetch,
  } = useCommunications({
    // hrcomplaint_id: chat_modal,
    hrclient_id: chat,
    enabled: !!chat && !!chat_modal,
  });

  const { data: clients, isPending: clientsloading } = useHRClients({
    enabled: !!chat_modal || !!chat,
    ...(!!chat && { id: chat }),
  });

  const handleMsgSend = () => {
    const { msg_text, msg_file } = getValues();
    sendMsg(
      {
        text: msg_text,
        file: msg_file?.[0],
        // hrcomplaint_id: chat_modal,
        hrcomplaint_id: communication?.items?.[0].hrcomplaint_id,
      },
      {
        onSuccess: () => {
          refetch();
          reset(resetData);
        },
      }
    );
  };

  useEffect(() => {
    return () => {
      reset(resetData);
    };
  }, []);

  const privateClient = !!chat ? clients?.items?.[0] : undefined;

  return (
    <Modal
      isOpen={!!chat_modal}
      onClose={closeModal}
      className="h-full !left-[78%] !-translate-y-1/2 "
    >
      {(clientsloading || commLoading || isPending) && <Loading />}
      <div className="h-full flex flex-col">
        <div className="w-full p-3 bg-green-700 rounded-t-xl relative">
          {!chat ? (
            <div className="flex items-center justify-center h-10">
              <h3 className="text-white">{t("chat")}</h3>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              {/* <button
                className="flex items-center justify-center h-5 w-5"
                onClick={() => navigate(-1)}
              >
                <img src={arrowWhite} alt="back" className="rotate-180" />
              </button> */}
              <Avatar />

              <h3 className="text-white font-bold">{privateClient?.name}</h3>

              <button
                onClick={closeModal}
                className="absolute top-1/2 -translate-y-1/2 right-2"
              >
                <span className="flex h-5 w-5">&times;</span>
              </button>
            </div>
          )}
        </div>

        {!privateClient ? (
          <ul className="h-full overflow-y-auto">
            {clients?.items.map((client) => (
              <li
                className="px-3 cursor-pointer"
                key={client.id}
                onClick={() => navigateParam({ chat: client.id })}
              >
                <div className="flex justify-between items-center py-3 border-b border-b-borderColor">
                  <div className="flex items-center gap-4">
                    <Avatar />

                    <p>{client.name}</p>
                  </div>
                  <img src={arrow} alt="go-to-chat" />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-1 pb-24 h-[90%]">
            <div className="h-full overflow-y-auto px-2 flex flex-1 flex-col-reverse gap-2">
              {!!communication?.items.length && (
                <ChatMsg data={communication?.items} />
              )}
            </div>

            <div className="absolute right-0 bottom-0 left-0 border-t border-borderColor">
              <div className="flex">
                <MainTextArea
                  className="!border-none flex flex-1 overflow-scroll"
                  register={register("msg_text")}
                />

                <div className="flex gap-2 pr-2 ml-2">
                  <button className="relative">
                    <img src={attached} alt="send" />
                    <input
                      type="file"
                      {...register("msg_file")}
                      className="opacity-0 absolute inset-0 cursor-pointer"
                    />
                  </button>
                  <button onClick={handleMsgSend}>
                    <img src={sendIcon} alt="send" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default HRRequestModals;
