import { createContext, useRef, useState } from "react";

const CONFIRMATION_DELETION = {
  titleText: "Delete A Reminder",
  displayText: "Are you sure you want to delete the reminder?",
  confirmText: "Accept",
  declineText: "Cancel",
};

const ConfirmationContext = createContext();

function ConfirmationProvider({ children }) {
  const [confirmationOn, setConfirmationOn] = useState(false);
  const [descriptionText, setDescriptionText] = useState({
    titleText: "",
    displayText: "",
    confirmText: "",
    declineText: "",
  });

  const confirmationFunction = useRef(() => undefined);

  function confirm({ descriptionText = CONFIRMATION_DELETION, onSuccess }) {
    confirmationFunction.current = () => {
      onSuccess();
      setConfirmationOn(false);
    };
    setDescriptionText(descriptionText);
    setConfirmationOn(true);
  }

  return (
    <ConfirmationContext.Provider
      value={{
        confirmationOn,
        confirmationFunction: confirmationFunction.current,
        confirm,
        descriptionText,
        setConfirmationOn,
      }}
    >
      {children}
    </ConfirmationContext.Provider>
  );
}

export { ConfirmationContext, ConfirmationProvider };
