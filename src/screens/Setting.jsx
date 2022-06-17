import { useGoogleAuth } from "../service/auth/google-auth";
import withUser from "../service/auth/withUser";
import { GoogleLogIn } from "./components/google-login-button/GoogleLogIn";

const Setting = ({ user }) => {
  const { handleAuthClick } = useGoogleAuth();
  return (
    <div className="flex max-w-[1240px] w-full mx-auto pt-4 font-bold px-4 mb-2">
      <GoogleLogIn onClick={handleAuthClick} />
      {user.user && user.user.name && (
        <img src="images/done.png" className="ml-3 h-8 w-8" alt="" />
      )}
    </div>
  );
};

export default withUser(Setting);
