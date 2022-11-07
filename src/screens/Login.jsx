import React from "react";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillFire,
  AiFillLock,
} from "react-icons/ai";
import { useLogIn } from "../service/auth/login";
import Error from "../shared/components/Error";
import Loader from "../shared/components/loading-spinner/CenterLoader";
import Success from "../shared/components/Success";
import { NAV_TABS } from "../shared/constant/config";

export const Login = () => {
  const {
    login,
    open,
    loading,
    error,
    success,
    email,
    password,
    buttonText,
    toggle,
    handleChange,
    navigate,
  } = useLogIn();

  return (
    <div className="grid place-items-center h-screen bg-[#081730]">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src="/logo.svg" alt="ReMe" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Sign in to your account
            </h2>
          </div>
          {loading && <Loader />}
          {error && <Error error={error} />}
          {success && <Success success="Your Registration is successful" />}
          <form
            className="mt-8 space-y-8"
            method="POST"
            onSubmit={(e) => login(e)}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  required
                  className="relative appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md sm:text-sm outline-none"
                  placeholder="Email address"
                  onChange={handleChange("email")}
                />
              </div>
              <div className="relative flex flex-wrap items-stretch w-full border border-gray-300 rounded-b-md">
                <input
                  type={open === false ? "password" : "text"}
                  id="password"
                  name="password"
                  value={password}
                  autoComplete="current-password"
                  required
                  className="flex-shrink flex-grow flex-auto px-3 py-2 outline-none rounded-bl-md placeholder-gray-500 text-gray-900 sm:text-sm"
                  placeholder="Password"
                  onChange={handleChange("password")}
                />
                <div className="flex bg-white rounded-br-md">
                  <span className="flex items-center text-2xl mr-1">
                    {open === false ? (
                      <AiFillEye onClick={toggle} />
                    ) : (
                      <AiFillEyeInvisible onClick={toggle} />
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                className="group relative flex w-full justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute flex left-0 inset-y-0 items-center pl-3">
                  <AiFillLock
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                {buttonText}
              </button>
            </div>
          </form>
          <div>
            <button
              disabled={loading}
              type="button"
              className="group relative flex w-full justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                navigate(NAV_TABS[5].href);
              }}
            >
              <span className="absolute flex left-0 inset-y-0 items-center pl-3">
                <AiFillFire
                  className="h-5 w-5 text-red-400 group-hover:text-red-300"
                  aria-hidden="true"
                />
              </span>
              Register Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
