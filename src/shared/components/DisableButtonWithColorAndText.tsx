import { DisableButtonWithColorAndTextType } from "../types/sub-components/SharedComponents";
import { classNames } from "./color-picker/color-choice";

export const DisableButtonWithColorAndText:React.FC<DisableButtonWithColorAndTextType> = ({
  buttonColor,
  buttonText,
}) => {
  return (
    <button
      disabled
      className={classNames(
        "py-1 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2",
        buttonColor
      )}
    >
      {buttonText}
    </button>
  );
};
