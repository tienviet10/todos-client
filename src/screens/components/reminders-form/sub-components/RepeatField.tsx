import { LabelText } from "../../../../shared/components/LabelText";
export const RepeatField = ({
  repeat,
  handleChange,
  text,
}: {
  repeat: string;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  text: string;
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
