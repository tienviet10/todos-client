import React from "react";
import { useTranslation } from "react-i18next";
import { ImageUsernameEmailCard } from "../../../../shared/components/ImageUsernameEmailCard";

export const CurrentFriends = ({ acceptedFriends }) => {
  const { t } = useTranslation();
  return (
    <>
      {acceptedFriends && acceptedFriends.length > 0 ? (
        acceptedFriends.map((friendInfo) => (
          <ImageUsernameEmailCard
            key={friendInfo?.username}
            username={friendInfo?.username}
            picture={friendInfo?.picture}
            email={friendInfo?.email}
          />
        ))
      ) : (
        <div className="px-4 py-5 shadow-lg">
          <div>{t("no_friend_add")}</div>
        </div>
      )}
    </>
  );
};
