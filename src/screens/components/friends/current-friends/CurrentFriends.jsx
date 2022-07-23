import React from "react";
import { ImageUsernameEmailCard } from "../../../../shared/components/ImageUsernameEmailCard";

export const CurrentFriends = ({ acceptedFriends }) => {
  return (
    <>
      {acceptedFriends && acceptedFriends.length > 0 ? (
        acceptedFriends.map((friendInfo) => (
          <ImageUsernameEmailCard
            username={friendInfo?.username}
            picture={friendInfo?.picture}
            email={friendInfo?.email}
          />
        ))
      ) : (
        <div className="px-4 py-5 shadow-lg">
          <div>No friend added!</div>
        </div>
      )}
    </>
  );
};
