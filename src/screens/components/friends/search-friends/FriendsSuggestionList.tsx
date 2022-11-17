import { ImageUsernameEmailCard } from "../../../../shared/components/ImageUsernameEmailCard";
import { FriendsSuggestionListType } from "../../../../shared/types/friends/Friends";
import { RequestedButton } from "./RequestedButton";

export const FriendsSuggestionList:React.FC<FriendsSuggestionListType> = ({
  searchedFriendsList,
  email,
  sendFriendRequest,
} ) => {
  return (
    <div className="w-full">
      <div className="flex-col items-center justify-center w-full">
        {searchedFriendsList ? (
          searchedFriendsList.map(
            (friendInfo) =>
              friendInfo.email !== email && (
                <ImageUsernameEmailCard
                  key={friendInfo?.username as string}
                  username={friendInfo?.username as string}
                  picture={friendInfo?.picture as string}
                  email={friendInfo?.email as string}
                >
                  <RequestedButton
                    sendFriendRequest={sendFriendRequest}
                    email={friendInfo?.email as string}
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
