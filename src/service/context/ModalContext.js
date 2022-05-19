import React, { createContext, useState } from "react";

const ModalContext = createContext();

function ModalProvider({ children }) {
  const [modalOn, setModalOn] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: "",
    description: "",
    status: "active",
    favorite: false,
    _id: "",
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
