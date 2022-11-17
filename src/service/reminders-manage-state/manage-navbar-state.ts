import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
// import { NAV_TABS } from "../../shared/constant/config";
import i18next from "i18next";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { languages } from "../../shared/constant/config";
import { ManageNavbarStateType } from "../../shared/types/ManageStateType";
import { AuthContext } from "../context/AuthServiceContext";
import { ReminderModalContext } from "../context/ReminderModalContext";

export function useManageNavbarState(
  setNavTab: Dispatch<SetStateAction<string>>
): ManageNavbarStateType {
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { setModalOn } = useContext(ReminderModalContext);
  const { isAuth, logout } = useContext(AuthContext);

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [expandLanguages, setExpandLanguages] = useState<boolean>(false);

  useEffect(() => {
    document.title = t("app_title");
  }, [currentLanguage, t]);

  const changeTabsWithoutNavigation = (name: string) => {
    setDropdownOpen(false);
    setNavTab(name);
  };

  const toggleAddReminder = () => {
    setDropdownOpen(false);
    setModalOn(true);
  };

  const changeTabsAndNavigation = (name: string, href: string) => {
    setDropdownOpen(false);
    setNavTab(name);
    navigate(href);
  };

  const changeLanguages = (lang: string) => {
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
    expandLanguages,
    setExpandLanguages,
    languages,
    t,
    changeLanguages,
  };
}
