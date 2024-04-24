type Props = {
  label?: string;
};

const EmptyList = ({ label }: Props) => {
  return (
    <div className="w-full mt-2">
      <p className="text-center w-full">{label || "Список пуст"}</p>
    </div>
  );
};

export default EmptyList;
