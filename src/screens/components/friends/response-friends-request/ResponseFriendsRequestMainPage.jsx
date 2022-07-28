import React from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { useManageResponseFriendState } from "../../../../service/reminders-manage-state/manage-response-friends";
import { DisableButtonWithColorAndText } from "../../../../shared/components/DisableButtonWithColorAndText";
import { ImageUsernameEmailCard } from "../../../../shared/components/ImageUsernameEmailCard";

export const ResponseFriendsRequestMainPage = ({
  pendingFriendsRequest,
  sentFriendRequest,
}) => {
  const { toggleOnOff, acceptAFriend, declineAFriend } =
    useManageResponseFriendState();

  return (
    <>
      {pendingFriendsRequest &&
        pendingFriendsRequest.length > 0 &&
        pendingFriendsRequest.map((friendInfo) => (
          <div key={friendInfo?.username}>
            <ImageUsernameEmailCard
              username={friendInfo?.username}
              picture={friendInfo?.picture}
              email={friendInfo?.email}
            >
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
            </ImageUsernameEmailCard>
          </div>
        ))}
      {sentFriendRequest &&
        sentFriendRequest.length > 0 &&
        sentFriendRequest.map((friendInfo) => (
          <div key={friendInfo?.username}>
            <ImageUsernameEmailCard
              username={friendInfo?.username}
              picture={friendInfo?.picture}
              email={friendInfo?.email}
            >
              <DisableButtonWithColorAndText
                buttonColor="bg-indigo-300"
                buttonText="Sent"
                id="sent"
              />
            </ImageUsernameEmailCard>
          </div>
        ))}
      {sentFriendRequest &&
        sentFriendRequest.length < 1 &&
        pendingFriendsRequest &&
        pendingFriendsRequest.length < 1 && (
          <div className="px-4 py-5 shadow-lg">
            <div>No friend requests!</div>
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
