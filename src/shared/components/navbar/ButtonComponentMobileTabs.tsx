import { Disclosure } from "@headlessui/react";
import { EachTab } from "../../types/Tab";
import { classNames } from "../color-picker/color-choice";

export const ButtonComponentMobileTabs = ({
  item,
  changeTabsAndNavigation,
  tabName,
  selectedNavTab,
}: {
  item: EachTab;
  changeTabsAndNavigation: (name: string, href: string) => void;
  tabName: string;
  selectedNavTab: string;
}) => {
  return (
    <Disclosure.Button
      key={item.name}
      className={classNames(
        item.name === selectedNavTab
          ? "bg-gray-700 text-white"
          : "text-gray-300 hover:bg-gray-600 hover:text-white",
        "block px-3 py-2 rounded-md text-base font-medium"
      )}
      onClick={() => changeTabsAndNavigation(item.name, item.href)}
    >
      {tabName}
    </Disclosure.Button>
  );
};
