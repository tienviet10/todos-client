import { t } from "i18next";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { useManageResponseSharedReminderState } from "../../../service/reminders-manage-state/manage-response-shared-reminder";
import { DisableButtonWithColorAndText } from "../DisableButtonWithColorAndText";

export const NotificationItemSharedReminderPending = ({
  notificationItem,
  navigateToFriends,
}) => {
  const { toggleOnOff, acceptASharedReminder, declineASharedReminder } =
    useManageResponseSharedReminderState();

  return (
    <div className="flex justify-between px-4 border-b hover:bg-gray-100 hover:cursor-pointer">
      <div
        className="flex items-center py-3"
        onClick={() => navigateToFriends(notificationItem._id)}
      >
        <img
          className="h-8 w-8 rounded-full object-cover mx-2"
          src={
            notificationItem.postedBy.picture
              ? notificationItem.postedBy.picture
              : "images/placeholder.jpg"
          }
          alt="avatar"
        />
        <p className="text-gray-600 text-sm mx-2">
          <span>{t("join")}</span>{" "}
          <span className="font-semibold" href="#">
            {notificationItem.title}
          </span>{" "}
          {t("created_by")}{" "}
          <span className="font-semibold" href="#">
            {notificationItem.postedBy.username
              ? notificationItem.postedBy.username
              : "Unknown"}
          </span>
        </p>
      </div>
      <div className="flex my-auto">
        {toggleOnOff === "accepted" && (
          <DisableButtonWithColorAndText
            buttonColor="bg-hover-color"
            buttonText="Accepted"
            id="accept"
          />
        )}
        {toggleOnOff === "declined" && (
          <DisableButtonWithColorAndText
            buttonColor="bg-red-300"
            buttonText="Declined"
            id="decline"
          />
        )}
        {toggleOnOff === "" && (
          <>
            <AiFillCloseCircle
              className="mr-2 fill-red-400 hover:fill-red-300 hover:cursor-pointer"
              size={25}
              onClick={() => declineASharedReminder(notificationItem._id)}
            />
            <AiFillCheckCircle
              className="mr-2 fill-application-color hover:fill-hover-color hover:cursor-pointer"
              size={25}
              onClick={() => acceptASharedReminder(notificationItem._id)}
            />
          </>
        )}
      </div>
    </div>
  );
};
