import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { SCOPES } from "../../shared/constant/config";
import {
  createGoogleTokensLink,
  deleteGoogleRefreshAccessLink,
} from "../../shared/service-link/url-link";
import {
  useRQDeleteARecord,
  useRQPostARecord,
} from "../reminders-manage-request/rest-request";

let tokenClient;
const google = window.google;

export function useGoogleAuth() {
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    function gisLoaded() {
      tokenClient = google.accounts.oauth2.initCodeClient({
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope: SCOPES,
        ux_mode: "popup",
        callback: "", // defined later
      });
    }
    if (process.env.REACT_APP_CLIENT_ID) {
      gisLoaded();
    }
  }, []);

  //Add a record to mongodb then to google calendar
  const { mutate: createAGoogleCalendarToken } = useRQPostARecord(
    (data) => {
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);
      queryClient.invalidateQueries("userDetail");
    },
    (err) => setError(err)
  );

  //Add a record to mongodb then to google calendar
  const { mutate: deleteGoogleTokens } = useRQDeleteARecord(
    (data) => {
      data.response !== undefined &&
        data.response.status === 404 &&
        setError(data.message);

      queryClient.invalidateQueries("userDetail");
    },
    (err) => setError(err)
  );

  function handleAuthClick() {
    //callback defined here
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }

      createAGoogleCalendarToken({
        url: createGoogleTokensLink(),
        data: { code: resp.code },
      });
    };

    tokenClient.requestCode();
  }

  function handleGoogleLogout(userID) {
    deleteGoogleTokens(deleteGoogleRefreshAccessLink(userID));
  }

  return { handleAuthClick, handleGoogleLogout, error };
}

/////////-------------------------------------------------------------------------

//       // const event = {
//       //   summary: "Google I/O 2015",
//       //   //location: "800 Howard St., San Francisco, CA 94103",
//       //   description: "A chance to hear more about Google's developer products.",
//       //   start: {
//       //     dateTime: "2022-06-28T09:00:00-07:00",
//       //     timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//       //   },
//       //   end: {
//       //     dateTime: "2022-06-28T09:05:00-07:00",
//       //     timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//       //   },
//       //   recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
//       //   // attendees: [
//       //   //   { email: "viettran101294@gmail.com" },
//       //   //   //{ email: "sbrin@example.com" },
//       //   // ],
//       //   reminders: {
//       //     useDefault: false,
//       //     overrides: [
//       //       //{ method: "email", minutes: 24 * 60 },
//       //       { method: "popup", minutes: 10 },
//       //     ],
//       //   },
//       // };
