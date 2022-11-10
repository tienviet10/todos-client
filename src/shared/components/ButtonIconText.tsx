import { MouseEventHandler } from "react";

export const ButtonIconText = ({
  iconImage,
  testDisplay,
  onClick,
}: {
  iconImage: string;
  testDisplay: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}): JSX.Element => {
  return (
    <button
      className="flex p-2 text-application-color font-bold uppercase text-xs px-4 py-2 mr-1 mb-1 rounded border border-application-color outline-none focus:outline-none hover:bg-hover-color hover:border-hover-color hover:text-white active:bg-application-color ease-linear transition-all duration-150"
      onClick={onClick}
    >
      <div className="my-auto">{iconImage}</div>
      <div className="ml-2">{testDisplay}</div>
    </button>
  );
};
