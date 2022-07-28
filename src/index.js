import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ReminderProvider } from "./service/context/ActiveRemindersContext";
import { SharedReminderProvider } from "./service/context/ActiveSharedRemindersContext";
import { AuthProvider } from "./service/context/AuthServiceContext";
import { ConfirmationProvider } from "./service/context/ConfirmationToProceedContext";
import { DetailOfAReminderProvider } from "./service/context/DetailOfAReminderContext";
import { PasswordConfirmationProfileProvider } from "./service/context/PasswordConfirmationProfileContext";
import { PastReminderProvider } from "./service/context/PastRemindersContext";
import { PastSharedReminderProvider } from "./service/context/PastSharedRemindersContext";
import { ReminderModalProvider } from "./service/context/ReminderModalContext";
import { ResponseFriendsProvider } from "./service/context/ResponseFriendsContext";
import { SevenDaysSummaryProvider } from "./service/context/SevenDaysSummaryContext";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ReminderModalProvider>
            <DetailOfAReminderProvider>
              <PasswordConfirmationProfileProvider>
                <PastReminderProvider>
                  <PastSharedReminderProvider>
                    <ReminderProvider>
                      <SharedReminderProvider>
                        <ConfirmationProvider>
                          <SevenDaysSummaryProvider>
                            <ResponseFriendsProvider>
                              <App />
                            </ResponseFriendsProvider>
                          </SevenDaysSummaryProvider>
                        </ConfirmationProvider>
                      </SharedReminderProvider>
                    </ReminderProvider>
                  </PastSharedReminderProvider>
                </PastReminderProvider>
              </PasswordConfirmationProfileProvider>
            </DetailOfAReminderProvider>
          </ReminderModalProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
