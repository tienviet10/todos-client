import { useState, useRef, useEffect, useContext } from "react";
import { API } from "../../components/config";
import { getLocalStorage } from "../auth/auth";
import { AuthContext } from "../context/AuthService";
import { discardAReminder, getReminders } from "./restrequest";

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
        const response = await getReminders(`${API}/getpastreminders`, token);
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

  function discardRecord(itemID) {
    const originalRecords = [...pastReminders];
    const newRecords = pastReminders.filter(function (rec) {
      return rec._id !== itemID;
    });
    async function execFunction() {
      try {
        setPastReminders(newRecords);
        await discardAReminder(`${API}/deletereminder/${itemID}`, token);
      } catch (error) {
        setPastReminders(originalRecords);
      }
    }
    execFunction();
  }

  return {
    pastReminders,
    error,
    loading,
    discardRecord,
  };
}
