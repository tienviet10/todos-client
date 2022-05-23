import React from "react";
import { FavoriteReminders } from "./FavoriteReminders";
import { MainReminders } from "./MainReminders";

export const DisplayReminderList = () => {
  return (
    <>
      <FavoriteReminders />
      <br />
      <MainReminders />
    </>
  );
};
