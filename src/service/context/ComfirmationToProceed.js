import React, { createContext, useState } from "react";

const ConfirmationContext = createContext();

function ConfirmationProvider({ children }) {
  const [confirmationOn, setConfirmationOn] = useState(false);
  const [descriptionText, setDescriptionText] = useState({
    titleText: "",
    displayText: "",
    confirmText: "",
    declineText: "",
  });

  const [holdCallBack, setHoldCallback] = useState(() => () => {});

  function deleteAction() {
    holdCallBack();
    setConfirmationOn(false);
  }

  return (
    <ConfirmationContext.Provider
      value={{
        confirmationOn,
        setConfirmationOn,
        descriptionText,
        setDescriptionText,
        deleteAction,
        setHoldCallback,
      }}
    >
      {children}
    </ConfirmationContext.Provider>
  );
}

export { ConfirmationContext, ConfirmationProvider };
