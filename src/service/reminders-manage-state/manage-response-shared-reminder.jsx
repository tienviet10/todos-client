import { useState } from "react";
import {
  acceptJoinedSharedReminderLink,
  declineJoinedSharedReminderLink,
} from "../../shared/service-link/url-link";
import { useRestResponseSharedReminder } from "../reminders-manage-request/response-shared-reminder";

export function useManageResponseSharedReminderState() {
  const [toggleOnOff, setToggleOnOff] = useState("");
  const { acceptOrDeclinedSharedReminderRequest } =
    useRestResponseSharedReminder();

  const acceptASharedReminder = (_id) => {
    setToggleOnOff("accepted");
    acceptOrDeclinedSharedReminderRequest({
      url: acceptJoinedSharedReminderLink(_id),
      data: { acceptOrDeclineFriend: "accept", status: "inactive", seen: true },
    });
  };

  const declineASharedReminder = (_id) => {
    setToggleOnOff("declined");
    acceptOrDeclinedSharedReminderRequest({
      url: declineJoinedSharedReminderLink(_id),
      data: {
        acceptOrDeclineFriend: "decline",
        status: "inactive",
        seen: true,
      },
    });
  };

  return {
    toggleOnOff,
    setToggleOnOff,
    acceptASharedReminder,
    declineASharedReminder,
  };
}
