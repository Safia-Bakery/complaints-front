import { FC, Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cl from "classnames";
import { Sidebar, Menu, MenuItem, MenuItemStyles } from "react-pro-sidebar";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import "./index.scss";
import safiaLogo from "/images/safia-logo.png";
import arrow from "/icons/whiteArrow.svg";

const routes = [
  {
    name: "dashboard",
    url: "/dashboard",
    icon: "/icons/dashboard.svg",
    activeIcon: "/icons/dashboard-active.svg",
  },
  {
    name: "complaints",
    url: "/complaints",
    icon: "/icons/complaints.svg",
    activeIcon: "/icons/complaints-active.svg",
  },
  {
    name: "inside-cmp",
    url: "/inside-complaints",
    icon: "/icons/inside-complaints.svg",
    activeIcon: "/icons/inside-complaints-active.svg",
  },
  {
    name: "comments",
    url: "/comments",
    icon: "/icons/comments.svg",
    activeIcon: "/icons/comments-active.svg",
  },
  {
    name: "OKK",
    url: "/okk",
    icon: "/icons/okk.svg",
    activeIcon: "/icons/okk-active.svg",
  },
  {
    name: "hr-fabric",
    url: "/hr-fabric",
    icon: "/icons/hr.svg",
    activeIcon: "/icons/hr-active.svg",
  },
  {
    name: "hr-retail",
    url: "/hr-retail",
    icon: "/icons/hr.svg",
    activeIcon: "/icons/hr-active.svg",
  },
  {
    name: "users",
    url: "/users",
    icon: "/icons/users.svg",
    activeIcon: "/icons/users-active.svg",
  },
  {
    name: "positions",
    url: "/positions",
    icon: "/icons/positions.svg",
    activeIcon: "/icons/positions-active.svg",
  },
  {
    name: "branches",
    url: "/branches",
    icon: "/icons/location.svg",
    activeIcon: "/icons/location-active.svg",
  },
  {
    name: "countries",
    url: "/countries",
    icon: "/icons/location.svg",
    activeIcon: "/icons/location-active.svg",
  },
  {
    name: "categories",
    url: "/categories",
    icon: "/icons/location.svg",
    activeIcon: "/icons/location-active.svg",
  },
];

export const Playground: FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [collapsed, $collapsed] = useState(false);

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  const handleSidebar = () => $collapsed((prev) => !prev);

  return (
    <>
      {collapsed && <div className={styles.overlay} onClick={handleSidebar} />}
      <Sidebar
        // collapsed={collapsed}
        className={cl(styles.sidebar)}
        // toggled={collapsed}
        onBackdropClick={handleSidebar}
        image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
        rtl={false}
        collapsed={!collapsed}
        breakPoint="md"
        backgroundColor={"rgba(21, 28, 40, 0.8)"}
      >
        <div className="flex flex-col h-full relative">
          <div className="flex-1">
            <div className="p-5">
              <img src={safiaLogo} alt="safia-logo" height={32} width={32} />
            </div>
            <button
              onClick={handleSidebar}
              className={cl(
                "rounded-full w-8 h-8 bg-black shadow-xl absolute top-16 -right-4 transition-transform delay-300",
                { ["rotate-180"]: !collapsed }
              )}
            >
              <img src={arrow} alt="" className="m-auto" />
            </button>
            <Menu menuItemStyles={menuItemStyles} className="mt-6">
              {/* <MenuItem
                className={cl(styles.content)}
                active={pathname === "/home"}
                onClick={() => navigate("/home")}
                icon={
                  <img
                    className={styles.routeIcon}
                    height={30}
                    width={30}
                    src={"/assets/icons/controlPanel.svg"}
                  />
                }
              >
                {t("dashboard")}  
              </MenuItem> */}
              {routes.map((route) => (
                <Fragment key={route.url + route.name}>
                  {
                    <MenuItem
                      className={cl(styles.content)}
                      active={pathname.includes(route.url!)}
                      onClick={() => navigate(`${route.url}`)}
                      icon={
                        <img
                          className={styles.routeIcon}
                          src={
                            pathname.includes(route.url!)
                              ? route.activeIcon
                              : route.icon
                          }
                          alt={route.name}
                        />
                      }
                    >
                      {t(route.name)}
                    </MenuItem>
                  }
                </Fragment>
              ))}
            </Menu>
          </div>
        </div>
      </Sidebar>
    </>
  );
};
