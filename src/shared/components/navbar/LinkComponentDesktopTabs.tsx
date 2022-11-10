import { Link } from "react-router-dom";
import { EachTab } from "../../types/Tab";
import { classNames } from "../color-picker/color-choice";

export const LinkComponentDesktopTabs = ({
  item,
  changeTabsWithoutNavigation,
  tabName,
  selectedNavTab,
}: {
  item: EachTab;
  changeTabsWithoutNavigation: (name: string) => void;
  tabName: string;
  selectedNavTab: string;
}): JSX.Element => {
  return (
    <Link
      key={item.name}
      to={item.href}
      className={classNames(
        item.name === selectedNavTab
          ? "bg-gray-600 text-white"
          : "text-gray-300 hover:bg-gray-600 hover:text-white",
        "px-3 py-2 rounded-md text-sm font-medium"
      )}
      onClick={() => changeTabsWithoutNavigation(item.name)}
    >
      {tabName}
    </Link>
  );
};
