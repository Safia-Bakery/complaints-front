import { Outlet, useNavigate } from "react-router-dom";
import BreadCrump from "../BreadCrump";
import { Playground } from "../CustomSidebar";
import { useAppDispatch } from "@/store/rootConfig";
import { useEffect } from "react";
import { versionHandler } from "@/store/reducers/versionCheck";

const AdminRoutes = () => {
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (token) navigate(mainurl);
  // }, [token]);

  useEffect(() => {
    dispatch(versionHandler());
  }, []);

  return (
    <>
      <Playground />
      <BreadCrump />

      <div>
        <Outlet />
      </div>
    </>
  );
};

export default AdminRoutes;
