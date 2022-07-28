import React from "react";
import { LabelText } from "../../../../shared/components/LabelText";

export const RepeatField = ({ repeat, handleChange }) => {
  return (
    <div className="block px-12 mb-5 py-2 mt-2">
      <LabelText text="Repeated:" />
      <select
        className="ml-2"
        id="repeat"
        value={repeat}
        onChange={handleChange("repeat")}
      >
        <option value="none">None</option>
        <option value="HOURLY">Hourly</option>
        <option value="DAILY">Daily</option>
        <option value="WEEKLY">Weekly</option>
        <option value="MONTHLY">Monthly</option>
        <option value="YEARLY">Yearly</option>
      </select>
    </div>
  );
};
