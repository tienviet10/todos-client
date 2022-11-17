import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { useManageResponseFriendState } from "../../../service/reminders-manage-state/manage-response-friends";
import { NotificationData } from "../../types/RESTResponse";
import { DisableButtonWithColorAndText } from "../DisableButtonWithColorAndText";

export const NotificationItemFriendRequest = ({
  notificationItem,
  navigateToFriends,
}: {
  notificationItem: NotificationData;
  navigateToFriends: (notificationID: string) => void;
}) => {
  const { toggleOnOff, acceptAFriend, declineAFriend, t } =
    useManageResponseFriendState();

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
          <span className="font-semibold">{t("friend_request")}</span>{" "}
          {t("from")}{" "}
          <span className="font-semibold">
            {notificationItem.postedBy.username
              ? notificationItem.postedBy.username
              : "Unknown"}
          </span>
        </p>
      </div>
      {/* <div className="flex items-center justify-center">
        {!notificationItem.seen && (
          <div className="bg-application-color rounded-full w-2 h-2"></div>
        )}
      </div> */}
      <div className="flex my-auto">
        {toggleOnOff === "accepted" && (
          <DisableButtonWithColorAndText
            buttonColor="bg-hover-color"
            buttonText="Accepted"
            // id="accept"
          />
        )}
        {toggleOnOff === "declined" && (
          <DisableButtonWithColorAndText
            buttonColor="bg-red-300"
            buttonText="Declined"
            // id="decline"
          />
        )}
        {toggleOnOff === "" && (
          <>
            <AiFillCloseCircle
              className="mr-2 fill-red-400 hover:fill-red-300 hover:cursor-pointer"
              size={25}
              onClick={() => declineAFriend(notificationItem.postedBy.email)}
            />
            <AiFillCheckCircle
              className="mr-2 fill-application-color hover:fill-hover-color hover:cursor-pointer"
              size={25}
              onClick={() => acceptAFriend(notificationItem.postedBy.email)}
            />
          </>
        )}
      </div>
    </div>
  );
};
