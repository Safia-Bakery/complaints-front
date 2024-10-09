import { useLocation, useParams } from "react-router-dom";
import { DatePicker, Divider, Flex, Tooltip, Typography } from "antd";
import TgContainer from "@/web-ui/components/tg-container";
import Button from "@/components/Button";
import { BtnTypes } from "@/utils/types.ts";
import {
  SearchOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useMemo, useState } from "react";
import useTgProducts from "@/hooks/useTgProducts.ts";
import { quealityKeys } from "@/utils/keys.ts";
import { Dayjs } from "dayjs";

const CreateOrderScreen = () => {
  const { childId, subId } = useParams();
  const { state } = useLocation();
  const [search, $search] = useState("");
  const [selected, $selected] = useState<any>();
  const [recieved_at, $recieved_at] = useState<any>();
  const [selling_at, $selling_at] = useState<any>();

  const { data: searchedItems } = useTgProducts({
    name: search,
    enabled: quealityKeys[+childId!],
  });

  const onSearch = (val: string) => {
    $search(val);
  };

  const renderSearch = useMemo(() => {
    return (
      <div className={"border-b border-b-black w-42 relative"}>
        <input
          value={search}
          placeholder={"Поиск"}
          onChange={(e) => onSearch(e.target.value)}
          className={"w-full h-full outline-none bg-transparent pr-10"}
        />

        <button className={"absolute top-auto right-2"}>
          <SearchOutlined />
        </button>
      </div>
    );
  }, [search]);

  const renderList = useMemo(() => {
    return (
      <Flex gap={20} className={"w-full mt-4"} vertical>
        {!selected ? (
          searchedItems?.map((item) => (
            <Flex flex={1} key={item.id} className={"w-full"}>
              <Button
                btnType={BtnTypes.tgPrimary}
                onClick={() => $selected(item)}
                className={"w-full !p-2 !h-max"}
              >
                {item.name}
              </Button>
            </Flex>
          ))
        ) : (
          <Flex justify={"center"}>
            <Button
              btnType={BtnTypes.tgPrimary}
              className={"w-full !p-2 !h-max"}
            >
              {selected.name}
            </Button>
            <button onClick={() => $selected(undefined)} className={"w-8"}>
              <CloseOutlined />
            </button>
          </Flex>
        )}
      </Flex>
    );
  }, [searchedItems, selected]);

  return (
    <>
      <TgContainer>
        <Flex vertical gap={5}>
          <Typography>Категория</Typography>
          <Button btnType={BtnTypes.tgPrimary}>{state?.title}</Button>
        </Flex>
      </TgContainer>
      {!selected && quealityKeys[+childId!] && <Divider className="bg-black" />}
      <TgContainer className="overflow-y-auto h-full">
        {quealityKeys[+childId!] && (
          <>
            <Flex align="center" justify="space-between">
              <Typography>Выбрать продукт</Typography>

              {renderSearch}
            </Flex>

            {renderList}
          </>
        )}

        <Flex justify="space-between" align="center">
          <Typography className="font-bold">Дата поступления товара</Typography>

          <Tooltip
            color="white"
            placement="bottomRight"
            //             title={`Дата поступления товара - дата когда товар
            // поступил на склад магазина (время прихода)`}
            title={
              <div className="text-xs text-black">
                <p className="font-bold inline">Дата поступления товара - </p>
                дата когда товар поступил на склад магазина (время прихода)
              </div>
            }
          >
            <button className="w-8">
              <InfoCircleOutlined />
            </button>
          </Tooltip>
        </Flex>
        <DatePicker
          className="w-full h-12 bg-transparent mt-3"
          showTime
          placeholder="Дата поступления"
          onChange={(date) => $recieved_at(date)}
        />

        <Flex justify="space-between" align="center" className="mt-6">
          <Typography className="font-bold">Дата продажи товара</Typography>

          <Tooltip
            color="white"
            placement="bottomRight"
            title={
              <div className="text-xs text-black">
                <p className="font-bold inline">Дата поступления товара - </p>
                дата когда товар поступил на склад магазина (время прихода)
              </div>
            }
          >
            <button className="w-8">
              <InfoCircleOutlined />
            </button>
          </Tooltip>
        </Flex>
        <DatePicker
          placeholder="Дата продажи"
          className="w-full h-12 bg-transparent mt-3"
          showTime
          onChange={(date) => $selling_at(date)}
        />
      </TgContainer>
    </>
  );
};

export default CreateOrderScreen;
