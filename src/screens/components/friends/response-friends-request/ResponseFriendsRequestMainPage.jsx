import React from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { useRestResponseFriends } from "../../../../service/reminders-manage-request/response-friends";
import { ImageUsernameEmailCard } from "../../../../shared/components/ImageUsernameEmailCard";
import { acceptFriendsLink } from "../../../../shared/service-link/url-link";

export const ResponseFriendsRequestMainPage = ({ pendingFriendsRequest }) => {
  const { acceptFriendRequest } = useRestResponseFriends();
  return (
    <>
      {pendingFriendsRequest && pendingFriendsRequest.length > 0 ? (
        pendingFriendsRequest.map((friendInfo) => (
          <ImageUsernameEmailCard
            username={friendInfo?.username}
            picture={friendInfo?.picture}
            email={friendInfo?.email}
          >
            <AiFillCloseCircle className="mr-2 fill-red-400" size={50} />
            <AiFillCheckCircle
              className="mr-2 fill-green-600"
              size={50}
              onClick={() =>
                acceptFriendRequest({
                  url: acceptFriendsLink(),
                  data: { email: friendInfo.email },
                })
              }
            />
          </ImageUsernameEmailCard>
        ))
      ) : (
        <div className="px-4 py-5 shadow-lg">
          <div>No friend requests!</div>
        </div>
      )}
    </>
  );
};
