import { CommunicationType } from "@/utils/types";
import { Fragment } from "react";
import Avatar from "../Avatar";
import dayjs from "dayjs";
import { dateTimeFormat } from "@/utils/helper";

type Props = {
  data: CommunicationType[];
};

const ChatMsg = ({ data }: Props) => {
  return data.map((msg) => (
    <Fragment key={msg.id}>
      {!msg.user_id ? (
        <div className="flex gap-2 items-end">
          <Avatar />
          <div className="flex flex-col gap-2 max-w-[90%] relative pb-4 bg-mainGray rounded-2xl p-2 min-w-[150px] w-min">
            {!!msg.text && <p className="">{msg.text}</p>}
            {!!msg.url && <span className="text-blue-400 underline">file</span>}

            <p className="text-[10px] text-mainBlack absolute bottom-1 right-1">
              {dayjs(msg.created_at).format(dateTimeFormat)}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col items-end relative gap-2">
          {!!msg.text && (
            <p className="flex flex-col gap-2 max-w-[90%] relative pb-4 bg-mainGray rounded-2xl p-2 min-w-[150px] w-min">
              {msg.text}
            </p>
          )}
          {!!msg.url && (
            <span className="text-blue-400 underline flex flex-col gap-2 max-w-[90%] relative pb-4 bg-mainGray rounded-2xl p-2 min-w-[150px] w-min">
              file
            </span>
          )}
          <p className="text-[10px] text-mainBlack absolute bottom-1 right-1">
            {dayjs(msg.created_at).format(dateTimeFormat)}
          </p>
        </div>
      )}
    </Fragment>
  ));
};

export default ChatMsg;
