import { useContext, useEffect, useRef, useState } from "react";
import { REMINDER_STATUS } from "../../shared/constant/config";
import { getLocalStorage } from "../auth/auth";
import { AuthContext } from "../context/AuthServiceContext";
import { discardARecordWithToken, getRequestWithToken } from "./rest-request";

export function useRestPastReminder() {
  const isMounted = useRef(false);
  const [pastReminders, setPastReminders] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuth } = useContext(AuthContext);
  const token = getLocalStorage();

  useEffect(() => {
    isMounted.current = true;
    async function init() {
      try {
        const response = await getRequestWithToken(`/v1/reminders/past`, token);
        if (response.status) {
          const json = response.data;

          if (isMounted.current) {
            setPastReminders(json);
          }
        } else {
          throw response;
        }
      } catch (e) {
        if (isMounted.current) setError(e);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    }
    if (isAuth && token && token !== "") init();

    return () => {
      isMounted.current = false;
    };
  }, [isAuth, token]);

  function discardRecord(itemID, typeOfDelete) {
    const originalRecords = [...pastReminders];
    const newRecords = pastReminders.filter(function (rec) {
      return rec._id !== itemID;
    });

    async function execFunction() {
      try {
        setPastReminders(newRecords);
        if (typeOfDelete) {
          await discardARecordWithToken(`/v1/reminder/${itemID}`, token);
        }
      } catch (error) {
        setPastReminders(originalRecords);
      }
    }
    execFunction();
  }

  function addRecordFromActive(record) {
    setPastReminders([
      { ...record, status: REMINDER_STATUS.INACTIVE },
      ...pastReminders,
    ]);
  }

  return {
    pastReminders,
    error,
    loading,
    discardRecord,
    addRecordFromActive,
  };
}
