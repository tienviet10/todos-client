import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { API } from "../../shared/constant/config";
import { getLocalStorage } from "../auth/auth";
import {
  getAReminderRequest,
  updateNotificationRead,
} from "../reminders/rest-request";
import { DetailOfAReminderContext } from "./DetailOfAReminderContext";

const NotificationContext = createContext();
const token = getLocalStorage();

function NotificationProvider({ children }) {
  const { setReminderDetails, setDetailOn } = useContext(
    DetailOfAReminderContext
  );
  const [notifications, setNotifications] = useState([]);
  //const [aDetailReminder, setADetailReminder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshAll, setRefreshAll] = useState(false);

  useEffect(() => {
    const getNotification = async () => {
      const res = await axios.get(`${API}/v1/notifications`, {
        headers: {
          authorization: `Bearer ${token}`,
          contentType: "application/json",
        },
      });

      setNotifications(res.data);
    };

    getNotification();
  }, [refreshAll]);

  function getAReminder(reminderID) {
    setLoading(true);
    async function execFunction() {
      try {
        const response = await getAReminderRequest(
          `${API}/v1/reminder/${reminderID}`,
          token
        );
        if (response.status) {
          await updateNotificationRead(
            `${API}/v1/notification/${reminderID}`,
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
