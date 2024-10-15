import {Outlet, useNavigate} from "react-router-dom";
import {Playground} from "@/components/CustomSidebar";
import Breadcrumb from "@/components/BreadCrump";
import {useAppDispatch, useAppSelector} from "@/store/rootConfig.ts";
import {langSelector} from "reducers/selects.ts";
import {logoutHandler, tokenSelector} from "reducers/auth.ts";
import useToken from "@/hooks/useToken.ts";
import {useEffect} from "react";
import i18n from "@/localization";
import Loading from "@/components/Loader";

const AdminRoutes = () => {
    const lang = useAppSelector(langSelector);
    const token = useAppSelector(tokenSelector);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {error, isLoading, data} = useToken({});

    useEffect(() => {
        if (!token) navigate("/login");
        if (!!error) dispatch(logoutHandler());
    }, [token, error]); //todo

    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang]);

    if (isLoading) return <Loading/>;

    return (
        <>
            <Playground/>
            <Breadcrumb/>

            <div>
                <Outlet/>
            </div>
        </>
    );
};

export default AdminRoutes;
