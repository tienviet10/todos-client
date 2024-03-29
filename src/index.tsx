import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { initReactI18next } from "react-i18next";
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
import LoaderFullscreen from "./shared/components/loading-spinner/LoaderFullscreen";

const queryClient = new QueryClient();

i18n
  .use(HttpApi)
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    supportedLngs: ["en", "vi", "fr"],
    fallbackLng: "en",
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
  });

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
  <Suspense fallback={<LoaderFullscreen />}>
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
  </Suspense>
);
