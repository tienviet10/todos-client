import { useTranslation } from "react-i18next";
import { ImageUsernameEmailCard } from "../../../../shared/components/ImageUsernameEmailCard";
import { CurrentFriendsType } from "../../../../shared/types/friends/Friends";

export const CurrentFriends:React.FC<CurrentFriendsType> = ({
  acceptedFriends,
}) => {
  const { t } = useTranslation();
  return (
    <>
      {acceptedFriends && acceptedFriends.length > 0 ? (
        acceptedFriends.map((friendInfo) => (
          <ImageUsernameEmailCard
            key={friendInfo?.username as string}
            username={friendInfo?.username as string}
            picture={friendInfo?.picture as string}
            email={friendInfo?.email as string}
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
