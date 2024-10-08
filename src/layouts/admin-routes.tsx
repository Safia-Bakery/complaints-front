import {Outlet} from "react-router-dom";
import {Playground} from "@/components/CustomSidebar";
import BreadCrump from "@/components/BreadCrump";

const AdminRoutes = () => {

    return (
        <>
            <Playground/>
            <BreadCrump/>

            <div>
                <Outlet/>
            </div>
        </>
    );
};

export default AdminRoutes;
