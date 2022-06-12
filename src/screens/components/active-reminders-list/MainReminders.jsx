import React from "react";
import { RemindersList } from "./RemindersList";

export const MainReminders = ({ ...props }) => {
  return <RemindersList title="Reminders" {...props} />;
};
