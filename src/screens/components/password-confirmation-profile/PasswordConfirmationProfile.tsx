import { useContext, useState } from "react";
import { PasswordConfirmationProfileContext } from "../../../service/context/PasswordConfirmationProfileContext";

export const PasswordConfirmation = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const { setPassConfirmationProfileToggle, confirmationRequest } = useContext(
    PasswordConfirmationProfileContext
  );

  const exitTheForm = () => {
    setPassConfirmationProfileToggle(false);
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center overflow-x-hidden overflow-y-auto mx-4 outline-none focus:outline-none z-50">
        <div className="relative my-6 mx-auto max-w-[800px] sm:w-[60%]">
          {/*content*/}
          <div className="relative flex flex-col border-0 rounded-lg shadow-lg w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">Confirmation Changes</h3>
              {/* <CloseButton takeAction={() => exitTheForm()} /> */}
            </div>
            {/*body*/}
            <div className="p-6 px-10">
              <label className="text-gray-600 font-medium">
                Your current password:{" "}
              </label>
              <input
                className="border-solid border-gray-300 border py-2 px-4 mt-2 w-full rounded text-gray-700"
                name="password"
                value={currentPassword}
                type="password"
                placeholder="********"
                autoFocus
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => exitTheForm()}
              >
                Close
              </button>
              <button
                className={`bg-application-color hover:bg-hover-color text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                type="button"
                onClick={() => confirmationRequest(currentPassword)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
