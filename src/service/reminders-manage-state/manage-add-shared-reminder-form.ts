import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CREATE_EMPTY_SHARED_REMINDER } from "../../shared/constant/config";
import {
  getSuggestedCollaboratorsLink,
  sharedRemindersGeneralLink,
  sharedReminderWithIDLink
} from "../../shared/service-link/url-link";
import { ManageAddSharedReminderFormStateType } from "../../shared/types/service/ManageStateType";
import { SharedReminder } from "../../shared/types/service/Reminder";
import { EmailUserPicId } from "../../shared/types/service/User";
import { SharedReminderContext } from "../context/ActiveSharedRemindersContext";
import { ReminderModalContext } from "../context/ReminderModalContext";
import { useRestAddCollaboratorsOnReminder } from "../reminders-manage-request/add-collaborators-shared-reminder";

type addRemoveUsers = {
  add: string[];
  remove: string[];
}
const createEmptySharedReminder: SharedReminder = CREATE_EMPTY_SHARED_REMINDER;

export function useManageAddSharedReminderFormState(): ManageAddSharedReminderFormStateType {
  const { t } = useTranslation();

  //Send reminder to backend to save or edit reminder
  const { addSharedRecord, updateSharedRecord } = useContext(
    SharedReminderContext
  );

  const { newSharedReminder, setNewSharedReminder, setModalOn } =
    useContext(ReminderModalContext);

  const {
    filteredData,
    setFilteredData,
    getSearchedCollaborators,
    loadingUserBackend,
    setLoadingUserBackend,
  } = useRestAddCollaboratorsOnReminder();

  const [searchUser, setSearchUser] = useState<string>("");
  const [newUsersAddedToPending, setNewUsersAddedToPending] = useState<addRemoveUsers>({
    add: [],
    remove: [],
  });

  //Use this hook to delay sending request to backend -> ensure user temporarily stop typing before sending request
  useEffect(() => {
    if (searchUser !== "") {
      setLoadingUserBackend(true);
      const delayDebounceFn = setTimeout(() => {
        getSearchedCollaborators({
          url: getSuggestedCollaboratorsLink(),
          data: { searchUser },
        });
        setLoadingUserBackend(false);
      }, 800);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setFilteredData([]);
      setLoadingUserBackend(false);
    }
  }, [
    searchUser,
    getSearchedCollaborators,
    setFilteredData,
    setLoadingUserBackend,
  ]);

  const handleDeleteTagOnCurrentUsers = (removedIndex: number) => {
    // Handle delete selected users (in editor in groupUsers in newSharedReminder)
    setNewSharedReminder((old) => {
      const newSelectedUsers = old.groupUsers.editor.filter(
        (_, index) => index !== removedIndex
      );

      return {
        ...old,
        groupUsers: { ...old.groupUsers, editor: newSelectedUsers },
      };
    });
  };

  const handleDeleteTagOnPendingUsers = (removedIndex: number) => {
    // Handle delete selected users (in editor in groupUsers in newSharedReminder)
    let usersBeingRemove: EmailUserPicId[] = [];
    setNewSharedReminder((old) => {
      const newSelectedUsers = old.pendingRequest.filter(
        (_, index) => index !== removedIndex
      );
      usersBeingRemove = old.pendingRequest.filter(
        (_, index) => index === removedIndex
      );
      return {
        ...old,
        pendingRequest: newSelectedUsers,
      };
    });

    // Keep track of users being remove that is still in pending state
    if (usersBeingRemove.length > 0) {
      setNewUsersAddedToPending((old) => {
        return { ...old, remove: [...old.remove, usersBeingRemove[0]._id] };
      });
    }
  };

  const handleSelectUserFromSuggestion = (value: EmailUserPicId) => {
    // Handle add new user -> Make sure not same user are added twice
    let sumWithInitial = 0;

    setNewSharedReminder((old) => {
      sumWithInitial = old.groupUsers.editor
        .concat(old.pendingRequest)
        .reduce(
          (previousValue, currentValue) =>
            previousValue + (currentValue._id === value._id ? 1 : 0),
          0
        );
      return sumWithInitial === 0
        ? {
          ...old,
          pendingRequest: old.pendingRequest.concat(value),
        }
        : old;
    });

    // When adding new users to pending list, keep track of the new users so that backend can send notifications to them
    if (sumWithInitial === 0) {
      setNewUsersAddedToPending((old) => {
        return { ...old, add: [...old.add, value._id] };
      });
    }

    setFilteredData([]);
    setSearchUser("");
  };

  //---------------------------------------------------

  const exitTheForm = () => {
    setNewSharedReminder(createEmptySharedReminder);
    setModalOn(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setNewSharedReminder({
      ...newSharedReminder,
      [e.target.name]: e.target.value,
    });
  };

  const setReminderDate = (remindedAt: Date) => {
    setNewSharedReminder({
      ...newSharedReminder,
      remindedAt: new Date(remindedAt),
    });
  };

  // newSharedReminder.groupUsers.editor is a list of map that needs to be converted to a list of users ID to save to the backend.
  // For adding users, add the final list of users without the main or owner user since that would be added to the list on server
  // For the editing/updating, add the new list in newSharedReminder.groupUsers.editor to users
  const saveOrAddReminder = () => {
    const finalListChosen: string[] = newSharedReminder.pendingRequest.map(
      (users) => users._id
    );
    if (newSharedReminder._id === "") {
      const reminderContentToAdd: SharedReminder = {
        ...newSharedReminder,
        pendingRequestTemp: finalListChosen,
      };
      delete reminderContentToAdd._id;

      addSharedRecord({
        data: reminderContentToAdd,
        url: sharedRemindersGeneralLink(),
      });
    } else {
      // newUsersAddedToPending keep track new users being added or delete when editing a shared reminder
      updateSharedRecord({
        from: "current",
        url: sharedReminderWithIDLink(newSharedReminder._id as string),
        data: {
          ...newSharedReminder,
          pendingRequestTemp: finalListChosen,
          newUsersAddedToPending,
        },
      });
    }
    setNewSharedReminder(createEmptySharedReminder);
    setModalOn(false);
  };

  return {
    newSharedReminder,
    exitTheForm,
    handleChange,
    setReminderDate,
    saveOrAddReminder,
    searchUser,
    handleDeleteTagOnCurrentUsers,
    handleDeleteTagOnPendingUsers,
    setSearchUser,
    loadingUserBackend,
    filteredData,
    handleSelectUserFromSuggestion,
    t,
  };
}
