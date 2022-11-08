import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { NAV_TABS } from "../../shared/constant/config";
import i18next from "i18next";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthServiceContext";
import { ReminderModalContext } from "../context/ReminderModalContext";

const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    code: "vi",
    name: "Vietnamese",
    country_code: "vn",
  },
];

export function useManageNavbarState(setNavTab) {
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();

  const { setModalOn } = useContext(ReminderModalContext);
  const { isAuth, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [expandLanguages, setExpandLanguages] = useState(false);

  // const onClick = () => {
  //   navigate(NAV_TABS[6].name);
  // };
  useEffect(() => {
    document.title = t("app_title");
  }, [currentLanguage, t]);

  const changeTabsWithoutNavigation = (name) => {
    setDropdownOpen(false);
    setNavTab(name);
  };

  const toggleAddReminder = () => {
    setDropdownOpen(false);
    setModalOn(true);
  };

  const changeTabsAndNavigation = (name, href) => {
    setDropdownOpen(false);
    setNavTab(name);
    navigate(href);
  };

  const changeLanguages = (lang) => {
    i18next.changeLanguage(lang);
    setExpandLanguages(false);
  };

  return {
    setDropdownOpen,
    isAuth,
    changeTabsWithoutNavigation,
    changeTabsAndNavigation,
    toggleAddReminder,
    dropdownOpen,
    logout,
    navigate,
    // onClick,
    expandLanguages,
    setExpandLanguages,
    languages,
    t,
    changeLanguages,
  };
}
