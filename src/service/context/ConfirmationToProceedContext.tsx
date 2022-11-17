import { createContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { ConfirmationContextType, DescriptionTextType } from "../../shared/types/service/ContextType";

const ConfirmationContext = createContext<ConfirmationContextType>(
  {} as ConfirmationContextType
);

function ConfirmationProvider({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const [confirmationOn, setConfirmationOn] = useState<boolean>(false);
  const [descriptionText, setDescriptionText] = useState<DescriptionTextType>({
    titleText: "",
    displayText: "",
    confirmText: "",
    declineText: "",
  });

  const confirmationFunction = useRef<() => void>(() => undefined);

  function confirm({
    descriptionText = {
      titleText: t("confirmation_box_title"),
      displayText: t("confirmation_box_display"),
      confirmText: t("confirmation_box_accept"),
      declineText: t("close_text"),
    },
    onSuccess,
  }: {
    descriptionText?: DescriptionTextType;
    onSuccess: () => void;
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
