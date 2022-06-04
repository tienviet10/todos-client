import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { REMINDER_STATUS } from "../../shared/constant/config";
import {
  getActiveRemindersLink,
  pastRemindersLink,
} from "../../shared/service/url-link";
import { AuthContext } from "../context/AuthServiceContext";
import {
  useRQCreateARecord,
  useRQDeleteARecord,
  useRQGetRecords,
  useRQUpdateARecord,
} from "./rest-request";

export function useRestOperationReminder() {
  const [allReminders, setAllReminders] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuth } = useContext(AuthContext);
  const queryClient = useQueryClient();

  //// Update reminders that past due date inside useRQGetRecords below
  const { mutate: mutateUpdateDueReminder } = useRQUpdateARecord(
    (data) => {
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
    },
    (data) => setError(data)
  );

  //Request for active reminders
  useRQGetRecords(
    "reminders",
    getActiveRemindersLink(),
    isAuth,
    (data) => {
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);

      if (data.data !== undefined) {
        const newUpdate = [];
        const pastDueRemindersTemp = [];
        const yesterdayEndDate = new Date(
          new Date(new Date().setHours(23, 59, 59)).setDate(
            new Date().getDate() - 1
          )
        );
        for (const record of data.data) {
          if (record.remindedAt) {
            const currentRemindedAt = new Date(record.remindedAt);
            if (currentRemindedAt < yesterdayEndDate) {
              pastDueRemindersTemp.push({
                ...record,
                status: REMINDER_STATUS.INACTIVE,
              });
            } else {
              newUpdate.push({ ...record, remindedAt: currentRemindedAt });
            }
          } else {
            newUpdate.push(record);
          }
        }

        mutateUpdateDueReminder({
          url: pastRemindersLink(),
          data: pastDueRemindersTemp,
        });

        setAllReminders(newUpdate);
        setLoading(false);
      }
    },
    (data) => setError(data)
  );

  //Delete a record
  const { mutate: discardRecord } = useRQDeleteARecord(
    (data) => {
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
      if (data.data !== undefined) {
        queryClient.invalidateQueries("reminders");
      }
    },
    (data) => setError(data)
  );

  //Add a record
  const { mutate: addRecord } = useRQCreateARecord(
    (data) => {
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
      if (data.data !== undefined) {
        queryClient.invalidateQueries("reminders");
      }
    },
    (data) => setError(data)
  );

  //Update a record
  const { mutate: updateRecord } = useRQUpdateARecord(
    (data) => {
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
      if (data.data !== undefined) {
        queryClient.invalidateQueries("reminders");
        //setAllReminders(newAllRecords);
      }
    },
    (data) => setError(data)
  );

  ///////----------------------------------------------------------------------

  // function updateRecord(record, fromDiscardSection) {
  //   const originalAllRecords = [...allReminders];

  //   async function execFunction() {
  //     try {
  //       if (fromDiscardSection) {
  //         setAllReminders((oldReminders) => [record, ...oldReminders]);
  //       } else if (record.status === REMINDER_STATUS.INACTIVE) {
  //         setAllReminders((oldReminders) =>
  //           oldReminders.filter((reminder) => reminder._id !== record._id)
  //         );
  //       } else {
  //         const newAllRecords = allReminders.map((reminder) =>
  //           reminder._id === record._id
  //             ? {
  //                 ...reminder,
  //                 title: record.title,
  //                 description: record.description,
  //                 favorite: record.favorite,
  //                 color: record.color,
  //                 remindedAt: record.remindedAt,
  //               }
  //             : reminder
  //         );
  //         setAllReminders(newAllRecords);
  //       }

  //       await updateARecordWithToken(
  //         reminderWithIDLinkOLD(record._id),
  //         record,
  //         token
  //       );
  //     } catch (error) {
  //       setAllReminders(originalAllRecords);
  //     }
  //   }
  //   execFunction();
  // }

  return {
    allReminders,
    error,
    loading,
    discardRecord,
    addRecord,
    updateRecord,
  };
}

/////-----------------------------------------------------------------
//Version 2

