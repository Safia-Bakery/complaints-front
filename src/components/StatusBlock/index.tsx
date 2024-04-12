import { OrderStatus } from "@/utils/types";
import cl from "classnames";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";

type Props = {
  status: OrderStatus;
  className?: string;
};

const StatusBlock = ({ status, className }: Props) => {
  const { t } = useTranslation();
  return (
    <div
      className={cl(
        className,
        "flex items-center justify-center p-2 rounded-[20px]",
        styles[OrderStatus[status]]
      )}
    >
      {t(OrderStatus[status])}
    </div>
  );
};

export default StatusBlock;
