import { LabelTextType } from "../types/sub-components/SharedComponents";

export const LabelText:React.FC<LabelTextType> = ({ text }) => {
  return (
    <label className="text-white font-medium w-[110px] my-auto">{text}</label>
  );
};
