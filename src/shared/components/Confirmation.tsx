import { useContext } from "react";
import { ConfirmationContext } from "../../service/context/ConfirmationToProceedContext";
import { CloseButton } from "./CloseButton";

export const Confirmation: React.FC = () => {
  const { setConfirmationOn, descriptionText, confirmationFunction } =
    useContext(ConfirmationContext);
  return (
    <div>
      <div className="fixed inset-0 flex justify-center items-center mx-4 overflow-x-hidden overflow-y-auto outline-none focus:outline-none z-50">
        <div className="relative my-6 mx-auto max-w-[1000px] sm:w-[30%] max-h-[90%]">
          <div className="relative bg-[#1b3663] rounded-lg shadow border border-[#8daef0]">
            <div className="flex justify-between items-start p-4 rounded-t border-b">
              <h3 className="text-xl font-semibold text-white">
                {descriptionText.titleText}
              </h3>
              <CloseButton takeAction={() => setConfirmationOn(false)} />
            </div>

            <div className="p-6 space-y-6">
              <p className="text-base leading-relaxed text-white">
                {descriptionText.displayText}
              </p>
            </div>

            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setConfirmationOn(false)}
              >
                {descriptionText.declineText}
              </button>
              <button
                className={`bg-application-color hover:bg-hover-color text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                type="button"
                onClick={confirmationFunction}
              >
                {descriptionText.confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};
