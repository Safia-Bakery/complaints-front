import {lazy, useEffect} from "react";
import i18n from "./localization";
import {useAppDispatch, useAppSelector} from "./store/rootConfig";
import {langSelector} from "@/store/reducers/selects";
import {Route, Routes, useNavigate} from "react-router-dom";
import Suspend from "./components/Suspend";
import {logoutHandler, tokenSelector} from "./store/reducers/auth";
import useToken from "@/hooks/useToken";
import Loading from "./components/Loader";
import "dayjs/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import {Permissions} from "./utils/types";
import routePath from "./routes.ts";
import AdminRoutes from "@/layouts/admin-routes.tsx";

const Login = lazy(() => import("@/pages/Login"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Complaints = lazy(() => import("@/pages/Complaints"));
const AddComplaint = lazy(() => import("@/pages/AddComplaint"));
const ShowComplaint = lazy(() => import("@/pages/ShowComplaint"));
const HRRequestLayout = lazy(() => import("@/layouts/hr-layout.tsx"));
const TgRoutes = lazy(() => import("@/layouts/tg-routes.tsx"));

const HRDashboard = lazy(() => import("@/pages/HRDashboard"));
const HRRequests = lazy(() => import("@/pages/HRRequests"));
const EditAddHRQa = lazy(() => import("@/pages/EditAddHRQa"));
const HRQa = lazy(() => import("@/pages/HRQa"));
const ShowHRRequest = lazy(() => import("@/pages/ShowHRRequest"));
const Countries = lazy(() => import("@/pages/Countries"));
const EditAddCountries = lazy(() => import("@/pages/EditAddCountries"));

const Categories = lazy(() => import("@/pages/Categories"));
const EditAddCategories = lazy(() => import("@/pages/EditAddCategories"));

const SubCategories = lazy(() => import("@/pages/SubCategories"));
const EditAddSubCategory = lazy(() => import("@/pages/EditAddSubCategory"));

const Branches = lazy(() => import("@/pages/Branches"));
const EditAddBranches = lazy(() => import("@/pages/EditAddBranches"));

const Roles = lazy(() => import("@/pages/Roles"));
const EditAddRoles = lazy(() => import("@/pages/EditAddRoles"));

const Users = lazy(() => import("@/pages/Users"));
const EditAddUsers = lazy(() => import("@/pages/EditAddUser"));

const EditPermission = lazy(() => import("@/pages/EditPermission"));
const Reviews = lazy(() => import("@/pages/Reviews"));

const HRCategories = lazy(() => import("@/pages/HRCategories"));
const EditAddHRCategory = lazy(() => import("@/pages/EditAddHRCategory"));

const SelectCategory = lazy(() => import("@/web-ui/screens/select-category"));
const SelectSubCategory = lazy(
    () => import("@/web-ui/screens/select-sub-category")
);
const CreateOrderScreen = lazy(() => import("@/web-ui/screens/create-order"));
const CheckOrderDetails = lazy(
    () => import("@/web-ui/screens/check-order-details")
);
const Success = lazy(() => import("@/web-ui/screens/success"));
const TgNewOrders = lazy(() => import("@/web-ui/screens/new-orders"));
const TgOrdersResults = lazy(() => import("@/web-ui/screens/tg-complaints-results"));
const ComplaintsArchive = lazy(() => import("@/web-ui/screens/complaints-archive"));
const hrRoutes = [
    {
        element: <HRRequests/>,
        path: ":hrdep",
        screen: Permissions.get_hr_fabric,
    },
    {
        element: <HRRequests/>,
        path: ":hrdep",
        screen: Permissions.get_hr_retail,
    },

    {element: <HRQa/>, path: "qa", screen: Permissions.get_hr_fabric},
    {element: <HRQa/>, path: "qa", screen: Permissions.get_hr_retail},
    {
        element: <HRCategories/>,
        path: "hr_categories",
        screen: Permissions.get_hr_fabric,
    },
    {
        element: <EditAddHRCategory/>,
        path: "hr_categories/:category_id",
        screen: Permissions.get_hr_fabric,
    },
    {
        element: <EditAddHRCategory/>,
        path: "hr_categories/add",
        screen: Permissions.get_hr_fabric,
    },
    {
        element: <HRCategories/>,
        path: "hr_categories",
        screen: Permissions.get_hr_retail,
    },
    {
        element: <EditAddHRCategory/>,
        path: "hr_categories/:category_id",
        screen: Permissions.get_hr_retail,
    },
    {
        element: <EditAddHRCategory/>,
        path: "hr_categories/add",
        screen: Permissions.get_hr_retail,
    },

    {
        element: <EditAddHRQa/>,
        path: "qa/edit/:id",
        screen: Permissions.edit_hr_fabric,
    },
    {
        element: <EditAddHRQa/>,
        path: "qa/edit/:id",
        screen: Permissions.edit_hr_retail,
    },
    {
        element: <EditAddHRQa/>,
        path: "qa/edit/add",
        screen: Permissions.add_hr_fabric,
    },
    {
        element: <EditAddHRQa/>,
        path: "qa/edit/add",
        screen: Permissions.add_hr_retail,
    },
    {
        element: <ShowHRRequest/>,
        path: ":hrdep/:id",
        screen: Permissions.edit_hr_fabric,
    },
    {
        element: <ShowHRRequest/>,
        path: ":hrdep/:id",
        screen: Permissions.edit_hr_retail,
    },
];

const mainRoutes = [
    {
        element: <Dashboard/>,
        path: "dashboard",
        screen: Permissions.dashboard_stats,
    },
    {
        element: <Complaints/>,
        path: `complaints/:com_sphere`,
        screen: Permissions.get_complaints,
    },
    {
        element: <Complaints/>,
        path: `complaints/:com_sphere`,
        screen: Permissions.get_internal_complaints,
    },
    {
        element: <Complaints/>,
        path: `complaints/:com_sphere`,
        screen: Permissions.get_okk,
    },
    {
        element: <ShowComplaint/>,
        path: `complaints/:com_sphere/:id`,
        screen: Permissions.edit_okk,
    },
    {
        element: <AddComplaint/>,
        path: `complaints/:com_sphere/add`,
        screen: Permissions.add_complaints,
    },
    {
        element: <AddComplaint/>,
        path: `complaints/:com_sphere/add`,
        screen: Permissions.add_okk,
    },
    {
        element: <ShowComplaint/>,
        path: `complaints/:com_sphere/:id`,
        screen: Permissions.edit_complaints,
    },
    {
        element: <AddComplaint/>,
        path: `complaints/:com_sphere/add`,
        screen: Permissions.add_internal_complaints,
    },
    {
        element: <ShowComplaint/>,
        path: `complaints/:com_sphere/:id`,
        screen: Permissions.edit_internal_complaints,
    },

    {
        element: <HRDashboard/>,
        path: "hr-dashboard/:sphere",
        screen: Permissions.get_hr_fabric,
    },
    {
        element: <HRDashboard/>,
        path: "hr-dashboard/:sphere",
        screen: Permissions.get_hr_retail,
    },

    {
        element: <Countries/>,
        path: "countries",
        screen: Permissions.get_countries,
    },
    {
        element: <EditAddCountries/>,
        path: "countries/:id",
        screen: Permissions.edit_countries,
    },
    {
        element: <EditAddCountries/>,
        path: "countries/add",
        screen: Permissions.add_countries,
    },

    {
        element: <Categories/>,
        path: "categories",
        screen: Permissions.get_categories,
    },
    {
        element: <EditAddCategories/>,
        path: "categories/:id",
        screen: Permissions.edit_categories,
    },
    {
        element: <EditAddCategories/>,
        path: "categories/add",
        screen: Permissions.add_categories,
    },

    {
        element: <SubCategories/>,
        path: "categories/:id/child",
        screen: Permissions.get_categories,
    },
    {
        element: <EditAddSubCategory/>,
        path: "categories/:id/child/:childId",
        screen: Permissions.edit_categories,
    },
    {
        element: <EditAddSubCategory/>,
        path: "categories/:id/child/add",
        screen: Permissions.add_categories,
    },

    {element: <Branches/>, path: "branches", screen: Permissions.get_branches},
    {
        element: <EditAddBranches/>,
        path: "branches/:id",
        screen: Permissions.edit_branches,
    },
    {
        element: <EditAddBranches/>,
        path: "branches/add",
        screen: Permissions.add_branches,
    },

    {element: <Roles/>, path: "roles", screen: Permissions.get_roles},
    {
        element: <EditAddRoles/>,
        path: "roles/:id",
        screen: Permissions.edit_roles,
    },
    {
        element: <EditAddRoles/>,
        path: "roles/add",
        screen: Permissions.add_roles,
    },

    {element: <Users/>, path: "users", screen: Permissions.get_users},
    {
        element: <EditAddUsers/>,
        path: "users/:id",
        screen: Permissions.edit_users,
    },
    {
        element: <EditAddUsers/>,
        path: "users/add",
        screen: Permissions.add_users,
    },

    {
        element: <EditPermission/>,
        path: "permissions/:id",
        screen: Permissions.edit_roles,
    },

    {
        element: <Reviews/>,
        path: "reviews",
        screen: Permissions.get_reviews,
    },
];

const App = () => {
    const {data} = useToken({enabled: false});
    return (
        <Routes>
            <Route
                element={
                    <Suspend>
                        <Login/>
                    </Suspend>
                }
                path={"/login"}
            />

            <Route element={<AdminRoutes/>} path={"/"}>
                <Route
                    index
                    path={"*"}
                    element={
                        <Suspend>
                            <Dashboard/>
                        </Suspend>
                    }
                />
                {mainRoutes
                    .filter((item) => data?.permissions?.[item.screen])
                    .map((route) => (
                        <Route
                            key={route.screen + route.path}
                            path={route.path}
                            element={<Suspend>{route.element}</Suspend>}
                        />
                    ))}

                {/* hr requests */}

                <Route
                    path={"hr-dashboard/:sphere"}
                    element={
                        <Suspend>
                            <HRRequestLayout/>
                        </Suspend>
                    }
                >
                    {hrRoutes
                        .filter((item) => data?.permissions?.[item.screen])
                        .map((route) => (
                            <Route
                                key={route.screen + route.path}
                                path={route.path}
                                element={<Suspend>{route.element}</Suspend>}
                            />
                        ))}
                </Route>
            </Route>

            <Route
                path={routePath.mainTgRoute}
                element={
                    <Suspend>
                        <TgRoutes/>
                    </Suspend>
                }
            >
                <Route
                    index
                    path={routePath.tgSelectCategory}
                    element={
                        <Suspend>
                            <SelectCategory/>
                        </Suspend>
                    }
                />
                <Route
                    path={routePath.tgSelectCategory + routePath.tgSelectSubCategory}
                    element={
                        <Suspend>
                            <SelectSubCategory/>
                        </Suspend>
                    }
                />
                <Route
                    path={"select-category/:childId/:subId"}
                    element={
                        <Suspend>
                            <CreateOrderScreen/>
                        </Suspend>
                    }
                />
                <Route
                    path={`select-category/:childId/:subId/${routePath.checkData}`}
                    element={
                        <Suspend>
                            <CheckOrderDetails/>
                        </Suspend>
                    }
                />
                <Route
                    path={`success/:id`}
                    element={
                        <Suspend>
                            <Success/>
                        </Suspend>
                    }
                />
                <Route
                    path={`new-orders`}
                    element={
                        <Suspend>
                            <TgNewOrders/>
                        </Suspend>
                    }
                />
                <Route
                    path={`orders-results`}
                    element={
                        <Suspend>
                            <TgOrdersResults/>
                        </Suspend>
                    }
                /> <Route
                path={`orders-archive`}
                element={
                    <Suspend>
                        <TgOrdersResults/>
                    </Suspend>
                }
            />
            </Route>
        </Routes>
    );
};

export default App;
