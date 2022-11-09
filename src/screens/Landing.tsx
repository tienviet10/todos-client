import React from "react";
import Benefits from "./components/landing-page/Benefits";
import Footer from "./components/landing-page/Footer";
import ReminderSection from "./components/landing-page/ReminderSection";
import Welcome from "./components/landing-page/Welcome";

const Landing: React.FC = () => {
  // const navigate = useNavigate();
  return (
    <div className="text-white overflow-hidden">
      <Welcome />
      <Benefits />
      <ReminderSection />
      <Footer />
    </div>
  );
};
export default Landing;
