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
    onClick,
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
                          tabName={NAV_TABS[0].displayName}
                          selectedNavTab={selectedNavTab}
                        />
                        {/* Share tab */}
                        <LinkComponentDesktopTabs
                          item={NAV_TABS[1]}
                          changeTabsWithoutNavigation={
                            changeTabsWithoutNavigation
                          }
                          tabName={NAV_TABS[1].displayName}
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
                        Home
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
                    Add Reminder
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
                // Sign In button if the user is not sign in
                <button
                  onClick={onClick}
                  className={`bg-application-color hover:bg-[#6c5cff] text-white font-bold py-1 px-2 sm:py-2 sm:px-4 border border-[#6c5cff] rounded`}
                >
                  Sign In
                </button>
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
                  Home
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
