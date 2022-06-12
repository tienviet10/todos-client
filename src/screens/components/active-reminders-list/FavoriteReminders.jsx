import React from "react";
import { RemindersList } from "./RemindersList";

export const FavoriteReminders = ({ ...props }) => {
  return <RemindersList title="Favorite" {...props} />;
};
