import { createContext, useState } from "react";
import { updateUserProfileLink } from "../../shared/service-link/url-link";
import { useRQUpdateARecord } from "../reminders-manage-request/rest-request";

const PasswordConfirmationProfileContext = createContext();

function PasswordConfirmationProfileProvider({ children }) {
  const [passConfirmationProfileToggle, setPassConfirmationProfileToggle] =
    useState(false);
  const [newPasswordUpdate, setNewPasswordUpdate] = useState({
    email: "",
    username: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });

  const { mutate: confirmPasswordRequest } = useRQUpdateARecord(
    (data) => {
      if (data.status) {
        setNewPasswordUpdate((item) => ({
          ...item,
          newPassword: "",
          newPasswordConfirmation: "",
        }));
      }
      setPassConfirmationProfileToggle(false);
    },
    () => {
      setPassConfirmationProfileToggle(false);
    }
  );

  const confirmationRequest = (password) => {
    confirmPasswordRequest({
      url: updateUserProfileLink(),
      data: {
        password,
        ...newPasswordUpdate,
      },
    });
  };

  return (
    <PasswordConfirmationProfileContext.Provider
      value={{
        passConfirmationProfileToggle,
        setPassConfirmationProfileToggle,
        confirmPasswordRequest,

        confirmationRequest,
        setNewPasswordUpdate,
        newPasswordUpdate,
      }}
    >
      {children}
    </PasswordConfirmationProfileContext.Provider>
  );
}

export {
  PasswordConfirmationProfileContext,
  PasswordConfirmationProfileProvider,
};
