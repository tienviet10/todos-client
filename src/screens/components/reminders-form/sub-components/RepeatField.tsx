import { LabelText } from "../../../../shared/components/LabelText";
import { RepeatFieldType } from "../../../../shared/types/reminders-form/ReminderForm";
export const RepeatField:React.FC<RepeatFieldType> = ({
  repeat,
  handleChange,
  text,
}) => {
  return (
    <div className="block px-12 mb-5 py-2 mt-2">
      <LabelText text={text} />
      <select
        name="repeat"
        className="ml-2 bg-[#1b3663] text-white"
        id="repeat"
        value={repeat}
        onChange={handleChange}
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
