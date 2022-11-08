import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import withUser from "../../../service/auth/withUser";
import { useManageNavbarState } from "../../../service/reminders-manage-state/manage-navbar-state";
import { NAV_TABS } from "../../constant/config";
import { BellNotification } from "../bell-notifications/BellNotification";

import { classNames } from "../color-picker/color-choice";
import { ButtonComponentMobileTabs } from "./ButtonComponentMobileTabs";
import { LinkComponentDesktopTabs } from "./LinkComponentDesktopTabs";
import { LinkComponentProfileIcon } from "./LinkComponentProfileIcon";

const GlobeIcon = ({ width = 23, height = 23, color = "black" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={color}
    className="bi bi-globe"
    viewBox="0 0 16 16"
  >
    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
  </svg>
);

const Navbar = ({ setNavTab, user, selectedNavTab }) => {
  const {
    isAuth,
    setDropdownOpen,
    dropdownOpen,
    changeTabsWithoutNavigation,
    toggleAddReminder,
    logout,
    changeTabsAndNavigation,
    navigate,
    // onClick,
    expandLanguages,
    setExpandLanguages,
    languages,
    t,
    changeLanguages,
  } = useManageNavbarState(setNavTab);

  return (
    <Disclosure as="nav" className="bg-[#020917]">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              {/* Mobile menu button*/}
              <div
                className="absolute flex inset-y-0 left-0 items-center sm:hidden"
                onClick={() => setDropdownOpen(false)}
              >
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <AiOutlineClose size={20} />
                  ) : (
                    <AiOutlineMenu size={20} />
                  )}
                </Disclosure.Button>
              </div>

              {/* Logo symbols and words -> Click to bring it to home/reminder tab */}
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="hidden sm:block h-8 sm:w-auto"
                    src="/logo.svg"
                    alt="ReMe"
                  />
                  <h1
                    className={`hidden lg:block h-10 w-auto text-3xl px-5 text-application-color cursor-pointer`}
                    onClick={() =>
                      changeTabsAndNavigation(
                        NAV_TABS[0].name,
                        NAV_TABS[0].href
                      )
                    }
                  >
                    ReMe
                  </h1>
                </div>

                {/* Visible choices on large screen (desktop) */}
                <div className="hidden sm:block sm:ml-6 mt-1">
                  <div className="flex space-x-4">
                    {isAuth ? (
                      <>
                        {/* Reminder tab */}
                        <LinkComponentDesktopTabs
                          item={NAV_TABS[0]}
                          changeTabsWithoutNavigation={
                            changeTabsWithoutNavigation
                          }
                          // tabName={NAV_TABS[0].displayName}
                          tabName={t("reminder_tab")}
                          selectedNavTab={selectedNavTab}
                        />
                        {/* Share tab */}
                        <LinkComponentDesktopTabs
                          item={NAV_TABS[1]}
                          changeTabsWithoutNavigation={
                            changeTabsWithoutNavigation
                          }
                          // tabName={NAV_TABS[1].displayName}
                          tabName={t("shared_reminder_tab")}
                          selectedNavTab={selectedNavTab}
                        />
                      </>
                    ) : (
                      // If not sign in, show Home tab
                      <Link
                        key="home"
                        to="/"
                        className="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        {t("home_tab")}
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {isAuth ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Add a new reminder */}
                  <button
                    onClick={() => toggleAddReminder()}
                    className={classNames(
                      selectedNavTab === NAV_TABS[0].name ||
                        selectedNavTab === NAV_TABS[1].name
                        ? "sm:hover:bg-[#00df9a] sm:hover:text-white sm:hover:border-transparent text-[#00df9a] border-[#00df9a]"
                        : "hover:cursor-default text-white border-grey-300",
                      "bg-transparent font-semibold py-1 px-2 sm:px-4 border rounded-full mr-2 sm:mr-4 sm:block"
                    )}
                  >
                    {t("add_reminders")}
                  </button>

                  {/* Notification Bell icon */}
                  <BellNotification
                    dropdownOpen={dropdownOpen}
                    setDropdownOpen={setDropdownOpen}
                    setNavTab={setNavTab}
                  />

                  {/* Profile dropdown and its menu */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex bg-gray-800 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={
                            user.user &&
                            user.user.picture &&
                            user.user.picture !== ""
                              ? user.user.picture
                              : "images/placeholder.jpg"
                          }
                          alt=""
                          onClick={() => setDropdownOpen(false)}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute origin-top-right right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        {/* Profile tab */}
                        <LinkComponentProfileIcon
                          changeTabsWithoutNavigation={
                            changeTabsWithoutNavigation
                          }
                          link={NAV_TABS[2].name}
                          displayName={NAV_TABS[2].displayName}
                        />
                        {/* Friends tab */}
                        <LinkComponentProfileIcon
                          changeTabsWithoutNavigation={
                            changeTabsWithoutNavigation
                          }
                          link={NAV_TABS[4].name}
                          displayName={NAV_TABS[4].displayName}
                        />
                        {/* Setting tab */}
                        <LinkComponentProfileIcon
                          changeTabsWithoutNavigation={
                            changeTabsWithoutNavigation
                          }
                          link={NAV_TABS[3].name}
                          displayName={NAV_TABS[3].displayName}
                        />
                        {/* Sign out tab */}
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                              onClick={() => logout()}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                // // Sign In button if the user is not sign in
                // <button
                //   onClick={onClick}
                //   className={`bg-application-color hover:bg-[#6c5cff] text-white font-bold py-1 px-2 sm:py-2 sm:px-4 border border-[#6c5cff] rounded`}
                // >
                //   Sign In
                // </button>

                // <GlobeIcon color="#6366f1" />
                <div className="relative inline-block text-left">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-application-color px-2 py-1.5 text-sm font-medium shadow-sm text-white"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setExpandLanguages((prev) => !prev)}
                  >
                    <GlobeIcon color="white" />
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <div
                    className={
                      expandLanguages
                        ? "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-application-color shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-white"
                        : "hidden absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-application-color shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-white"
                    }
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    <div className="py-1" role="none">
                      {languages.map(({ code, name, country_code }) => (
                        <div
                          key={country_code}
                          className="px-2 py-2 text-sm w-full"
                        >
                          <button
                            className="flex ml-5 w-full"
                            onClick={() => changeLanguages(code)}
                          >
                            <img
                              src={`images/${code}.png`}
                              style={{ width: 30 }}
                              alt=""
                            />
                            <p className="ml-4">{name}</p>
                          </button>
                        </div>
                      ))}

                      {/* <a
                        href="/"
                        className="block px-4 py-2 text-sm"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-0"
                      >
                        English
                      </a>
                      <a
                        href="/"
                        className="block px-4 py-2 text-sm"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-1"
                      >
                        France
                      </a>
                      <a
                        href="/"
                        className="block px-4 py-2 text-sm"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-2"
                      >
                        Vietnamese
                      </a> */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Opened tab in mobile mode */}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuth ? (
                <>
                  {/* Reminder tab in mobile */}
                  <ButtonComponentMobileTabs
                    item={NAV_TABS[0]}
                    changeTabsAndNavigation={changeTabsAndNavigation}
                    tabName={NAV_TABS[0].displayName}
                    selectedNavTab={selectedNavTab}
                  />
                  {/* Share tab in mobile */}
                  <ButtonComponentMobileTabs
                    item={NAV_TABS[1]}
                    changeTabsAndNavigation={changeTabsAndNavigation}
                    tabName={NAV_TABS[1].displayName}
                    selectedNavTab={selectedNavTab}
                  />
                </>
              ) : (
                <Disclosure.Button
                  key="home"
                  className="bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => navigate("/")}
                >
                  {t("home_tab")}
                </Disclosure.Button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default withUser(Navbar);
