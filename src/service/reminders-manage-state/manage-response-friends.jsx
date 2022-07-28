import { useState } from "react";
import {
  acceptFriendsLink,
  declineFriendsLink,
} from "../../shared/service-link/url-link";
import { useRestResponseFriends } from "../reminders-manage-request/response-friends";

export function useManageResponseFriendState() {
  const [toggleOnOff, setToggleOnOff] = useState("");
  const { acceptOrDeclinedFriendRequest } = useRestResponseFriends();

  const acceptAFriend = (email) => {
    setToggleOnOff("accepted");
    acceptOrDeclinedFriendRequest({
      url: acceptFriendsLink(),
      data: { email },
    });
  };

  const declineAFriend = (email) => {
    setToggleOnOff("declined");
    acceptOrDeclinedFriendRequest({
      url: declineFriendsLink(),
      data: { email },
    });
  };

  return {
    toggleOnOff,
    setToggleOnOff,
    acceptAFriend,
    declineAFriend,
  };
}
