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
import { Confirmation } from "./shared/components/general/Confirmation";
import Navbar from "./shared/components/general/Navbar";
import { ReminderForm } from "./shared/components/reminders-form/ReminderForm";
import { DetailOfAReminderWindow } from "./shared/components/reminders-list/DisplayDetailReminders";
import { PastReminderToggle } from "./shared/components/reminders-list/PastReminderToggle";

function App() {
  const [selectedNavTab, setNavTab] = useState("Reminder");
  const { modalOn } = useContext(ModalContext);
  const { isAuth } = useContext(AuthContext);
  const { detailOn } = useContext(DetailOfAReminderContext);
  const { confirmationOn } = useContext(ConfirmationContext);

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
                  <br />
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
    </div>
  );
}

export default App;