// import { useContext, useEffect, useRef, useState } from "react";
// import { REMINDER_STATUS } from "../../shared/constant/config";
// import { getLocalStorage } from "../auth/auth";
// import { AuthContext } from "../context/AuthServiceContext";
// import {
//   createARecordWithToken,
//   discardARecordWithToken,
//   getRequestWithToken,
//   updateARecordWithToken,
// } from "./rest-request";

// export function useRestOperationReminder() {
//   const isMounted = useRef(false);
//   const [allReminders, setAllReminders] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { isAuth } = useContext(AuthContext);
//   const token = getLocalStorage();

//   useEffect(() => {
//     isMounted.current = true;
//     async function init() {
//       try {
//         const response = await getRequestWithToken(
//           `/v1/reminders/active`,
//           token
//         );
//         if (response.status) {
//           if (isMounted.current) {
//             const newUpdate = [];
//             const pastDueReminders = [];
//             const yesterdayEndDate = new Date(
//               new Date(new Date().setHours(23, 59, 59)).setDate(
//                 new Date().getDate() - 1
//               )
//             );
//             for (const record of response.data) {
//               if (record.remindedAt) {
//                 const currentRemindedAt = new Date(record.remindedAt);
//                 if (currentRemindedAt < yesterdayEndDate) {
//                   pastDueReminders.push({
//                     ...record,
//                     status: REMINDER_STATUS.INACTIVE,
//                   });
//                 } else {
//                   newUpdate.push({ ...record, remindedAt: currentRemindedAt });
//                 }
//               } else {
//                 newUpdate.push(record);
//               }
//             }

//             await updateARecordWithToken(
//               `/v1/reminders/past`,
//               pastDueReminders,
//               token
//             );

//             setAllReminders(newUpdate);
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

//     async function execFunction() {
//       try {
//         if (fromDiscardSection) {
//           setAllReminders((oldReminders) => [record, ...oldReminders]);
//         } else if (record.status === REMINDER_STATUS.INACTIVE) {
//           setAllReminders((oldReminders) =>
//             oldReminders.filter((reminder) => reminder._id !== record._id)
//           );
//         } else {
//           const newAllRecords = allReminders.map((reminder) =>
//             reminder._id === record._id
//               ? {
//                   ...reminder,
//                   title: record.title,
//                   description: record.description,
//                   favorite: record.favorite,
//                   color: record.color,
//                   remindedAt: record.remindedAt,
//                 }
//               : reminder
//           );
//           setAllReminders(newAllRecords);
//         }

//         await updateARecordWithToken(
//           `/v1/reminder/${record._id}`,
//           record,
//           token
//         );
//       } catch (error) {
//         setAllReminders(originalAllRecords);
//       }
//     }
//     execFunction();
//   }

//   function discardRecord(itemID) {
//     const originalAllRecords = [...allReminders];

//     async function execFunction() {
//       try {
//         setAllReminders((oldReminders) =>
//           oldReminders.filter((reminder) => reminder._id !== itemID)
//         );
//         await discardARecordWithToken(`/v1/reminder/${itemID}`, token);
//       } catch (error) {
//         setAllReminders(originalAllRecords);
//       }
//     }
//     execFunction();
//   }

//   function addRecord(record) {
//     setLoading(true);
//     delete record._id;
//     const originalAllRecords = [...allReminders];
//     async function execFunction() {
//       try {
//         const response = await createARecordWithToken(
//           `/v1/reminder`,
//           record,
//           token
//         );

//         if (response.status) {
//           const data = response.data;

//           setAllReminders([data, ...allReminders]);
//           setLoading(false);
//         } else {
//           throw new Error("Fetch request error");
//         }
//       } catch (error) {
//         setAllReminders(originalAllRecords);

//         setLoading(false);
//       }
//     }
//     execFunction();
//   }

//   return {
//     allReminders,
//     error,
//     loading,
//     discardRecord,
//     addRecord,
//     updateRecord,
//   };
// }

/////-----------------------------------------------------------------
//Version 1

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
//         const response = await getRequestWithToken(
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
