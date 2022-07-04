import { useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PasswordConfirmation } from "./screens/components/password-confirmation-profile/PasswordConfirmationProfile";
import { PastReminderToggle } from "./screens/components/past-reminders-list/PastReminderToggle";
import { DetailOfAReminderWindow } from "./screens/components/reminders-display-details/DisplayDetailReminders";
import { ReminderForm } from "./screens/components/reminders-form/ReminderForm";
import { SevenDaysSummary } from "./screens/components/summary/SevenDaysSummary";
import Dashboard from "./screens/Dashboard";
import { Landing } from "./screens/Landing";
import { Login } from "./screens/Login";
import Profile from "./screens/Profile";
import { Registration } from "./screens/Registration";
import Setting from "./screens/Setting";
import Team from "./screens/Team";
import { AuthContext } from "./service/context/AuthServiceContext";
import { ConfirmationContext } from "./service/context/ConfirmationToProceedContext";
import { DetailOfAReminderContext } from "./service/context/DetailOfAReminderContext";
import { ModalContext } from "./service/context/ModalContext";
import { PasswordConfirmationProfileContext } from "./service/context/PasswordConfirmationProfileContext";
import { SevenDaysSummaryContext } from "./service/context/SevenDaysSummaryContext";
import { Confirmation } from "./shared/components/Confirmation";
import Navbar from "./shared/components/Navbar";

function App() {
  const [selectedNavTab, setNavTab] = useState("Reminder");
  const { modalOn } = useContext(ModalContext);
  const { isAuth } = useContext(AuthContext);
  const { detailOn } = useContext(DetailOfAReminderContext);
  const { confirmationOn } = useContext(ConfirmationContext);
  const { isSummaryOn } = useContext(SevenDaysSummaryContext);
  const { passConfirmationProfileToggle } = useContext(
    PasswordConfirmationProfileContext
  );

  return (
    <div className="App h-screen">
      <div>
        <Navbar isAuth={isAuth} setNavTab={setNavTab} />
      </div>
      <Routes>
        {isAuth ? (
          <>
            <Route
              path="/dashboard"
              element={
                <>
                  <Dashboard />
                  <PastReminderToggle />
                </>
              }
            />
            <Route path="/team" element={<Team />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/setting" element={<Setting />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
        <Route
          path="*"
          element={<Navigate to={isAuth ? "/dashboard" : "/"} />}
        />
      </Routes>
      {modalOn && <ReminderForm selectedTab={selectedNavTab} />}
      {detailOn && <DetailOfAReminderWindow selectedTab={selectedNavTab} />}
      {confirmationOn && <Confirmation />}
      {isSummaryOn && <SevenDaysSummary />}
      {passConfirmationProfileToggle && <PasswordConfirmation />}
    </div>
  );
}

export default App;
