import React from "react";
import { FavouriteReminders } from "./FavouriteReminders";
import { MainReminders } from "./MainReminders";

const DisplayReminderList = () => {
  return (
    <>
      <FavouriteReminders />
      <br />
      <MainReminders />
    </>
  );
};

export default DisplayReminderList;
