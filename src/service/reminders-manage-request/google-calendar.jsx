export function useGoogleCalendar() {
  return {};
}

/////////-------------------------------------------------------------------------

// import { useEffect } from "react";
// import { DISCOVERY_DOC, SCOPES } from "../../shared/constant/config";
// import { getLocalStorage, storeAuthentication } from "../auth/auth";

// let tokenClient;
// const gapi = window.gapi;
// const google = window.google;

// export function useGoogleCalendar() {
//   useEffect(() => {
//     /**
//      * Callback after api.js is loaded.
//      */
//     function gapiLoaded() {
//       gapi.load("client", initializeGapiClient);
//       //console.log("load gapiLoaded");
//     }

//     /**
//      * Callback after the API client is loaded. Loads the
//      * discovery doc to initialize the API.
//      */
//     async function initializeGapiClient() {
//       await gapi.client
//         .init({
//           apiKey: process.env.REACT_APP_API_KEY,
//           // clientId: process.env.REACT_APP_CLIENT_ID,
//           discoveryDocs: [DISCOVERY_DOC],
//         })
//         .then(() => {
//           const calendarToken = getLocalStorage("googleCalendar");
//           if (calendarToken && calendarToken !== "") {
//             gapi.client.setToken(calendarToken);
//           }
//         });
//     }

//     /**
//      * Callback after Google Identity Services are loaded.
//      */
//     function gisLoaded() {
//       tokenClient = google.accounts.oauth2.initTokenClient({
//         client_id: process.env.REACT_APP_CLIENT_ID,
//         scope: SCOPES,
//         callback: "", // defined later
//       });
//     }
//     if (process.env.REACT_APP_CLIENT_ID && process.env.REACT_APP_API_KEY) {
//       gapiLoaded();
//       gisLoaded();
//     }
//   }, []);

//   /**
//    *  Sign in the user upon button click.
//    */
//   function handleAuthClick({
//     summary,
//     description,
//     startTime,
//     endTime,
//     recurrence,
//   }) {
//     tokenClient.callback = async (resp) => {
//       if (resp.error !== undefined) {
//         throw resp;
//       }

//       console.log("resp");
//       console.log(resp.access_token);
//       console.log(gapi.client.getToken());

//       storeAuthentication("googleCalendar", resp.access_token);

//       const event = {
//         summary: summary,
//         description: description,
//         start: {
//           dateTime: startTime,
//           timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//         },
//         end: {
//           dateTime: endTime,
//           timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//         },
//         //recurrence: ["RRULE:FREQ=DAILY;COUNT=4"],
//         reminders: {
//           useDefault: false,
//           overrides: [{ method: "popup", minutes: 10 }],
//         },
//       };
//       if (recurrence && recurrence !== "none") {
//         event["recurrence"] = [`RRULE:FREQ=${recurrence};COUNT=4`];
//       }

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

//       const request = gapi.client.calendar.events.insert({
//         calendarId: "primary",
//         resource: event,
//       });
//       request.execute();
//       // request.execute((event) => {
//       //   window.open(event.htmlLink);
//       // });
//     };

//     if (gapi.client.getToken() === null) {
//       // Prompt the user to select a Google Account and ask for consent to share their data
//       // when establishing a new session.
//       tokenClient.requestAccessToken({ prompt: "consent" });
//     } else {
//       // Skip display of account chooser and consent dialog for an existing session.
//       try {
//         tokenClient.requestAccessToken({ prompt: "" });
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   }

//   return { handleAuthClick };
// }
