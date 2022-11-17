import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { NotificationData } from "../../types/RESTResponse";

export const NotificationItemShare = ({
  notificationItem,
  navigateToSharedReminderDetail,
}: {
  notificationItem: NotificationData;
  navigateToSharedReminderDetail: (
    reminderID: string,
    notificationID: string
  ) => void;
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between px-4 border-b hover:bg-gray-100 hover:cursor-pointer">
      <div
        className="flex items-center py-3"
        onClick={() =>
          navigateToSharedReminderDetail(
            notificationItem.reminderID,
            notificationItem._id
          )
        }
      >
        <div className="flex -space-x-2 w-20 justify-center">
          {notificationItem.sharedWith.length > 0 &&
            (notificationItem.sharedWith[0].picture ? (
              <img
                className="h-6 w-6 rounded-full ring-1 ring-white"
                src={notificationItem.sharedWith[0].picture}
                alt="notificationItem.sharedWith[0] 2 Profile Icon"
              />
            ) : (
              <div className="flex h-6 w-6 rounded-full ring-1 ring-white bg-lime-300 justify-center">
                {notificationItem.sharedWith[0]?.username
                  ?.charAt(0)
                  .toUpperCase()}
              </div>
            ))}
          {notificationItem.sharedWith.length > 1 &&
            (notificationItem.sharedWith[1].picture ? (
              <img
                className="h-6 w-6 rounded-full ring-1 ring-white"
                src={notificationItem.sharedWith[1].picture}
                alt="notificationItem.sharedWith[0] 2 Profile Icon"
              />
            ) : (
              <div className="flex h-6 w-6 rounded-full ring-1 ring-white bg-cyan-300 justify-center">
                {notificationItem.sharedWith[1]?.username
                  ?.charAt(0)
                  .toUpperCase()}
              </div>
            ))}
        </div>
        {/* <img
          className="h-8 w-8 rounded-full object-cover mx-2"
          src={
            notificationItem.sharedWith.length > 0 &&
            notificationItem.sharedWith[0].picture
              ? notificationItem.sharedWith[0].picture
              : "images/placeholder.jpg"
          }
          alt="avatar"
        /> */}
        <p className="text-gray-600 text-sm mx-2">
          <span className="font-bold">{notificationItem.title}</span> {t("on")}{" "}
          <span className="font-semibold">
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
