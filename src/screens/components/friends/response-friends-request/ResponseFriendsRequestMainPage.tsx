import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { useManageResponseFriendState } from "../../../../service/reminders-manage-state/manage-response-friends";
import { DisableButtonWithColorAndText } from "../../../../shared/components/DisableButtonWithColorAndText";
import { ImageUsernameEmailCard } from "../../../../shared/components/ImageUsernameEmailCard";
import { ResponseFriendsRequestMainPageType } from "../../../../shared/types/friends/Friends";

export const ResponseFriendsRequestMainPage:React.FC<ResponseFriendsRequestMainPageType> = ({
  pendingFriendsRequest,
  sentFriendRequest,
}) => {
  const { toggleOnOff, acceptAFriend, declineAFriend, t } =
    useManageResponseFriendState();

  return (
    <>
      {pendingFriendsRequest &&
        pendingFriendsRequest.length > 0 &&
        pendingFriendsRequest.map((friendInfo) => (
          <div key={friendInfo?.username}>
            <ImageUsernameEmailCard
              username={friendInfo?.username}
              picture={friendInfo?.picture as string}
              email={friendInfo?.email}
            >
              <>
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
                      size={50}
                      onClick={() => declineAFriend(friendInfo?.email)}
                    />
                    <AiFillCheckCircle
                      className="mr-2 fill-application-color hover:fill-hover-color hover:cursor-pointer"
                      size={50}
                      onClick={() => acceptAFriend(friendInfo?.email)}
                    />
                  </>
                )}
              </>
            </ImageUsernameEmailCard>
          </div>
        ))}
      {sentFriendRequest &&
        sentFriendRequest.length > 0 &&
        sentFriendRequest.map((friendInfo) => (
          <div key={friendInfo?.username}>
            <ImageUsernameEmailCard
              username={friendInfo?.username as string}
              picture={friendInfo?.picture as string}
              email={friendInfo?.email as string}
            >
              <DisableButtonWithColorAndText
                buttonColor="bg-indigo-300"
                buttonText="Sent"
                // id="sent"
              />
            </ImageUsernameEmailCard>
          </div>
        ))}
      {sentFriendRequest &&
        sentFriendRequest.length < 1 &&
        pendingFriendsRequest &&
        pendingFriendsRequest.length < 1 && (
          <div className="px-4 py-5 shadow-lg text-white bg-[#1c3d78] rounded-md">
            <div>{t("no_friend_request")}</div>
          </div>
        )}
    </>
  );
};

// : (
//   <div className="px-4 py-5 shadow-lg">
//     <div>No friend requests!</div>
//   </div>
// )
