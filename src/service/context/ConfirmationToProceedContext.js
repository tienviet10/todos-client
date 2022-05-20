import { createContext, useRef, useState } from "react";

import { CONFIRMATIONDELETION } from "../../components/config";

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

  function confirm({ descriptionText = CONFIRMATIONDELETION, onSuccess }) {
    confirmationFunction.current = () => {
      onSuccess()
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
        descriptionText
      }}
    >
      {children}
    </ConfirmationContext.Provider>
  );
}

export { ConfirmationContext, ConfirmationProvider };
