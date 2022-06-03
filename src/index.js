import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./service/context/AuthServiceContext";
import { ConfirmationProvider } from "./service/context/ConfirmationToProceedContext";
import { DetailOfAReminderProvider } from "./service/context/DetailOfAReminderContext";
import { ModalProvider } from "./service/context/ModalContext";
import { PastReminderProvider } from "./service/context/PastRemindersContext";
import { ReminderProvider } from "./service/context/ReminderContext";
import { SevenDaysSummaryProvider } from "./service/context/SevenDaysSummaryContext";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <DetailOfAReminderProvider>
              <PastReminderProvider>
                <ReminderProvider>
                  <ConfirmationProvider>
                    <SevenDaysSummaryProvider>
                      <App />
                    </SevenDaysSummaryProvider>
                  </ConfirmationProvider>
                </ReminderProvider>
              </PastReminderProvider>
            </DetailOfAReminderProvider>
          </ModalProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
