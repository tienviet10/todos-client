import { TFunction } from "i18next";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { UserData } from "../../shared/types/User";
import { useGoogleAuth } from "../auth/google-auth";
import { PasswordConfirmationProfileContext } from "../context/PasswordConfirmationProfileContext";

export function useManageProfileState(user: UserData): {
  username: string;
  newPassword: string;
  newPasswordConfirmation: string;
  handleAuthClick: () => void;
  handleGoogleLogout: (userID: any) => void;
  handleFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSummit: () => void;
  t: TFunction<"translation", undefined>;
} {
  const { t } = useTranslation();

  const {
    setPassConfirmationProfileToggle,
    setNewPasswordUpdate,
    newPasswordUpdate,
  } = useContext(PasswordConfirmationProfileContext);

  const { username, newPassword, newPasswordConfirmation } = newPasswordUpdate;

  const { handleAuthClick, handleGoogleLogout } = useGoogleAuth();

  useEffect(() => {
    if (user && user.user) {
      setNewPasswordUpdate((item) => ({
        ...item,
        username: user.user.username,
        email: user.user.email,
      }));
    }
  }, [user, setNewPasswordUpdate]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPasswordUpdate((item) => ({
      ...item,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSummit = () => {
    if (newPassword === newPasswordConfirmation) {
      setPassConfirmationProfileToggle(true);
    }
  };

  return {
    username,
    newPassword,
    newPasswordConfirmation,
    handleAuthClick,
    handleGoogleLogout,
    handleFieldChange,
    handleSummit,
    t,
  };
}
