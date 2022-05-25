import React, { createContext, useState } from "react";
import { REMINDER_STATUS } from "../../shared/constant/config";

const ModalContext = createContext();

function ModalProvider({ children }) {
  const [modalOn, setModalOn] = useState(false);
  const [newReminder, setNewReminder] = useState({
    _id: "",
    title: "",
    description: "",
    status: REMINDER_STATUS.ACTIVE,
    favorite: false,
    remindedAt: null,
  });
  return (
    <ModalContext.Provider
      value={{
        modalOn,
        setModalOn,
        newReminder,
        setNewReminder,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContext, ModalProvider };
