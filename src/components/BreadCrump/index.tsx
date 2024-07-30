import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./index.module.scss";
import { ChangeEvent, FC } from "react";
import { changeLanguage, langSelector } from "reducers/selects";
import useToken from "@/hooks/useToken";
import profileIcon from "/icons/profleIcon.svg";
import redDot from "/icons/redDot.svg";

import { useTranslation } from "react-i18next";
import { Language } from "@/utils/types";
import { useAppDispatch, useAppSelector } from "@/store/rootConfig";
import { logoutHandler } from "@/store/reducers/auth";

interface Breadcrumb {
  path: string;
  name: string;
}

const Breadcrumbs: FC = () => {
  const { t } = useTranslation();
  const { pathname, search } = useLocation();
  const dispatch = useAppDispatch();

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
    const name = currentPath || currentPath.replace(/-/g, " ");

    breadcrumbs.push({ path, name });

    return path;
  }, "");

  return (
    <div className={styles.block}>
      <div className={styles.container}>
        <ul className={styles.breadcrump}>
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.path}>
              {index === breadcrumbs.length - 1 ? (
                <span className="text-xl font-bold">{t(breadcrumb.name)}</span>
              ) : (
                <Link to={breadcrumb.path + search} className="text-xl">
                  {t(breadcrumb.name)}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="flex md:gap-4 gap-2 h-full">
          <div className="border-r border-r-[#C4C4C4] flex pr-8 py-3 h-full">
            <select
              onChange={handleLang}
              value={lang}
              className="!bg-transparent border-none"
            >
              {Object.keys(Language).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="ml-3 flex items-center gap-2">
            <div className="relative">
              <img
                src={profileIcon}
                alt="profile-img"
                className="rounded-full h-11 w-11"
              />
              <img src={redDot} alt="" className="absolute top-0 left-0" />
            </div>

            <button
              onClick={() => dispatch(logoutHandler())}
              className="font-medium text-sm cursor-pointer"
            >
              {me?.name ?? me?.username}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
