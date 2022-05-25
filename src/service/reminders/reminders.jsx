import { useContext, useEffect, useRef, useState } from "react";
import { API, REMINDER_STATUS } from "../../shared/constant/config";
import { getLocalStorage } from "../auth/auth";
import { AuthContext } from "../context/AuthServiceContext";
import {
  createAReminder,
  discardAReminder,
  getReminders,
  updateAReminder,
} from "./rest-request";

export function useRestOperationReminder() {
  const isMounted = useRef(false);
  const [allReminders, setAllReminders] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuth } = useContext(AuthContext);
  const token = getLocalStorage();

  useEffect(() => {
    isMounted.current = true;
    async function init() {
      try {
        const response = await getReminders(
          `${API}/v1/reminders/active`,
          token
        );
        if (response.status) {
          if (isMounted.current) {
            const newUpdate = response.data.map((item) =>
              item.remindedAt
                ? { ...item, remindedAt: new Date(item.remindedAt) }
                : item
            );

            setAllReminders(newUpdate);
          }
        } else {
          throw response;
        }
      } catch (e) {
        if (isMounted.current) setError(e);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    }
    if (isAuth && token && token !== "") init();

    return () => {
      isMounted.current = false;
    };
  }, [isAuth, token]);

  function updateRecord(record, fromDiscardSection) {
    const originalAllRecords = [...allReminders];

    async function execFunction() {
      try {
        if (fromDiscardSection) {
          setAllReminders((oldReminders) => [record, ...oldReminders]);
        } else if (record.status === REMINDER_STATUS.INACTIVE) {
          setAllReminders((oldReminders) =>
            oldReminders.filter((reminder) => reminder._id !== record._id)
          );
        } else {
          const newAllRecords = allReminders.map((reminder) =>
            reminder._id === record._id
              ? {
                  ...reminder,
                  title: record.title,
                  description: record.description,
                  favorite: record.favorite,
                  color: record.color,
                  remindedAt: record.remindedAt,
                }
              : reminder
          );
          setAllReminders(newAllRecords);
        }

        await updateAReminder(
          `${API}/v1/reminder/${record._id}`,
          record,
          token
        );
      } catch (error) {
        setAllReminders(originalAllRecords);
      }
    }
    execFunction();
  }

  function discardRecord(itemID) {
    const originalAllRecords = [...allReminders];

    async function execFunction() {
      try {
        setAllReminders((oldReminders) =>
          oldReminders.filter((reminder) => reminder._id !== itemID)
        );
        await discardAReminder(`${API}/v1/reminder/${itemID}`, token);
      } catch (error) {
        setAllReminders(originalAllRecords);
      }
    }
    execFunction();
  }

  function addRecord(record) {
    setLoading(true);
    delete record._id;
    const originalAllRecords = [...allReminders];
    async function execFunction() {
      try {
        const response = await createAReminder(
          `${API}/v1/reminder`,
          record,
          token
        );

        if (response.status) {
          const data = response.data;

          setAllReminders([data, ...allReminders]);
          setLoading(false);
        } else {
          throw new Error("Fetch request error");
        }
      } catch (error) {
        setAllReminders(originalAllRecords);

        setLoading(false);
      }
    }
    execFunction();
  }

  return {
    allReminders,
    error,
    loading,
    discardRecord,
    //updateStatusRecord,
    addRecord,
    updateRecord,
  };
}

// import { useContext, useEffect, useRef, useState } from "react";
// import { API, REMINDER_STATUS } from "../../shared/constant/config";
// import { getLocalStorage } from "../auth/auth";
// import { AuthContext } from "../context/AuthServiceContext";
// import {
//   createAReminder,
//   discardAReminder,
//   getReminders,
//   updateAReminder,
// } from "./rest-request";

// export function useRestOperationReminder() {
//   const isMounted = useRef(false);
//   const [allReminders, setAllReminders] = useState(null);
//   const [reminders, setReminders] = useState(null);
//   const [favoriteReminders, setFavoriteReminders] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { isAuth } = useContext(AuthContext);
//   const token = getLocalStorage();

//   useEffect(() => {
//     isMounted.current = true;
//     async function init() {
//       try {
//         const response = await getReminders(
//           `${API}/v1/reminders/active`,
//           token
//         );
//         if (response.status) {
//           const json = response.data;

//           if (isMounted.current) {
//             const favList = [];
//             const mainList = [];
//             for (const item of json) {
//               if (item.favorite) {
//                 favList.push(item);
//               } else {
//                 mainList.push(item);
//               }
//             }
//             setFavoriteReminders(favList);
//             setReminders(mainList);
//             setAllReminders(mainList.concat(favList));
//           }
//         } else {
//           throw response;
//         }
//       } catch (e) {
//         if (isMounted.current) setError(e);
//       } finally {
//         if (isMounted.current) setLoading(false);
//       }
//     }
//     if (isAuth && token && token !== "") init();

