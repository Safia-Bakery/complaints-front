import { Outlet, useNavigate } from "react-router-dom";
import BreadCrump from "../BreadCrump";
import { Playground } from "../CustomSidebar";
import { useAppDispatch, useAppSelector } from "@/store/rootConfig";
import { linkSelector, tokenSelector } from "@/store/reducers/auth";
import { useEffect } from "react";
import { versionHandler } from "@/store/reducers/versionCheck";

const AdminRoutes = () => {
  const token = useAppSelector(tokenSelector);
  const mainurl = useAppSelector(linkSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) navigate(mainurl);
  }, [token]);

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
