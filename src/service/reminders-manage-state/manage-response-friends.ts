import { TFunction } from "i18next";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  acceptFriendsLink,
  declineFriendsLink,
} from "../../shared/service-link/url-link";
import { useRestResponseFriends } from "../reminders-manage-request/response-friends";

export function useManageResponseFriendState(): {
  toggleOnOff: string;
  setToggleOnOff: Dispatch<SetStateAction<string>>;
  acceptAFriend: (email: string) => void;
  declineAFriend: (email: string) => void;
  t: TFunction<"translation", undefined>;
} {
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
