import { FC, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cl from "classnames";
import { Sidebar, Menu, MenuItem, MenuItemStyles } from "react-pro-sidebar";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import { sidebarHandler, toggleSidebar } from "@/store/reducers/selects";
import "./index.scss";
import { useAppDispatch, useAppSelector } from "@/store/rootConfig";
import safiaLogo from "/images/safia-logo.png";

const routes = [
  {
    name: "dashboard",
    url: "/dashboard",
    icon: "/icons/dashboard.svg",
    activeIcon: "/icons/dashboard-active.svg",
  },
];

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const Playground: FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const collapsed = useAppSelector(toggleSidebar);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleSidebar = () => dispatch(sidebarHandler(!collapsed));

  return (
    <>
      {collapsed && <div className={styles.overlay} onClick={handleSidebar} />}
      <Sidebar
        // collapsed={collapsed}
        className={cl(styles.sidebar, { [styles.collapsed]: collapsed })}
        toggled={collapsed}
        onBackdropClick={handleSidebar}
        image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
        rtl={false}
        breakPoint="md"
        backgroundColor={hexToRgba("#151C28", 0.8)}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <div className="">
              <img src={safiaLogo} alt="safia-logo" height={32} width={32} />
            </div>
            <Menu menuItemStyles={menuItemStyles}>
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
                      icon={<img src={route.icon} alt={route.name} />}
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
