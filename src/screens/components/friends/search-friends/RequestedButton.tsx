import { useState } from "react";
import { useTranslation } from "react-i18next";
import { pendingFriendsLink } from "../../../../shared/service-link/url-link";
import { SendFriendType } from "../../../../shared/types/MutationFuncType";

export const RequestedButton = ({
  sendFriendRequest,
  email,
}: {
  sendFriendRequest: SendFriendType;
  email: string;
}) => {
  const { t } = useTranslation();
  const [requestedButtonToggle, setRequestedButtonToggle] =
    useState<boolean>(false);
  return (
    <>
      {requestedButtonToggle ? (
        <button
          disabled
          className="py-1 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Requested
        </button>
      ) : (
        <button
          className="py-1 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-application-color hover:bg-hover-color focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={() => {
            sendFriendRequest({
              url: pendingFriendsLink(),
              data: { email },
            });
            setRequestedButtonToggle(true);
          }}
        >
          {t("add")}
        </button>
      )}
    </>
  );
};
