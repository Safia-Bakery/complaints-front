import { Link, useLocation } from "react-router-dom";
import styles from "./index.module.scss";
import { ChangeEvent, FC } from "react";
import { logoutHandler } from "reducers/auth";
import { changeLanguage, langSelector, sidebarHandler } from "reducers/selects";
import useToken from "@/hooks/useToken";

import { useTranslation } from "react-i18next";
import { Language } from "@/utils/types";
import { useAppDispatch, useAppSelector } from "@/store/rootConfig";

interface Breadcrumb {
  path: string;
  name: string;
}

const routeNameMappings: { [key: string]: string } = {
  home: "main",
};

const Breadcrumbs: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const pathname = location.pathname;
  const dispatch = useAppDispatch();
  const handleLogout = () => dispatch(logoutHandler());
  const lang = useAppSelector(langSelector);

  const { data: me } = useToken({ enabled: false });

  const handleLang = (e: ChangeEvent<HTMLSelectElement>) =>
    dispatch(changeLanguage(e.target.value as Language));

  const breadcrumbs: Breadcrumb[] = [];

  const pathSegments = pathname
    .split("/")
    .filter((segment: string) => segment !== "");

  pathSegments.reduce((prevPath: string, currentPath: string) => {
    const path = `${prevPath}/${currentPath}`;
    const name = location?.state?.name
      ? location.state?.name
      : routeNameMappings[currentPath] || currentPath.replace(/-/g, " ");

    breadcrumbs.push({ path, name });

    return path;
  }, "");

  return (
    <div className={styles.block}>
      <div className={styles.container}>
        <ul className={styles.breadcrump}>
          <button
            onClick={() => dispatch(sidebarHandler(true))}
            className="btn btn-primary p-2   btn-round btn-icon mr-3"
          >
            <img
              width={22}
              className="flex"
              height={22}
              src="/assets/icons/burger.svg"
              alt="burger"
            />
          </button>
          {window.location.pathname !== "/home" && (
            <li>
              <Link to="/home">{t("main")}</Link>
            </li>
          )}
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.path}>
              {index === breadcrumbs.length - 1 ? (
                <span>{t(breadcrumb.name)}</span>
              ) : (
                <Link to={breadcrumb.path + location.search}>
                  {t(breadcrumb.name)}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="flex md:gap-4 gap-2">
          <select
            onChange={handleLang}
            value={lang}
            className="!bg-transparent"
          >
            {Object.keys(Language).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <span
            onClick={handleLogout}
            id="logout_btn"
            className={styles.logout}
          >
            {t("leave")} ({me?.name})
          </span>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
