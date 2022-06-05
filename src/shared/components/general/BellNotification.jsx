import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { DetailOfAReminderContext } from "../../../service/context/DetailOfAReminderContext";
import { SevenDaysSummaryContext } from "../../../service/context/SevenDaysSummaryContext";
import { useNotification } from "../../../service/notifications/notifications";
import { getANotificationLink } from "../../service/url-link";
import { classNames } from "../reminders-list/color-choice";

export const BellNotification = ({ dropdownOpen, setDropdownOpen }) => {
  const {
    notificationsList: notifications,
    mutate,
    setAReminder,
  } = useNotification();
  const [isNewNotification, setIsNewNotification] = useState(false);
  const { setDetailOn } = useContext(DetailOfAReminderContext);

  const { refetchSevenDaysSummary } = useContext(SevenDaysSummaryContext);

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

  return (
    <div className="justify-center">
      <div className="relative">
        <button
          onClick={() => {
            setDropdownOpen((prev) => !prev);
          }}
          className={classNames(
            dropdownOpen
              ? "bg-white focus:outline-none"
              : "hover:bg-gray-700 hover:text-white",
            "relative z-10 block rounded-md p-1"
          )}
        >
          {isNewNotification && (
            <div className="bg-application-color rounded-full w-2.5 h-2.5 absolute inset-x-4 z-20"></div>
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
                notifications.map((notificationItem) => (
                  <div
                    key={notificationItem._id}
                    className="flex justify-between px-4 border-b hover:bg-gray-100 hover:cursor-pointer"
                  >
                    <div
                      className="flex items-center py-3"
                      onClick={() => {
                        setAReminder(notificationItem.reminderID);
                        setDetailOn(true);
                        setDropdownOpen(false);
                        mutate({
                          data: { seen: true },
                          url: getANotificationLink(
                            `${notificationItem.reminderID}`
                          ),
                        });
                      }}
                    >
                      <img
                        className="h-8 w-8 rounded-full object-cover mx-2"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="avatar"
                      />
                      <p className="text-gray-600 text-sm mx-2">
                        <span className="font-bold" href="#">
                          {notificationItem.title}
                        </span>{" "}
                        on{" "}
                        <span className="font-semibold" href="#">
                          {format(
                            new Date(notificationItem.remindedAt),
                            "PPPPp"
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      {!notificationItem.seen && (
                        <div className="bg-application-color rounded-full w-2 h-2"></div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <div
              href="#"
              className="block bg-gray-800 text-white text-center font-bold py-2 hover:cursor-pointer"
              onClick={() => {
                setDropdownOpen(false);
                refetchSevenDaysSummary();
              }}
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
