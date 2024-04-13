import { FC } from "react";

interface Props {
  onClick: () => void;
}

const TableViewBtn: FC<Props> = ({ onClick }) => {
  return (
    <div onClick={onClick} id="edit_item">
      <img
        className={"h-6 w-6 cursor-pointer"}
        src="/icons/edit.svg"
        alt="edit"
      />
    </div>
  );
};

export default TableViewBtn;
