import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Flex } from "antd";
import dayjs from "dayjs";
import { dateTimeFormat } from "@/utils/helper.ts";
import { OrderDetails } from "@/types/order-details.ts";
import { useEffect } from "react";
import TgContainer from "@/web-ui/components/tg-container";
import useCategories from "@/hooks/useCategories.ts";
import Loading from "@/components/Loader";

const CheckOrderDetails = () => {
  const location = useLocation();
  const { childId } = useParams();
  const navigate = useNavigate();
  const state = location?.state as OrderDetails;
  const { data, isLoading } = useCategories({
    id: Number(childId),
    enabled: !!childId,
  });
  const category = data?.[0];

  useEffect(() => {
    if (!state?.child_category_name) navigate("/tg/select-category");
  }, [state?.child_category_name]);

  if (isLoading) return <Loading />;

  return (
    <TgContainer>
      <Flex vertical className={"h-svh overflow-y-auto"}>
        <span>
          <span className={"font-bold"}>Филиал:</span> Ракат
        </span>

        <span>
          <span className={"font-bold"}>Время оформления:</span>{" "}
          {dayjs(state?.received_at).format(dateTimeFormat)}
        </span>

        <span>
          <span className={"font-bold"}>Категория заявки:</span>{" "}
          {category?.name}
        </span>

        <span>
          <span className={"font-bold"}>Блюдо:</span> {state?.product?.name}
        </span>

        <span>
          <span className={"font-bold"}>Блюдо:</span>{" "}
          {dayjs(state?.selling_at).format(dateTimeFormat)}
        </span>

        <span>
          <span className={"font-bold"}>Номер управляющего:</span>{" "}
          {state?.manager_phone}
        </span>

        <span>
          <span className={"font-bold"}>Номер клиента:</span>{" "}
          {state?.client_phone}
        </span>
        <span>
          <span className={"font-bold"}>Описание:</span> {state?.description}
        </span>
      </Flex>
    </TgContainer>
  );
};

export default CheckOrderDetails;
