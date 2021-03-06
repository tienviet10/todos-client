import React from "react";
import { Link } from "react-router-dom";
import { classNames } from "../color-picker/color-choice";

export const LinkComponentDesktopTabs = ({
  item,
  changeTabsWithoutNavigation,
  tabName,
  selectedNavTab,
}) => {
  return (
    <Link
      key={item.name}
      to={item.href}
      className={classNames(
        item.name === selectedNavTab
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white",
        "px-3 py-2 rounded-md text-sm font-medium"
      )}
      onClick={() => changeTabsWithoutNavigation(item.name)}
    >
      {tabName}
    </Link>
  );
};
