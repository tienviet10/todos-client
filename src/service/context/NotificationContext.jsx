import React, { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorage } from "../auth/auth";
import {
  getARecordWithToken,
  getRequestWithToken,
  updateARecordWithToken,
} from "../reminders/rest-request";
import { AuthContext } from "./AuthServiceContext";
import { DetailOfAReminderContext } from "./DetailOfAReminderContext";

const NotificationContext = createContext();

function NotificationProvider({ children }) {
  const { setReminderDetails, setDetailOn } = useContext(
    DetailOfAReminderContext
  );
  const [notifications, setNotifications] = useState([]);
  //const [aDetailReminder, setADetailReminder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshAll, setRefreshAll] = useState(false);
  const { isAuth } = useContext(AuthContext);
  const token = getLocalStorage();

  useEffect(() => {
    const getNotification = async () => {
      const res = await getRequestWithToken(`/v1/notifications`, token);
      setNotifications(res.data);
    };

    if (isAuth && token) getNotification();
  }, [refreshAll, isAuth, token]);

  function getAReminder(reminderID) {
    setLoading(true);
    async function execFunction() {
      try {
        const response = await getARecordWithToken(
          `/v1/reminder/${reminderID}`,
          token
        );
        if (response.status) {
          await updateARecordWithToken(
            `/v1/notification/${reminderID}`,
            { seen: true },
            token
          );

          setNotifications((oldNotifications) =>
            oldNotifications.map((item) =>
              item.reminderID === reminderID ? { ...item, seen: true } : item
            )
          );
          //setADetailReminder(response.data);
          setReminderDetails(response.data);
          setDetailOn(true);
        } else {
          setError("Error fetching a reminder from notification");
          throw new Error("Fetch request error");
        }
        //setLoading(false);
      } catch (error) {
        setError(error);
        //setLoading(false);
      }
    }
    execFunction();
    setLoading(false);
  }

  function refreshAllWhenUpdateReminder() {
    setRefreshAll(!refreshAll);
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        //aDetailReminder,
        error,
        loading,
        getAReminder,
        refreshAllWhenUpdateReminder,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export { NotificationContext, NotificationProvider };
