import { createContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const ConfirmationContext = createContext();

function ConfirmationProvider({ children }) {
  const { t } = useTranslation();
  const [confirmationOn, setConfirmationOn] = useState(false);
  const [descriptionText, setDescriptionText] = useState({
    titleText: "",
    displayText: "",
    confirmText: "",
    declineText: "",
  });

  const confirmationFunction = useRef(() => undefined);

  function confirm({
    descriptionText = {
      titleText: t("confirmation_box_title"),
      displayText: t("confirmation_box_display"),
      confirmText: t("confirmation_box_accept"),
      declineText: t("close_text"),
    },
    onSuccess,
  }) {
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
