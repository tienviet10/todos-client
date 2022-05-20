import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./service/context/ModalContext";
import { AuthProvider } from "./service/context/AuthService";
import { DetailOfAReminderProvider } from "./service/context/DetailOfAReminderContext";
import { PastReminderProvider } from "./service/context/PastRemindersContext";
import { ReminderProvider } from "./service/context/ReminderContext";
import { ConfirmationProvider } from "./service/context/ConfirmationToProceedContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>
          <DetailOfAReminderProvider>
            <PastReminderProvider>
              <ReminderProvider>
                <ConfirmationProvider>
                  <App />
                </ConfirmationProvider>
              </ReminderProvider>
            </PastReminderProvider>
          </DetailOfAReminderProvider>
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
