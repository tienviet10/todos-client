import withUser from "../service/auth/withUser";
import { useManageProfileState } from "../service/reminders-manage-state/manage-profile-state";
import { GoogleLogIn } from "./components/google-login-button/GoogleLogIn";
import { GoogleLogout } from "./components/google-logout-button/GoogleLogout";

const Profile = ({ user }) => {
  const {
    username,
    newPassword,
    newPasswordConfirmation,
    handleAuthClick,
    handleGoogleLogout,
    handleFieldChange,
    handleSummit,
    t,
  } = useManageProfileState(user);

  return (
    <div className="flex max-w-[1240px] w-full mx-auto pt-4 font-bold px-4 mb-2">
      <div className="bg-white my-12 pb-6 w-full justify-center items-center overflow-hidden md:max-w-md rounded-lg shadow-sm mx-auto">
        <div className="relative h-40">
          <img
            className="absolute h-full w-full object-cover"
            src="images/600_background_image.jpg"
            alt="background"
          />
        </div>
        <div className="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
          <img
            className="object-cover w-full h-full"
            src={
              user.user && user.user.picture && user.user.picture !== ""
                ? user.user.picture
                : "images/placeholder.jpg"
            }
            alt="main"
          />
        </div>
        {username && (
          <div className="mt-16 text-2xl text-center font-semibold">
            {username}
          </div>
        )}

        <div className="m-auto py-5 px-12 w-full">
          <label className="text-gray-600 font-medium">{t("username")}</label>

          <input
            className="border-solid border-gray-300 border mr-2 py-2 px-4 w-full rounded text-gray-700"
            name="username"
            value={username}
            placeholder="username to display"
            autoFocus
            onChange={handleFieldChange("username")}
          />

          <label className="text-gray-600 font-medium block mt-4">
            {t("new_pass")}
          </label>
          <input
            className="border-solid border-gray-300 border mr-2 py-2 px-4 w-full rounded text-gray-700"
            name="newPassword"
            value={newPassword}
            type="password"
            placeholder="**********"
            autoFocus
            onChange={handleFieldChange("newPassword")}
          />

          <label className="text-gray-600 font-medium block mt-4">
            {t("new_pass_confirm")}
          </label>
          <input
            className="border-solid border-gray-300 border mr-2 py-2 px-4 w-full rounded text-gray-700"
            name="newPasswordConfirmation"
            value={newPasswordConfirmation}
            type="password"
            placeholder="**********"
            autoFocus
            onChange={handleFieldChange("newPasswordConfirmation")}
          />
          <div>
            <label className="text-gray-600 text-center font-medium block mt-4">
              {t("connect_google")}
            </label>
            <div className="flex justify-center mt-2">
              {user.user &&
              user.user.refreshToken &&
              user.user.refreshToken === 1 ? (
                <GoogleLogout
                  onClick={() => handleGoogleLogout(user.user._id)}
                />
              ) : (
                <GoogleLogIn onClick={handleAuthClick} />
              )}
            </div>
          </div>
          <button
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 mt-14"
            onClick={() => handleSummit()}
          >
            {t("update_info")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default withUser(Profile);
