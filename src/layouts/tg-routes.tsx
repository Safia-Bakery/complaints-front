import {Outlet, useLocation, useNavigate} from "react-router-dom";
import useQueryString from "custom/useQueryString.ts";
import {useAppDispatch} from "@/store/rootConfig";
import {useEffect} from "react";
import {loginHandler} from "reducers/auth.ts";
import {getBranch} from "reducers/tg-get-branch.ts";

const TgLayout = () => {
    const token = useQueryString("token");
    const branch_id = useQueryString("branch_id");
    const branch_name = useQueryString("branch_name");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {pathname, search} = useLocation();
    // const {branch_id, branch_name} = useAppSelector(branchSelector)

    useEffect(() => {
        if (!!token) {
            dispatch(loginHandler(token));
            // navigate(pathname + search);
        }
        if (branch_id || branch_name) dispatch(getBranch({
            branch_id,
            branch_name
        }));
    }, [token, branch_id, branch_name]);

    return (
        <>
            <Outlet/>
        </>
    );
};

export default TgLayout;
