import { Outlet } from "react-router-dom";
import BreadCrump from "../BreadCrump";
import { Playground } from "../CustomSidebar";

const AdminRoutes = () => {
  return (
    <>
      <Playground />
      <BreadCrump />

      <div className="flex flex-col flex-1">
        <Outlet />
      </div>
    </>
  );
};

export default AdminRoutes;
