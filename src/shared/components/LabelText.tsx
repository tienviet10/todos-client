export const LabelText = ({ text }: { text: string }): JSX.Element => {
  return (
    <label className="text-white font-medium w-[110px] my-auto">{text}</label>
  );
};
