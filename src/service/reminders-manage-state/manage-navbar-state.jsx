import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NAV_TABS } from "../../shared/constant/config";
import { AuthContext } from "../context/AuthServiceContext";
import { ReminderModalContext } from "../context/ReminderModalContext";

export function useManageNavbarState(setNavTab) {
  const { setModalOn } = useContext(ReminderModalContext);
  const { isAuth, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const onClick = () => {
    navigate(NAV_TABS[6].name);
  };

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

  return {
    setDropdownOpen,
    isAuth,
    changeTabsWithoutNavigation,
    changeTabsAndNavigation,
    toggleAddReminder,
    dropdownOpen,
    logout,
    navigate,
    onClick,
  };
}
