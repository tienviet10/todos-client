import { useContext, useEffect, useState } from "react";
import { CREATE_EMPTY_SHARED_REMINDER } from "../../shared/constant/config";
import {
  getSuggestedCollaboratorsLink,
  sharedRemindersGeneralLink,
  sharedReminderWithIDLink,
} from "../../shared/service-link/url-link";
import { SharedReminderContext } from "../context/ActiveSharedRemindersContext";
import { ReminderModalContext } from "../context/ReminderModalContext";
import { useRestAddCollaboratorsOnReminder } from "../reminders-manage-request/add-collaborators-shared-reminder";

const createEmptySharedReminder = CREATE_EMPTY_SHARED_REMINDER;

export function useManageAddSharedReminderFormState() {
  //Send reminder to backend to save or edit reminder
  const { addSharedRecord, updateSharedRecord } = useContext(
    SharedReminderContext
  );

  const { newSharedReminder, setNewSharedReminder, setModalOn } =
    useContext(ReminderModalContext);

  //---------------------------------------------------
  const {
    filteredData,
    setFilteredData,
    getSearchedCollaborators,
    loadingUserBackend,
    setLoadingUserBackend,
  } = useRestAddCollaboratorsOnReminder();

  const [searchUser, setSearchUser] = useState("");

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

  const handleDeleteTags = (removedIndex) => {
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

  const handleSelectUserFromSuggestion = (value) => {
    // Handle add new user -> Make sure not same user are added twice
    setNewSharedReminder((old) => {
      const sumWithInitial = old.groupUsers.editor.reduce(
        (previousValue, currentValue) =>
          previousValue + (currentValue._id === value._id ? 1 : 0),
        0
      );
      return sumWithInitial === 0
        ? {
            ...old,
            groupUsers: {
              ...old.groupUsers,
              editor: old.groupUsers.editor.concat([value]),
            },
          }
        : old;
    });

    setFilteredData([]);
    setSearchUser("");
  };

  //---------------------------------------------------

  const exitTheForm = () => {
    setNewSharedReminder(createEmptySharedReminder);
    setModalOn(false);
  };

  const handleChange = (name) => (e) => {
    setNewSharedReminder({
      ...newSharedReminder,
      [name]: e.target.value,
    });
  };

  const setReminderDate = (remindedAt) => {
    setNewSharedReminder({
      ...newSharedReminder,
      remindedAt: new Date(remindedAt),
    });
  };

  // newSharedReminder.groupUsers.editor is a list of map that needs to be converted to a list of users ID to save to the backend.
  // For adding users, add the final list of users without the main or owner user since that would be added to the list on server
  // For the editing/updating, add the new list in newSharedReminder.groupUsers.editor to users
  const saveOrAddReminder = () => {
    const finalListChosen = newSharedReminder.groupUsers.editor.map(
      (users) => users._id
    );
    if (newSharedReminder._id === "") {
      const reminderContentToAdd = {
        ...newSharedReminder,
        users: finalListChosen,
        groupUsers: {
          admin: [],
          editor: finalListChosen,
          viewer: [],
        },
      };
      delete reminderContentToAdd._id;

      addSharedRecord({
        data: reminderContentToAdd,
        url: sharedRemindersGeneralLink(),
      });
    } else {
      updateSharedRecord({
        from: "current",
        url: sharedReminderWithIDLink(newSharedReminder._id),
        data: {
          ...newSharedReminder,
          users: finalListChosen.concat(newSharedReminder.groupUsers.admin),
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
    handleDeleteTags,
    setSearchUser,
    loadingUserBackend,
    filteredData,
    handleSelectUserFromSuggestion,
  };
}

//////-----------------------------------------------------------------

// export function useManageAddSharedReminderFormState() {
//   //Send reminder to backend to save or edit reminder
//   const { addSharedRecord, updateSharedRecord } = useContext(
//     SharedReminderContext
//   );

//   const { newSharedReminder, setNewSharedReminder, setModalOn } =
//     useContext(ReminderModalContext);

//   //---------------------------------------------------
//   const {
//     filteredData,
//     setFilteredData,
//     getSearchedCollaborators,
//     loadingUserBackend,
//     setLoadingUserBackend,
//   } = useRestAddCollaboratorsOnReminder();

//   const [searchUser, setSearchUser] = useState("");
//   const [selectedUser, setSelectedUser] = useState([]);

//   const handleSearchTermToBackend = (user) => {
//     setSearchUser(user);
//     if (user !== "") {
//       setLoadingUserBackend(true);
//       const delayDebounceFn = setTimeout(() => {
//         getSearchedCollaborators({
//           url: getSuggestedCollaboratorsLink(),
//           data: { searchUsers: user },
//         });
//       }, 1000);
//       return () => clearTimeout(delayDebounceFn);
//     } else {

//       setFilteredData([]);
//       setLoadingUserBackend(false);
//     }
//   };

//   const handleDeleteTags = (removedIndex) => {
//     setSelectedUser([
//       ...selectedUser.filter((_, index) => index !== removedIndex),
//     ]);
//   };

//   const handleSelectUserFromSuggestion = (value) => {
//     setSelectedUser((old) => [...old, value]);
//     setFilteredData([]);
//     setSearchUser("");
//   };

//   //---------------------------------------------------

//   const exitTheForm = () => {
//     setNewSharedReminder(createEmptySharedReminder);
//     setModalOn(false);
//   };

//   const handleChange = (name) => (e) => {
//     setNewSharedReminder({
//       ...newSharedReminder,
//       [name]: e.target.value,
//     });
//   };

//   const setReminderDate = (remindedAt) => {
//     setNewSharedReminder({
//       ...newSharedReminder,
//       remindedAt: new Date(remindedAt),
//     });
//   };

//   const saveOrAddReminder = () => {
//     if (newSharedReminder._id === "") {
//       const reminderContentToAdd = {
//         ...newSharedReminder,
//       };
//       delete reminderContentToAdd._id;

//       addSharedRecord({
//         data: reminderContentToAdd,
//         url: sharedRemindersGeneralLink(),
//       });
//     } else {
//       updateSharedRecord({
//         from: "current",
//         url: sharedReminderWithIDLink(newSharedReminder._id),
//         data: newSharedReminder,
//       });
//     }
//     setNewSharedReminder(createEmptySharedReminder);
//     setModalOn(false);
//   };

//   return {
//     newSharedReminder,
//     exitTheForm,
//     handleChange,
//     setReminderDate,
//     saveOrAddReminder,
//     selectedUser,
//     searchUser,
//     handleDeleteTags,
//     loadingUserBackend,
//     filteredData,
//     handleSelectUserFromSuggestion,
//     handleSearchTermToBackend,
//   };
// }

////////-----------------------------------------------------------------
