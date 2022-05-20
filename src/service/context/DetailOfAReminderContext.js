import React, { createContext, useState } from "react";

const DetailOfAReminderContext = createContext();

function DetailOfAReminderProvider({ children }) {
  const [detailOn, setDetailOn] = useState(false);
  const [reminderDetails, setReminderDetails] = useState({
    title: "",
    description: "",
    status: "active",
    favorite: false,
    _id: "",
    createdAt: "",
    updatedAt: "",
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
