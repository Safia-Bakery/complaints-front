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

const App = () => {
  const lang = useAppSelector(langSelector);
  const token = useAppSelector(tokenSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { error, isLoading } = useToken({});

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
          path={"dashboard"}
          index
          element={
            <Suspend>
              <Dashboard />
            </Suspend>
          }
        />
        <Route
          path={"*"}
          element={
            <Suspend>
              <Dashboard />
            </Suspend>
          }
        />

        <Route
          path={"complaints"}
          index
          element={
            <Suspend>
              <Complaints />
            </Suspend>
          }
        />
        <Route
          path={"complaints/add"}
          element={
            <Suspend>
              <AddComplaint />
            </Suspend>
          }
        />
        <Route
          path={"complaints/:id"}
          element={
            <Suspend>
              <ShowComplaint />
            </Suspend>
          }
        />

        <Route
          path={"hr-dashboard/:sphere"}
          element={
            <Suspend>
              <HRDashboard />
            </Suspend>
          }
        />
        <Route
          path={"hr-dashboard/:sphere"}
          element={
            <Suspend>
              <HRRequestBlock />
            </Suspend>
          }
        >
          <Route
            path={":hrdep"}
            element={
              <Suspend>
                <HRRequests />
              </Suspend>
            }
          />
          <Route
            path={"qa"}
            element={
              <Suspend>
                <HRQa />
              </Suspend>
            }
          />
          <Route
            path={":hrdep/:id"}
            element={
              <Suspend>
                <ShowHRRequest />
              </Suspend>
            }
          />
          <Route
            path={":hrdep/edit/:id"}
            element={
              <Suspend>
                <EditAddHRQa />
              </Suspend>
            }
          />
          <Route
            path={":hrdep/add"}
            element={
              <Suspend>
                <EditAddHRQa />
              </Suspend>
            }
          />
        </Route>

        <Route
          path={"countries"}
          element={
            <Suspend>
              <Countries />
            </Suspend>
          }
        />
        <Route
          path={"countries/:id"}
          element={
            <Suspend>
              <EditAddCountries />
            </Suspend>
          }
        />
        <Route
          path={"countries/add"}
          element={
            <Suspend>
              <EditAddCountries />
            </Suspend>
          }
        />

        <Route
          path={"categories"}
          element={
            <Suspend>
              <Categories />
            </Suspend>
          }
        />
        <Route
          path={"categories/:id"}
          element={
            <Suspend>
              <EditAddCategories />
            </Suspend>
          }
        />
        <Route
          path={"categories/add"}
          element={
            <Suspend>
              <EditAddCategories />
            </Suspend>
          }
        />

        <Route
          path={"categories/:id/child"}
          element={
            <Suspend>
              <SubCategories />
            </Suspend>
          }
        />
        <Route
          path={"categories/:id/child/:childId"}
          element={
            <Suspend>
              <EditAddSubCategory />
            </Suspend>
          }
        />
        <Route
          path={"categories/:id/child/add"}
          element={
            <Suspend>
              <EditAddSubCategory />
            </Suspend>
          }
        />

        <Route
          path={"branches"}
          element={
            <Suspend>
              <Branches />
            </Suspend>
          }
        />
        <Route
          path={"branches/:id"}
          element={
            <Suspend>
              <EditAddBranches />
            </Suspend>
          }
        />
        <Route
          path={"branches/add"}
          element={
            <Suspend>
              <EditAddBranches />
            </Suspend>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
