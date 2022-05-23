import React from "react";
import { ReminderFormMain } from "./ReminderFormMain";
import { ReminderFormShared } from "./ReminderFormShared";

export const ReminderForm = ({ selectedTab }) => {
  return (
    <div>
      {selectedTab && selectedTab === "Reminder" ? (
        <ReminderFormMain />
      ) : selectedTab === "Share" ? (
        <ReminderFormShared />
      ) : (
        <div>Hi</div>
      )}
    </div>
  );
};
