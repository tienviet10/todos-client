import React, { createContext, useContext, useState } from "react";
import { PastRemindersContext } from "./PastRemindersContext";
import { ReminderContext } from "./ReminderContext";

const ConfirmationContext = createContext();

function ConfirmationProvider({ children }) {
  const { discardRecord: discardRecordFromActive } =
    useContext(ReminderContext);
  const { discardRecord: discardRecordFromPast } =
    useContext(PastRemindersContext);
  const [confirmationOn, setConfirmationOn] = useState(false);
  const [descriptionText, setDescriptionText] = useState({
    titleText: "",
    displayText: "",
    confirmText: "",
    declineText: "",
  });
  const [itemId, setItemID] = useState("");
  const [fromWhere, setFromWhere] = useState("");

  function discardAction() {
    if (itemId && fromWhere && (fromWhere === "main" || fromWhere === "fav")) {
      discardRecordFromActive(itemId);
    } else if (itemId && fromWhere && fromWhere === "past") {
      discardRecordFromPast(itemId, true);
    }
    setConfirmationOn(false);
  }

  return (
    <ConfirmationContext.Provider
      value={{
        confirmationOn,
        setConfirmationOn,
        descriptionText,
        setDescriptionText,
        discardAction,
        setItemID,
        setFromWhere,
      }}
    >
      {children}
    </ConfirmationContext.Provider>
  );
}

export { ConfirmationContext, ConfirmationProvider };
