import React, { useContext } from "react";
import { ConfirmationContext } from "../../service/context/ComfirmationToProceed";

export const Confirmation = () => {
  const { setConfirmationOn, descriptionText, discardAction } =
    useContext(ConfirmationContext);
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-4">
        <div className="relative my-6 mx-auto max-w-[1000px] sm:w-[30%] max-h-[90%]">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex justify-between items-start p-4 rounded-t border-b border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900">
                {descriptionText.titleText}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="defaultModal"
                onClick={() => setConfirmationOn(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-base leading-relaxed text-gray-500">
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
                onClick={() => discardAction()}
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
