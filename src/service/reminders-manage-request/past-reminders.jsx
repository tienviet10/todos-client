import { useState } from "react";
import { useQueryClient } from "react-query";
import { pastRemindersLink } from "../../shared/service-link/url-link";
import { useRQDeleteARecord, useRQGetRecords } from "./rest-request";

export function useRestPastReminder() {
  const [pastReminders, setPastReminders] = useState(null);
  const [error, setError] = useState(null);
  const [isPastRemindersOn, setIsPastRemindersOn] = useState(false);
  const queryClient = useQueryClient();

  //Get past reminders
  const { isLoading: loading } = useRQGetRecords(
    "pastReminders",
    pastRemindersLink(),
    isPastRemindersOn,
    (data) => {
      data.data !== undefined && setPastReminders(data.data);
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
    },
    (data) => setError(data)
  );

  //Delete a record
  const { mutate: discardRecord } = useRQDeleteARecord(
    () => {},
    (err, newReminder, context) => {
      queryClient.setQueryData("pastReminders", context.previousReminders);
      setError(err);
    },
    async (data) => {
      await queryClient.cancelQueries("pastReminders");
      const previousReminders = queryClient.getQueryData("pastReminders");

      //Optimistic update
      queryClient.setQueryData("pastReminders", (old) => {
        return {
          ...old,
          data: old.data.filter(
            (reminder) => reminder._id !== data.split("/")[3]
          ),
        };
      });

      return { previousReminders };
    },
    () => {
      queryClient.invalidateQueries("pastReminders");
    }
  );

  return {
    pastReminders,
    error,
    loading,
    discardRecord,
    setIsPastRemindersOn,
    isPastRemindersOn,
  };
}

//////--------------------------------------------------------------

// import { useContext, useEffect, useRef, useState } from "react";
// import { REMINDER_STATUS } from "../../shared/constant/config";
// import {
//   pastRemindersLink,
//   reminderWithIDLinkOLD,
// } from "../../shared/service-link/url-link";
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
