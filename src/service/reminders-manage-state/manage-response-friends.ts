import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  acceptFriendsLink,
  declineFriendsLink
} from "../../shared/service-link/url-link";
import { UseManageResponseFriendStateType } from "../../shared/types/service/ManageStateType";
import { useRestResponseFriends } from "../reminders-manage-request/response-friends";

export function useManageResponseFriendState(): UseManageResponseFriendStateType {
  const { t } = useTranslation();
  const [toggleOnOff, setToggleOnOff] = useState<string>("");
  const { acceptOrDeclinedFriendRequest } = useRestResponseFriends();

  const acceptAFriend = (email: string) => {
    setToggleOnOff("accepted");
    acceptOrDeclinedFriendRequest({
      url: acceptFriendsLink(),
      data: { email },
    });
  };

  const declineAFriend = (email: string) => {
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
    t,
  };
}
