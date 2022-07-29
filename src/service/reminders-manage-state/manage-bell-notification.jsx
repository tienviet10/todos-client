import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NAV_TABS } from "../../shared/constant/config";
import { getANotificationLink } from "../../shared/service-link/url-link";
import { DetailOfAReminderContext } from "../context/DetailOfAReminderContext";
import { ResponseFriendsContext } from "../context/ResponseFriendsContext";
import { SevenDaysSummaryContext } from "../context/SevenDaysSummaryContext";
import { useNotification } from "../reminders-manage-request/notifications";

export function useManageBellNotificationsState(setDropdownOpen, setNavTab) {
  const {
    notificationsList: notifications,
    updateSeenStatusAndRefreshAReminder,
    updateSeenStatusAndRefreshASharedReminder,
    updateSeenStatusOnly,
    setAReminder,
  } = useNotification();

  const { setDetailOn } = useContext(DetailOfAReminderContext);
  const { refetchSevenDaysSummary } = useContext(SevenDaysSummaryContext);
  const { setOpenTab } = useContext(ResponseFriendsContext);

  const [isNewNotification, setIsNewNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsNewNotification(false);
    checkIsNewNotification(notifications);
  }, [notifications]);

  function checkIsNewNotification(arrayOfNotification) {
    for (const item of arrayOfNotification) {
      if (!item.seen) {
        setIsNewNotification(true);
        break;
      }
    }
  }

  const navigateToReminderDetail = (reminderID, notificationID) => {
    setAReminder(reminderID);
    setNavTab(NAV_TABS[0].name);
    navigate(NAV_TABS[0].href);
    setDetailOn(true);
    setDropdownOpen(false);
    updateSeenStatusAndRefreshAReminder({
      data: { seen: true },
      url: getANotificationLink(`${notificationID}`),
    });
  };

  const navigateToSharedReminderDetail = (reminderID, notificationID) => {
    setAReminder(reminderID);
    setNavTab(NAV_TABS[1].name);
    navigate(NAV_TABS[1].href);
    setDetailOn(true);
    setDropdownOpen(false);
    updateSeenStatusAndRefreshASharedReminder({
      data: { seen: true },
      url: getANotificationLink(`${notificationID}`),
    });
  };

  const openSevenDaySUmmary = () => {
    setDropdownOpen(false);
    refetchSevenDaysSummary();
  };

  //Use for notification, in which clicking on the item will lead to Friend tabs
  const navigateToFriends = (notificationID) => {
    //Close dropdown notification
    setDropdownOpen(false);

    // Set to second tab (Response tab)
    setOpenTab(1);

    // Send request to backend
    updateSeenStatusOnly({
      data: { seen: true },
      url: getANotificationLink(`${notificationID}`),
    });

    //Navigate to Friend tab
    setNavTab(NAV_TABS[4].name);
    navigate(NAV_TABS[4].href);
  };

  return {
    isNewNotification,
    notifications,
    navigateToReminderDetail,
    navigateToSharedReminderDetail,
    navigateToFriends,
    openSevenDaySUmmary,
  };
}
