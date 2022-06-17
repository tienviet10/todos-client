import { useGoogleAuth } from "../service/auth/google-auth";
import { GoogleLogIn } from "./components/google-login-button/GoogleLogIn";

const Setting = () => {
  const { handleAuthClick } = useGoogleAuth();
  return (
    <div className="max-w-[1240px] w-full mx-auto pt-4 font-bold px-4 mb-2">
      <GoogleLogIn onClick={handleAuthClick} />
    </div>
  );
};

export default Setting;
