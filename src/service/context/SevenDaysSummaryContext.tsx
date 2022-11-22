import { createContext, useState } from "react";
import { getSevenRemindersSummaryLink } from "../../shared/service-link/url-link";
import { SevenDaysSummaryContextType } from "../../shared/types/service/ContextType";
import { SevenDaySummaryDataResponse } from "../../shared/types/service/ManageRequest";
import { SevenDaysSummaryDataType } from "../../shared/types/service/Reminder";
import { useRQGetRecords } from "../reminders-manage-request/rest-request";

const SevenDaysSummaryContext = createContext<SevenDaysSummaryContextType>(
  {} as SevenDaysSummaryContextType
);

function SevenDaysSummaryProvider({ children }: { children: React.ReactNode }) {
  const [sevenDaysReminders, setSevenDaysReminders] = useState<
    SevenDaysSummaryDataType[]
  >([]);
  const [isSummaryOn, setIsSummaryOn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { refetch: refetchSevenDaysSummary } = useRQGetRecords(
    "sevenRemindersSummary",
    getSevenRemindersSummaryLink(),
    //isSummaryOn,
    false,
    (data: SevenDaySummaryDataResponse) => {
      data?.request?.status === 404 && setError(data?.message as string);

      if (data.data !== undefined) {
        setSevenDaysReminders(data?.data);
        setIsSummaryOn(true);
      }
    },
    (err) => setError(err?.error as string)
  );

  return (
    <SevenDaysSummaryContext.Provider
      value={{
        isSummaryOn,
        setIsSummaryOn,
        sevenDaysReminders,
        error,
        refetchSevenDaysSummary,
      }}
    >
      {children}
    </SevenDaysSummaryContext.Provider>
  );
}

export { SevenDaysSummaryContext, SevenDaysSummaryProvider };
