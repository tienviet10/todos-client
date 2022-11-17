import { createContext, useState } from "react";
import {
  CREATE_EMPTY_REMINDER,
  CREATE_EMPTY_SHARED_REMINDER
} from "../../shared/constant/config";
import { DetailOfAReminderContextType } from "../../shared/types/service/ContextType";
import { Reminder, SharedReminder } from "../../shared/types/service/Reminder";

const DetailOfAReminderContext = createContext<DetailOfAReminderContextType>(
  {} as DetailOfAReminderContextType
);

function DetailOfAReminderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [detailOn, setDetailOn] = useState<boolean>(false);
  const [reminderDetails, setReminderDetails] = useState<Reminder>(
    CREATE_EMPTY_REMINDER
  );
  const [sharedReminderDetails, setSharedReminderDetails] =
    useState<SharedReminder>(CREATE_EMPTY_SHARED_REMINDER);
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
