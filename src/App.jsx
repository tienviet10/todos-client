import { useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
import { SevenDaysSummaryContext } from "./service/context/SevenDaysSummaryContext";
import { Confirmation } from "./shared/components/general/Confirmation";
import Navbar from "./shared/components/general/Navbar";
import { PastReminderToggle } from "./shared/components/past-reminders-list/PastReminderToggle";
import { DetailOfAReminderWindow } from "./shared/components/reminders-display-details/DisplayDetailReminders";
import { ReminderForm } from "./shared/components/reminders-form/ReminderForm";
import { SevenDaysSummary } from "./shared/components/summary/SevenDaysSummary";

function App() {
  const [selectedNavTab, setNavTab] = useState("Reminder");
  const { modalOn } = useContext(ModalContext);
  const { isAuth } = useContext(AuthContext);
  const { detailOn } = useContext(DetailOfAReminderContext);
  const { confirmationOn } = useContext(ConfirmationContext);
  const { isSummaryOn } = useContext(SevenDaysSummaryContext);

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
    </div>
  );
}

export default App;
