// import { useGoogleAuth } from "../service/auth/google-auth";
import withUser from "../service/auth/withUser";
// import { GoogleLogIn } from "./components/google-login-button/GoogleLogIn";
// import { GoogleLogout } from "./components/google-logout-button/GoogleLogout";

const Setting = ({ user }) => {
  //const { handleAuthClick, handleGoogleLogout } = useGoogleAuth();

  return (
    <div className="flex max-w-[1240px] w-full mx-auto pt-4 font-bold px-4 mb-2">
      Settings
    </div>
  );
};

export default withUser(Setting);
