import cl from "classnames";
import styles from "./index.module.scss";
import {ReactNode} from "react";
import {BtnTypes} from "@/utils/types";
import {Button} from "antd";

type Props = {
    green?: boolean;
    className?: string;
    children: ReactNode;
    onClick?: () => void;
    type?: "submit" | "reset" | "button";
    btnType?: BtnTypes;
    disabled?: boolean;
};

const MyButton = ({
                      green,
                      children,
                      className = "",
                      type,
                      btnType = BtnTypes.black,
                      ...others
                  }: Props) => {
    return (
        <Button
            htmlType={type} style={{height: 40}}
            className={`${className} ${cl(styles.btn, styles[btnType])}`}
            {...others}
        >
            {children}
        </Button>
    );
};

export default MyButton;
