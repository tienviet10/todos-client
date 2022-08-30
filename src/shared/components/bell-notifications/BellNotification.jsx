import React from "react";
import { useManageBellNotificationsState } from "../../../service/reminders-manage-state/manage-bell-notification";
import { classNames } from "../color-picker/color-choice";
import { NotificationItemFriendRequest } from "./NotificationItemFriendRequest";
import { NotificationItemPersonal } from "./NotificationItemPersonal";
import { NotificationItemShare } from "./NotificationItemShare";
import { NotificationItemSharedReminderPending } from "./NotificationItemSharedReminderPending";

export const BellNotification = ({
  dropdownOpen,
  setDropdownOpen,
  setNavTab,
}) => {
  const {
    isNewNotification,
    notifications,
    navigateToReminderDetail,
    navigateToSharedReminderDetail,
    openSevenDaySUmmary,
    navigateToFriends,
  } = useManageBellNotificationsState(setDropdownOpen, setNavTab);
  //console.log(notifications);
  return (
    <div className="justify-center">
      <div className="relative">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className={classNames(
            dropdownOpen
              ? "bg-white focus:outline-none"
              : "hover:bg-gray-700 hover:text-white",
            "relative z-10 block rounded-md p-1"
          )}
        >
          {isNewNotification && (
            <div className="absolute bg-application-color rounded-full w-2.5 h-2.5 inset-x-4 z-20"></div>
          )}
          <svg
            className="h-6 w-6 text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={dropdownOpen ? "currentColor" : "white"}
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </button>

        {dropdownOpen ? (
          <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20 w-[20rem]">
            <div className="py-2">
              {notifications.length > 0 &&
                notifications.map((notificationItem) =>
                  notificationItem.reminderTypes === "personal" ? (
                    // Normal reminder notification
                    <NotificationItemPersonal
                      key={notificationItem._id}
                      navigateToReminderDetail={navigateToReminderDetail}
                      notificationItem={notificationItem}
                    />
                  ) : notificationItem.reminderTypes === "sharedReminder" ? (
                    // Normal reminder notification
                    <NotificationItemShare
                      key={notificationItem._id}
                      navigateToSharedReminderDetail={
                        navigateToSharedReminderDetail
                      }
                      notificationItem={notificationItem}
                    />
                  ) : notificationItem.reminderTypes ===
                    "sharedReminderRequest" ? (
                    // Normal reminder notification
                    <NotificationItemSharedReminderPending
                      key={notificationItem._id}
                      notificationItem={notificationItem}
                      navigateToFriends={navigateToFriends}
                    />
                  ) : (
                    // Friend request in notification
                    <NotificationItemFriendRequest
                      key={notificationItem._id}
                      notificationItem={notificationItem}
                      navigateToFriends={navigateToFriends}
                    />
                  )
                )}
            </div>
            <div
              href="#"
              className="block bg-gray-800 text-white text-center font-bold py-2 hover:cursor-pointer"
              onClick={() => openSevenDaySUmmary()}
            >
              Seven Days Summary
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};