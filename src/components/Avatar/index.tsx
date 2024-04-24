import cl from "classnames";
import userIcon from "/icons/user.svg";

type Props = {
  className?: string;
  img?: string;
};

const Avatar = ({ img, className }: Props) => {
  return (
    <div
      className={cl(
        className,
        "rounded-full bg-green-700 h-10 w-10 border border-white"
      )}
    >
      <img src={userIcon ?? img} alt="avatar-img" className="w-full h-full" />
    </div>
  );
};

export default Avatar;
