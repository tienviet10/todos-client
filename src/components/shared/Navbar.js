import React, { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import withUser from "../../service/auth/withUser";
import { ModalContext } from "../../service/context/ModalContext";
import { AuthContext } from "../../service/context/AuthService";

const tabsNav = [
  { name: "Reminder", href: "/dashboard", current: true },
  { name: "Share", href: "/team", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ setNavTab }) => {
  const [navigation, setNavigation] = useState(tabsNav);
  const { setModalOn } = useContext(ModalContext);
  const { isAuth, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const changeCurrentSelection = (itemName) => {
    const newList = navigation.map((item) => {
      if (item.current === true) {
        const updatedItem = {
          ...item,
          current: !item.current,
        };
        return updatedItem;
      }

      if (item.name === itemName) {
        const updatedItem = {
          ...item,
          current: !item.current,
        };

        return updatedItem;
      }

      return item;
    });

    setNavigation(newList);
  };

  const onClick = () => {
    navigate("login");
  };
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <AiOutlineClose size={20} />
                  ) : (
                    <AiOutlineMenu size={20} />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="hidden sm:block h-8 sm:w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  {/* <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  /> */}
                  <h1
                    className={`hidden lg:block h-10 w-auto text-3xl px-5 text-application-color cursor-pointer`}
                    onClick={() => navigate("/dashboard")}
                  >
                    ReMe
                  </h1>
                </div>
                {/* <h1 className="text-3xl text-[#00df9a]">ReMe</h1> */}
                <div className="hidden sm:block sm:ml-6 mt-1">
                  <div className="flex space-x-4">
                    {isAuth ? (
                      navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          onClick={() => {
                            changeCurrentSelection(item.name);
                            setNavTab(item.name);
                          }}
                        >
                          {item.name}
                        </Link>
                      ))
                    ) : (
                      <Link
                        key="home"
                        to="/"
                        className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Home
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {isAuth ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Notification Bell icon */}
                  {/* <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <AiFillBell className="h-6 w-6" aria-hidden="true" />
                </button> */}

                  {/* Add new reminder */}
                  <button
                    onClick={() => setModalOn(true)}
                    className="bg-transparent sm:hover:bg-[#00df9a] text-[#00df9a] font-semibold sm:hover:text-white py-1 px-2 sm:px-4 border border-[#00df9a] sm:hover:border-transparent rounded-full mr-2 sm:mr-4 sm:block"
                  >
                    Add Reminder
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
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
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              key="profile"
                              to="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              key="setting"
                              to="/setting"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
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
                <button
                  onClick={onClick}
                  className={`bg-application-color hover:bg-[#6c5cff] text-white font-bold py-1 px-2 sm:py-2 sm:px-4 border border-[#6c5cff] rounded`}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuth ? (
                navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    onClick={() => {
                      changeCurrentSelection(item.name);
                      setNavTab(item.name);
                    }}
                  >
                    {item.name}
                  </Link>
                ))
              ) : (
                <Link
                  key="home"
                  to="/"
                  className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </Link>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default withUser(Navbar);
