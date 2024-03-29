import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { UseManageProfileStateType } from "../../shared/types/service/ManageStateType";
import { UserData } from "../../shared/types/service/User";
import { useGoogleAuth } from "../auth/google-auth";
import { PasswordConfirmationProfileContext } from "../context/PasswordConfirmationProfileContext";

export function useManageProfileState(user: UserData): UseManageProfileStateType {
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
