import React, { createContext, useState } from "react";
import { REMINDER_STATUS } from "../../shared/constant/config";

const DetailOfAReminderContext = createContext();

function DetailOfAReminderProvider({ children }) {
  const [detailOn, setDetailOn] = useState(false);
  const [reminderDetails, setReminderDetails] = useState({
    title: "",
    description: "",
    status: REMINDER_STATUS.ACTIVE,
    favorite: false,
    _id: "",
    createdAt: "",
    updatedAt: "",
    color: "white",
    remindedAt: null,
  });
  return (
    <DetailOfAReminderContext.Provider
      value={{
        detailOn,
        setDetailOn,
        reminderDetails,
        setReminderDetails,
      }}
    >
      {children}
    </DetailOfAReminderContext.Provider>
  );
}

export { DetailOfAReminderContext, DetailOfAReminderProvider };
