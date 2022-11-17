import { ImageUsernameEmailCard } from "../../../../shared/components/ImageUsernameEmailCard";
import { SendFriendType } from "../../../../shared/types/MutationFuncType";
import { EmailUserPicId } from "../../../../shared/types/RESTResponse";
import { RequestedButton } from "./RequestedButton";

export const FriendsSuggestionList = ({
  searchedFriendsList,
  email,
  sendFriendRequest,
}: {
  searchedFriendsList: EmailUserPicId[];
  email: string;
  sendFriendRequest: SendFriendType;
}) => {
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
