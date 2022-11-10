import { ImageUsernameEmailCard } from "../../../../shared/components/ImageUsernameEmailCard";
import { RequestedButton } from "./RequestedButton";

export const FriendsSuggestionList = ({
  searchedFriendsList,
  email,
  sendFriendRequest,
}) => {
  return (
    <div className="w-full">
      <div className="flex-col items-center justify-center w-full">
        {searchedFriendsList && searchedFriendsList !== [] ? (
          searchedFriendsList.map(
            (friendInfo) =>
              friendInfo.email !== email && (
                <ImageUsernameEmailCard
                  key={friendInfo?.username}
                  username={friendInfo?.username}
                  picture={friendInfo?.picture}
                  email={friendInfo?.email}
                >
                  <RequestedButton
                    sendFriendRequest={sendFriendRequest}
                    email={friendInfo.email}
                  />
                </ImageUsernameEmailCard>
              )
          )
        ) : (
          <div>Empty</div>
        )}
      </div>
    </div>
  );
};
