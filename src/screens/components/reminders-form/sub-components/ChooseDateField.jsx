import React from "react";
import DateTimePicker from "react-datetime-picker";
import { LabelText } from "../../../../shared/components/LabelText";

export const ChooseDateField = ({ setReminderDate, remindedAt, text }) => {
  return (
    <div className="flex flex-col px-12 text-white font-medium mt-3">
      <LabelText text={text} />
      <DateTimePicker
        calendarClassName="bg-black"
        className="z-8 mt-1"
        disableClock
        minDate={new Date()}
        onChange={setReminderDate}
        value={remindedAt}
        name="remindedAt"
      />
    </div>
  );
};
