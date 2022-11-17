import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import { classNames } from "../color-picker/color-choice";

export const LinkComponentProfileIcon = ({
  changeTabsWithoutNavigation,
  link,
  displayName,
}: {
  changeTabsWithoutNavigation: (name: string) => void;
  link: string;
  displayName: string;
}) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          key={link}
          to={`/${link}`}
          className={classNames(
            active ? "bg-gray-100" : "",
            "block px-4 py-2 text-sm text-gray-700"
          )}
          onClick={() => changeTabsWithoutNavigation(link)}
        >
          {displayName}
        </Link>
      )}
    </Menu.Item>
  );
};
