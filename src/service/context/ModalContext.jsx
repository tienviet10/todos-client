import { createContext, useState } from "react";
import { CREATE_EMPTY_REMINDER } from "../../shared/constant/config";

const ModalContext = createContext();

function ModalProvider({ children }) {
  const [modalOn, setModalOn] = useState(false);
  const [newReminder, setNewReminder] = useState(CREATE_EMPTY_REMINDER);
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
