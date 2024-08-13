import { Outlet, useNavigate } from "react-router-dom";
import BreadCrump from "../BreadCrump";
import { Playground } from "../CustomSidebar";
import { useAppSelector } from "@/store/rootConfig";
import { linkSelector, tokenSelector } from "@/store/reducers/auth";
import { useEffect } from "react";

const AdminRoutes = () => {
  const token = useAppSelector(tokenSelector);
  const mainurl = useAppSelector(linkSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate(mainurl);
  }, [token]);

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
