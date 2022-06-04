import { useState } from "react";
import { useQueryClient } from "react-query";
import { pastRemindersLink } from "../../shared/service/url-link";
import { useRQDeleteARecord, useRQGetARecordPause } from "./rest-request";

export function useRestPastReminder() {
  const [pastReminders, setPastReminders] = useState(null);
  const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  // //Get past reminders
  // useRQGetRecords(
  //   "pastReminders",
  //   pastRemindersLink(),
  //   isAuth,
  //   (data) => {
  //     data.data !== undefined && setPastReminders(data.data);
  //     data.response !== undefined &&
  //       data.response.status === 404 &&
  //       setError(data.message);
  //     // setLoading(false);
  //   },
  //   (data) => setError(data)
  // );

  //Get past reminders
  const { refetch: refetchPastReminders } = useRQGetARecordPause(
    "pastReminders",
    pastRemindersLink(),
    (data) => {
      data.data !== undefined && setPastReminders(data.data);
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
      // setLoading(false);
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
        queryClient.invalidateQueries("pastReminders");
      }
    },
    (data) => setError(data)
  );

  return {
    pastReminders,
    error,
    //loading,
    discardRecord,
    refetchPastReminders,
  };
}

//////--------------------------------------------------------------

// import { useContext, useEffect, useRef, useState } from "react";
// import { REMINDER_STATUS } from "../../shared/constant/config";
// import {
//   pastRemindersLink,
//   reminderWithIDLinkOLD,
// } from "../../shared/service/url-link";
// import { getLocalStorage } from "../auth/auth";
// import { AuthContext } from "../context/AuthServiceContext";
// import { discardARecordWithToken, getRequestWithToken } from "./rest-request";

// export function useRestPastReminder() {
//   const isMounted = useRef(false);
//   const [pastReminders, setPastReminders] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { isAuth } = useContext(AuthContext);
//   const token = getLocalStorage();

//   useEffect(() => {
//     isMounted.current = true;
//     async function init() {
//       try {
//         const response = await getRequestWithToken(pastRemindersLink(), token);
//         if (response.status) {
//           const json = response.data;

//           if (isMounted.current) {
//             setPastReminders(json);
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

//   function discardRecord(itemID, typeOfDelete) {
//     const originalRecords = [...pastReminders];
//     const newRecords = pastReminders.filter(function (rec) {
//       return rec._id !== itemID;
//     });

//     async function execFunction() {
//       try {
//         setPastReminders(newRecords);
//         if (typeOfDelete) {
//           await discardARecordWithToken(reminderWithIDLinkOLD(itemID), token);
//         }
//       } catch (error) {
//         setPastReminders(originalRecords);
//       }
//     }
//     execFunction();
//   }

//   function addRecordFromActive(record) {
//     setPastReminders([
//       { ...record, status: REMINDER_STATUS.INACTIVE },
//       ...pastReminders,
//     ]);
//   }

//   return {
//     pastReminders,
//     error,
//     loading,
//     discardRecord,
//     addRecordFromActive,
//   };
// }
