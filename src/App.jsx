import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PasswordConfirmation } from "./screens/components/password-confirmation-profile/PasswordConfirmationProfile";
import { DetailOfAReminderWindow } from "./screens/components/reminders-display-details/DisplayDetailReminders";
import { ReminderForm } from "./screens/components/reminders-form/ReminderForm";
import { SevenDaysSummary } from "./screens/components/summary/SevenDaysSummary";
import Friends from "./screens/Friends";
import Landing from "./screens/Landing.tsx";
import { Login } from "./screens/Login";
import { MainReminders } from "./screens/MainReminders";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import Profile from "./screens/Profile";
import { Registration } from "./screens/Registration";
import Setting from "./screens/Setting";
import SharedReminders from "./screens/SharedReminders";
import { AuthContext } from "./service/context/AuthServiceContext";
import { ConfirmationContext } from "./service/context/ConfirmationToProceedContext";
import { DetailOfAReminderContext } from "./service/context/DetailOfAReminderContext";
import { PasswordConfirmationProfileContext } from "./service/context/PasswordConfirmationProfileContext";
import { ReminderModalContext } from "./service/context/ReminderModalContext";
import { SevenDaysSummaryContext } from "./service/context/SevenDaysSummaryContext";
import { Confirmation } from "./shared/components/Confirmation";
import Navbar from "./shared/components/navbar/Navbar";
import { NAV_TABS } from "./shared/constant/config";

function App() {
  const { modalOn, selectedNavTab, setNavTab } =
    useContext(ReminderModalContext);
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
        <Navbar
          isAuth={isAuth}
          setNavTab={setNavTab}
          selectedNavTab={selectedNavTab}
        />
      </div>
      <Routes>
        {isAuth ? (
          <>
            <Route path={NAV_TABS[0].href} element={<MainReminders />} />
            <Route path={NAV_TABS[1].href} element={<SharedReminders />} />
            <Route path={NAV_TABS[2].href} element={<Profile />} />
            <Route path={NAV_TABS[4].href} element={<Friends />} />
            <Route path={NAV_TABS[3].href} element={<Setting />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route path={NAV_TABS[5].href} element={<Registration />} />
            <Route path={NAV_TABS[6].href} element={<Login />} />
          </>
        )}
        <Route path={NAV_TABS[7].href} element={<PrivacyPolicy />} />
        <Route
          path="*"
          element={<Navigate to={isAuth ? NAV_TABS[0].href : "/"} />}
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
