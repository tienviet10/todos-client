import React from "react";
import DateTimePicker from "react-datetime-picker";
import { LabelText } from "../../../../shared/components/LabelText";

export const ChooseDateField = ({ setReminderDate, remindedAt }) => {
  return (
    <div className="flex flex-col px-12 text-gray-600 font-medium mt-3">
      <LabelText text="Remind At:" />
      <DateTimePicker
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
