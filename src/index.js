import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./service/context/AuthServiceContext";
import { ConfirmationProvider } from "./service/context/ConfirmationToProceedContext";
import { DetailOfAReminderProvider } from "./service/context/DetailOfAReminderContext";
import { ModalProvider } from "./service/context/ModalContext";
import { NotificationProvider } from "./service/context/NotificationContext";
import { PastReminderProvider } from "./service/context/PastRemindersContext";
import { ReminderProvider } from "./service/context/ReminderContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>
          <DetailOfAReminderProvider>
            <NotificationProvider>
              <PastReminderProvider>
                <ReminderProvider>
                  <ConfirmationProvider>
                    <App />
                  </ConfirmationProvider>
                </ReminderProvider>
              </PastReminderProvider>
            </NotificationProvider>
          </DetailOfAReminderProvider>
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
