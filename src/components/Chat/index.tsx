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
import { Fragment, useCallback, useEffect, useState } from "react";
import ChatMsg from "@/components/ChatMsg";
import { useForm } from "react-hook-form";
import communicationMutation from "@/hooks/mutations/communication";
import { CommunicationType } from "@/utils/types";

const resetData = {
  msg_text: "",
  msg_file: null,
};

const Chat = () => {
  const page = Number(useQueryString("page")) || 1;
  const chat_modal = Number(useQueryString("chat_modal"));
  const chat = Number(useQueryString("chat"));
  const removeParam = useRemoveParams();
  const navigateParam = useNavigateParams();
  const [messages, setMessages] = useState<CommunicationType[]>([]);

  const { mutate: sendMsg, isPending } = communicationMutation();
  const { register, getValues, reset } = useForm();

  const {
    data: communication,
    isLoading: commLoading,
    refetch,
  } = useCommunications({
    page,
    hrclient_id: chat,
    enabled: !!chat && !!chat_modal,
  });

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop } = event.currentTarget;
      if (scrollTop === 0) {
        navigateParam({ page: page + 1 });
      }
    },
    [page]
  );

  useEffect(() => {
    if (communication?.items)
      setMessages((prev) => [...prev, ...communication?.items]);
  }, [page, communication]);

  const handleMsgSend = () => {
    const { msg_text, msg_file } = getValues();
    sendMsg(
      {
        text: msg_text,
        file: msg_file?.[0],
        // hrcomplaint_id: chat_modal,
        hrcomplaint_id: messages?.[0]?.hrcomplaint_id,
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

  if (commLoading || isPending) return <Loading />;

  return (
    <div className="flex flex-1 pb-24 h-[90%]">
      <div
        className="h-full overflow-y-auto px-2 w-full gap-2 flex flex-col"
        onScroll={handleScroll}
      >
        {!!messages.length && <ChatMsg data={messages} />}
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
  );
};

export default Chat;
