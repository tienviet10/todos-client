import { t } from "i18next";

import { LabelText } from "../../../../shared/components/LabelText";
import LoadSpinnerOnly from "../../../../shared/components/loading-spinner/LoadSpinnerOnly";
import { AddCollaboratorsType } from "../../../../shared/types/reminders-form/ReminderForm";
import { LiSelectedUsersComponent } from "../sub-components/LiSelectedUsersComponent";

export const AddCollaborators:React.FC<AddCollaboratorsType> = ({
  handleDeleteTagOnCurrentUsers,
  handleDeleteTagOnPendingUsers,
  searchUser,
  setSearchUser,
  loadingUserBackend,
  filteredData,
  handleSelectUserFromSuggestion,
  users,
  _id,
  pendingRequest,
  text,
} ) => {
  return (
    <div className="relative px-12 mt-3">
      <div className="flex flex-col">
        {/* Label and selected friends for collaboration */}
        <div className="flex h-8">
          <LabelText text={text} />
          <ul className="flex overflow-hidden overflow-x-auto p-0 ml-2 text-xs my-auto">
            {users.map((selectedUser, index) => (
              <LiSelectedUsersComponent
                key={index}
                indexToDelete={index}
                username={selectedUser.username}
                handleDeleteTags={handleDeleteTagOnCurrentUsers}
                color="bg-application-color"
              />
            ))}
            {pendingRequest.map((selectedUser, index) => (
              <LiSelectedUsersComponent
                key={index}
                indexToDelete={index}
                username={selectedUser.username}
                handleDeleteTags={handleDeleteTagOnPendingUsers}
                color="bg-indigo-300"
              />
            ))}
          </ul>
        </div>

        {/* Search Input for Friends and Loading Indicator */}
        <div className="flex mt-1">
          <input
            autoComplete="off"
            autoFocus={_id ? false : true}
            type="text"
            placeholder={t("placeholder_shared_reminder") as string}
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-white bg-[#1b3663]"
          />
          {loadingUserBackend && (
            <div className="absolute flex items-center px-2 right-0 py-2">
              <LoadSpinnerOnly />
            </div>
          )}
        </div>
      </div>
      {/* Suggestion List from Search User */}
      {filteredData.length !== 0 && (
        <div className="absolute bg-white shadow-sm overflow-hidden overflow-y-auto outline-none border max-x-[77%]">
          {filteredData.map((userInTheList, key) => {
            return (
              <div
                key={key}
                className="flex text-black items-center hover:bg-gray-100 hover:cursor-pointer"
                onClick={() => handleSelectUserFromSuggestion(userInTheList)}
              >
                <p className="mx-2">{userInTheList.username} </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

