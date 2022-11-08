import { format } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";

export const NotificationItemPersonal = ({
  notificationItem,
  navigateToReminderDetail,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between px-4 border-b hover:bg-gray-100 hover:cursor-pointer">
      <div
        className="flex items-center py-3"
        onClick={() =>
          navigateToReminderDetail(
            notificationItem.reminderID,
            notificationItem._id
          )
        }
      >
        <img
          className="h-8 w-8 rounded-full object-cover mx-2"
          src={
            notificationItem.sharedWith.length > 0 &&
            notificationItem.sharedWith[0].picture
              ? notificationItem.sharedWith[0].picture
              : "images/placeholder.jpg"
          }
          alt="avatar"
        />
        <p className="text-gray-600 text-sm mx-2">
          <span className="font-bold" href="#">
            {notificationItem.title}
          </span>{" "}
          {t("on")}{" "}
          <span className="font-semibold" href="#">
            {format(new Date(notificationItem.remindedAt), "PPPPp")}
          </span>
        </p>
      </div>
      <div className="flex items-center justify-center">
        {!notificationItem.seen && (
          <div className="bg-application-color rounded-full w-2 h-2"></div>
        )}
      </div>
    </div>
  );
};