//     return () => {
//       isMounted.current = false;
//     };
//   }, [isAuth, token]);

//   function updateRecord(record, fromDiscardSection) {
//     const originalAllRecords = [...allReminders];
//     const originalRecords = [...reminders];
//     const originalFavoriteRecords = [...favoriteReminders];

//     let newAllRecords = [];
//     let newRecords = [];
//     let favRecord = [];
//     for (const item of allReminders) {
//       if (item._id === record._id) {
//         if (record.status !== REMINDER_STATUS.INACTIVE) {
//           let itemToStore = {
//             ...item,
//             title: record.title,
//             description: record.description,
//           };
//           if (!record.favorite) {
//             itemToStore.favorite = record.favorite;
//           }

//           newAllRecords.push(itemToStore);
//           record.favorite
//             ? favRecord.unshift(itemToStore)
//             : newRecords.unshift(itemToStore);
//         }
//       } else {
//         newAllRecords.push(item);
//         item.favorite ? favRecord.push(item) : newRecords.push(item);
//       }
//     }

//     if (fromDiscardSection) {
//       newAllRecords.push(record);
//       record.favorite ? favRecord.unshift(record) : newRecords.unshift(record);
//     }

//     console.log(newAllRecords);
//     console.log(favRecord);
//     console.log(newRecords);

//     async function execFunction() {
//       try {
//         setReminders(newRecords);
//         setFavoriteReminders(favRecord);
//         setAllReminders(newAllRecords);
//         await updateAReminder(
//           `${API}/v1/reminder/${record._id}`,
//           record,
//           token
//         );
//       } catch (error) {
//         setReminders(originalRecords);
//         setFavoriteReminders(originalFavoriteRecords);
//         setAllReminders(originalAllRecords);
//       }
//     }
//     execFunction();
//   }

//   function discardRecord(itemID) {
//     const originalAllRecords = [...allReminders];
//     const originalRecords = [...reminders];
//     const originalFavoriteRecords = [...favoriteReminders];

//     const newAllRecords = [];
//     const newRecords = [];
//     const favRecord = [];
//     for (const item of allReminders) {
//       if (item._id !== itemID) {
//         newAllRecords.push(item);
//         item.favorite ? favRecord.push(item) : newRecords.push(item);
//       }
//     }

//     async function execFunction() {
//       try {
//         setReminders(newRecords);
//         setFavoriteReminders(favRecord);
//         setAllReminders(newAllRecords);
//         await discardAReminder(`${API}/v1/reminder/${itemID}`, token);
//       } catch (error) {
//         setReminders(originalRecords);
//         setFavoriteReminders(originalFavoriteRecords);
//         setAllReminders(originalAllRecords);
//       }
//     }
//     execFunction();
//   }

//   function addRecord(record) {
//     setLoading(true);
//     delete record._id;
//     const originalRecords = [...reminders];
//     const originalAllRecords = [...allReminders];
//     const originalFavRecords = [...favoriteReminders];
//     async function execFunction() {
//       try {
//         const response = await createAReminder(
//           `${API}/v1/reminder`,
//           record,
//           token
//         );

//         if (response.status) {
//           const data = response.data;
//           if (data.favorite) {
//             setFavoriteReminders([data, ...favoriteReminders]);
//           } else {
//             setReminders([data, ...reminders]);
//           }

//           setAllReminders([data, ...allReminders]);
//           setLoading(false);
//         } else {
//           throw new Error("Fetch request error");
//         }

//         // await createAReminder(`${API}/v1/reminder`, record, token).then(
//         //   (res) => {
//         //     if (res.data.favorite === true) {
//         //       setFavoriteReminders([res.data, ...favoriteReminders]);
//         //     } else {
//         //       setReminders([res.data, ...reminders]);
//         //     }

//         //     setAllReminders([res.data, ...allReminders]);
//         //     setLoading(false);
//         //   }
//         // );
//       } catch (error) {
//         setReminders(originalRecords);
//         setAllReminders(originalAllRecords);
//         setFavoriteReminders(originalFavRecords);
//         setLoading(false);
//       }
//     }
//     execFunction();
//   }

//   return {
//     allReminders,
//     reminders,
//     favoriteReminders,
//     error,
//     loading,
//     discardRecord,
//     //updateStatusRecord,
//     addRecord,
//     updateRecord,
//   };
// }
