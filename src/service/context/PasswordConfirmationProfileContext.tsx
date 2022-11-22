import { createContext, useState } from "react";
import { updateUserProfileLink } from "../../shared/service-link/url-link";
import { PasswordConfirmationProfileContextType } from "../../shared/types/service/ContextType";
import { UserNewPassword } from "../../shared/types/service/User";
import { useRQUpdateARecord } from "../reminders-manage-request/rest-request";

const PasswordConfirmationProfileContext =
  createContext<PasswordConfirmationProfileContextType>(
    {} as PasswordConfirmationProfileContextType
  );

function PasswordConfirmationProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [passConfirmationProfileToggle, setPassConfirmationProfileToggle] =
    useState<boolean>(false);
  const [newPasswordUpdate, setNewPasswordUpdate] = useState<UserNewPassword>({
    email: "",
    username: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });

  const { mutate: confirmPasswordRequest } = useRQUpdateARecord(
    (data) => {
      if (data?.status) {
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
    },
    () => {},
    () => {}
  );

  const confirmationRequest = (password: string) => {
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
