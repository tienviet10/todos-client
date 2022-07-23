import { createContext, useState } from "react";
import {
  CREATE_EMPTY_REMINDER,
  CREATE_EMPTY_SHARED_REMINDER,
} from "../../shared/constant/config";

const DetailOfAReminderContext = createContext();

function DetailOfAReminderProvider({ children }) {
  const [detailOn, setDetailOn] = useState(false);
  const [reminderDetails, setReminderDetails] = useState(CREATE_EMPTY_REMINDER);
  const [sharedReminderDetails, setSharedReminderDetails] = useState(
    CREATE_EMPTY_SHARED_REMINDER
  );
  return (
    <DetailOfAReminderContext.Provider
      value={{
        detailOn,
        setDetailOn,
        reminderDetails,
        setReminderDetails,
        setSharedReminderDetails,
        sharedReminderDetails,
      }}
    >
      {children}
    </DetailOfAReminderContext.Provider>
  );
}

export { DetailOfAReminderContext, DetailOfAReminderProvider };
