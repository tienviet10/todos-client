import React, { useState } from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { useRestResponseFriends } from "../../../../service/reminders-manage-request/response-friends";
import { DisableButtonWithColorAndText } from "../../../../shared/components/DisableButtonWithColorAndText";
import { ImageUsernameEmailCard } from "../../../../shared/components/ImageUsernameEmailCard";
import { acceptFriendsLink } from "../../../../shared/service-link/url-link";

export const ResponseFriendsRequestMainPage = ({ pendingFriendsRequest }) => {
  const { acceptFriendRequest } = useRestResponseFriends();
  const [toggleOnOff, setToggleOnOff] = useState("");
  return (
    <>
      {pendingFriendsRequest && pendingFriendsRequest.length > 0 ? (
        pendingFriendsRequest.map((friendInfo) => (
          <ImageUsernameEmailCard
            username={friendInfo?.username}
            picture={friendInfo?.picture}
            email={friendInfo?.email}
          >
            {toggleOnOff === "" ? (
              <>
                <AiFillCloseCircle
                  className="mr-2 fill-red-400 hover:fill-red-300 hover:cursor-pointer"
                  size={50}
                  onClick={() => setToggleOnOff("declined")}
                />
                <AiFillCheckCircle
                  className="mr-2 fill-green-600 hover:fill-green-500 hover:cursor-pointer"
                  size={50}
                  onClick={() => {
                    setToggleOnOff("accepted");
                    acceptFriendRequest({
                      url: acceptFriendsLink(),
                      data: { email: friendInfo.email },
                    });
                  }}
                />
              </>
            ) : toggleOnOff === "accepted" ? (
              <DisableButtonWithColorAndText
                buttonColor="green-500"
                buttonText="Accepted"
              />
            ) : (
              <DisableButtonWithColorAndText
                buttonColor="red-300"
                buttonText="Declined"
              />
            )}
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
