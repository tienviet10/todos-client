import { AiFillFire } from "react-icons/ai";
import { useManageRegistrationState } from "../service/reminders-manage-state/manage-registration";
import Error from "../shared/components/Error";
import Loader from "../shared/components/loading-spinner/CenterLoader";
import Success from "../shared/components/Success";
import { NAV_TABS } from "../shared/constant/config";

export const Registration = () => {
  const {
    loading,
    error,
    success,
    register,
    username,
    handleChange,
    email,
    password,
    reconfirmedPassword,
    buttonText,
    navigate,
  } = useManageRegistrationState();

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="ReMe"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Register new account
            </h2>
          </div>
          {loading && <Loader />}
          {error && <Error error={error} />}
          {success && <Success success="Your Registration is successful" />}
          <form
            className="mt-8 space-y-6"
            method="POST"
            onSubmit={(e) => register(e)}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="Username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  value={username}
                  type="text"
                  required
                  className="relative appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  onChange={handleChange("username")}
                />
              </div>
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
                  className="relative appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={handleChange("email")}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  required
                  className="relative appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={handleChange("password")}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Re-confirmed Password
                </label>
                <input
                  id="reconfirmedPassword"
                  name="reconfirmedPassword"
                  type="password"
                  value={reconfirmedPassword}
                  required
                  className="relative appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Re-entered Password"
                  onChange={handleChange("reconfirmedPassword")}
                />
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                className="group relative flex w-full justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute flex left-0 inset-y-0 items-center pl-3">
                  <AiFillFire
                    className="h-5 w-5 text-red-400 group-hover:text-red-300"
                    aria-hidden="true"
                  />
                </span>
                {buttonText}
              </button>
            </div>
          </form>
          <div
            className="text-center cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            onClick={() => navigate(NAV_TABS[6].href)}
          >
            Return to Sign in
          </div>
        </div>
      </div>
    </div>
  );
};
