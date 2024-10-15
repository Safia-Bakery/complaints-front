import {Outlet} from "react-router-dom";
import useToken from "@/hooks/useToken.ts";

const HRRequestLayout = () => {
    useToken({});
    return (
        <>
            <Outlet/>
        </>
    );
};

export default HRRequestLayout;
