import { useContext, useEffect } from "react";
import { useGoogleAuth } from "../auth/google-auth";
import { PasswordConfirmationProfileContext } from "../context/PasswordConfirmationProfileContext";

export function useManageProfileState(user) {
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

  const handleFieldChange = (name) => (e) => {
    setNewPasswordUpdate((item) => ({
      ...item,
      [name]: e.target.value,
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
  };
}
