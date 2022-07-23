import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthServiceContext";
import { ReminderModalContext } from "../context/ReminderModalContext";

const tabsNav = [
  { name: "Reminder", href: "/personal-reminders", current: true },
  { name: "Share", href: "/shared-reminders", current: false },
  { name: "Profile", href: "/profile", current: false },
  { name: "Setting", href: "/setting", current: false },
];

export function useManageNavbarState(setNavTab) {
  const { setModalOn } = useContext(ReminderModalContext);
  const { isAuth, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navigation, setNavigation] = useState(tabsNav);
  const navigate = useNavigate();

  const changeCurrentSelection = (itemName) => {
    const newList = navigation.map((item) => {
      return item.name === itemName
        ? {
            ...item,
            current: true,
          }
        : {
            ...item,
            current: false,
          };
    });
    setDropdownOpen(false);
    setNavigation(newList);
  };

  const onClick = () => {
    navigate("login");
  };

  const sendToHomeScreenFromLogo = () => {
    setDropdownOpen(false);
    changeCurrentSelection("Reminder");
    navigate("/personal-reminders");
  };

  const changeTabs = (name) => {
    changeCurrentSelection(name);
    setNavTab(name);
  };

  const toggleAddReminder = () => {
    setDropdownOpen(false);
    setModalOn(true);
  };

  const changeTabsInMobile = (item) => {
    changeCurrentSelection(item.name);
    setNavTab(item.name);
    navigate(item.href);
  };

  return {
    setDropdownOpen,
    sendToHomeScreenFromLogo,
    isAuth,
    navigation,
    changeTabs,
    toggleAddReminder,
    dropdownOpen,
    changeCurrentSelection,
    logout,
    changeTabsInMobile,
    navigate,
    onClick,
  };
}
