import { useContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Dashboard from "./screens/Dashboard";
import Team from "./screens/Team";
import Profile from "./screens/Profile";
import Setting from "./screens/Setting";
import { Login } from "./screens/Login";
import { Registration } from "./screens/Registration";
import { Landing } from "./screens/Landing";
import ReminderForm from "./components/shared/ReminderForm";
import { ReminderProvider } from "./service/context/ReminderContext";
import { ModalContext } from "./service/context/ModalContext";
import { AuthContext } from "./service/context/AuthService";
import { PastReminderToggle } from "./components/reminderslist/PastReminderToggle";

function App() {
  const [selectedNavTab, setNavTab] = useState("Reminder");
  const { modalOn } = useContext(ModalContext);
  const { isAuth } = useContext(AuthContext);

  return (
    <ReminderProvider>
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
      </div>
    </ReminderProvider>
  );
}

export default App;
