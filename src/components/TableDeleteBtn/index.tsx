import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

const TableDeleteBtn = ({
  id,
  callback,
}: {
  id: string;
  callback: (val: string) => void;
}) => {
  return (
    <Popconfirm
      title="Вы действительно хотите удалить это?"
      onConfirm={() => callback(id)}
      okText={"Да"}
      cancelText={"Нет"}
    >
      <DeleteOutlined color="red" />
    </Popconfirm>
  );
};

export default TableDeleteBtn;
