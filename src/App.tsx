import { lazy, useEffect } from "react";
import i18n from "./localization";
import { useAppDispatch, useAppSelector } from "./store/rootConfig";
import { langSelector } from "@/store/reducers/selects";
import { Route, Routes, useNavigate } from "react-router-dom";
import Suspend from "./components/Suspend";
import { logoutHandler, tokenSelector } from "./store/reducers/auth";
import useToken from "@/hooks/useToken";
import Loading from "./components/Loader";
import "dayjs/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import { Permissions } from "./utils/types";

const Login = lazy(() => import("@/pages/Login"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Complaints = lazy(() => import("@/pages/Complaints"));
const AddComplaint = lazy(() => import("@/pages/AddComplaint"));
const ShowComplaint = lazy(() => import("@/pages/ShowComplaint"));
const AdminRoutes = lazy(() => import("@/components/AdminRoutes"));
const HRRequestBlock = lazy(() => import("@/components/HRRequestBlock"));

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

const hrRoutes = [
  {
    element: <HRRequests />,
    path: ":hrdep",
    screen: Permissions.get_hr_fabric,
  },
  {
    element: <HRRequests />,
    path: ":hrdep",
    screen: Permissions.get_hr_retail,
  },

  { element: <HRQa />, path: "qa", screen: Permissions.get_hr_fabric },
  { element: <HRQa />, path: "qa", screen: Permissions.get_hr_retail },
  {
    element: <HRCategories />,
    path: "hr_categories",
    screen: Permissions.get_hr_fabric,
  },
  {
    element: <EditAddHRCategory />,
    path: "hr_categories/:category_id",
    screen: Permissions.get_hr_fabric,
  },
  {
    element: <EditAddHRCategory />,
    path: "hr_categories/add",
    screen: Permissions.get_hr_fabric,
  },
  {
    element: <HRCategories />,
    path: "hr_categories",
    screen: Permissions.get_hr_retail,
  },
  {
    element: <EditAddHRCategory />,
    path: "hr_categories/:category_id",
    screen: Permissions.get_hr_retail,
  },
  {
    element: <EditAddHRCategory />,
    path: "hr_categories/add",
    screen: Permissions.get_hr_retail,
  },
  {
    element: <ShowHRRequest />,
    path: ":hrdep/:id",
    screen: Permissions.edit_hr_fabric,
  },
  {
    element: <ShowHRRequest />,
    path: ":hrdep/:id",
    screen: Permissions.edit_hr_retail,
  },
  {
    element: <EditAddHRQa />,
    path: ":hrdep/edit/:id",
    screen: Permissions.edit_hr_fabric,
  },
  {
    element: <EditAddHRQa />,
    path: ":hrdep/edit/:id",
    screen: Permissions.edit_hr_retail,
  },
  {
    element: <EditAddHRQa />,
    path: ":hrdep/add",
    screen: Permissions.add_hr_fabric,
  },
  {
    element: <EditAddHRQa />,
    path: ":hrdep/add",
    screen: Permissions.add_hr_retail,
  },
];

const mainRoutes = [
  {
    element: <Dashboard />,
    path: "dashboard",
    screen: Permissions.dashboard_stats,
  },
  {
    element: <Complaints is_client />,
    path: "complaints",
    screen: Permissions.get_complaints,
  },
  {
    element: <Complaints />,
    path: "internal-complaints",
    screen: Permissions.get_internal_complaints,
  },
  {
    element: <Complaints otk_status />,
    path: "okk",
    screen: Permissions.get_okk,
  },
  {
    element: <AddComplaint />,
    path: "complaints/add",
    screen: Permissions.add_complaints,
  },
  {
    element: <ShowComplaint />,
    path: "complaints/:id",
    screen: Permissions.edit_complaints,
  },
  {
    element: <AddComplaint />,
    path: "internal-complaints/add",
    screen: Permissions.add_internal_complaints,
  },
  {
    element: <ShowComplaint />,
    path: "internal-complaints/:id",
    screen: Permissions.edit_internal_complaints,
  },

  {
    element: <HRDashboard />,
    path: "hr-dashboard/:sphere",
    screen: Permissions.get_hr_fabric,
  },
  {
    element: <HRDashboard />,
    path: "hr-dashboard/:sphere",
    screen: Permissions.get_hr_retail,
  },

  {
    element: <Countries />,
    path: "countries",
    screen: Permissions.get_countries,
  },
  {
    element: <EditAddCountries />,
    path: "countries/:id",
    screen: Permissions.edit_countries,
  },
  {
    element: <EditAddCountries />,
    path: "countries/add",
    screen: Permissions.add_countries,
  },

  {
    element: <Categories />,
    path: "categories",
    screen: Permissions.get_categories,
  },
  {
    element: <EditAddCategories />,
    path: "categories/:id",
    screen: Permissions.edit_categories,
  },
  {
    element: <EditAddCategories />,
    path: "categories/add",
    screen: Permissions.add_categories,
  },

  {
    element: <SubCategories />,
    path: "categories/:id/child",
    screen: Permissions.get_categories,
  },
  {
    element: <EditAddSubCategory />,
    path: "categories/:id/child/:childId",
    screen: Permissions.edit_categories,
  },
  {
    element: <EditAddSubCategory />,
    path: "categories/:id/child/add",
    screen: Permissions.add_categories,
  },

  { element: <Branches />, path: "branches", screen: Permissions.get_branches },
  {
    element: <EditAddBranches />,
    path: "branches/:id",
    screen: Permissions.edit_branches,
  },
  {
    element: <EditAddBranches />,
    path: "branches/add",
    screen: Permissions.add_branches,
  },

  { element: <Roles />, path: "roles", screen: Permissions.get_roles },
  {
    element: <EditAddRoles />,
    path: "roles/:id",
    screen: Permissions.edit_roles,
  },
  {
    element: <EditAddRoles />,
    path: "roles/add",
    screen: Permissions.add_roles,
  },

  { element: <Users />, path: "users", screen: Permissions.get_users },
  {
    element: <EditAddUsers />,
    path: "users/:id",
    screen: Permissions.edit_users,
  },
  {
    element: <EditAddUsers />,
    path: "users/add",
    screen: Permissions.add_users,
  },

  {
    element: <EditPermission />,
    path: "permissions/:id",
    screen: Permissions.edit_roles,
  },

  {
    element: <Reviews />,
    path: "reviews",
    screen: Permissions.get_reviews,
  },
];

const App = () => {
  const lang = useAppSelector(langSelector);
  const token = useAppSelector(tokenSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { error, isLoading, data } = useToken({});

  useEffect(() => {
    if (!token) navigate("/login");
    if (!!error) dispatch(logoutHandler());
  }, [token, error]);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  if (isLoading) return <Loading />;

  return (
    <Routes>
      <Route
        element={
          <Suspend>
            <Login />
          </Suspend>
        }
        path={"/login"}
      />

      <Route
        element={
          <Suspend>
            <AdminRoutes />
          </Suspend>
        }
        path={"/"}
      >
        <Route
          path={"*"}
          index
          element={
            <Suspend>
              <Dashboard />
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
        <Route
          path={"hr-dashboard/:sphere"}
          element={
            <Suspend>
              <HRRequestBlock />
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
    </Routes>
  );
};

export default App;
