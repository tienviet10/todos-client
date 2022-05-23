import React, { useContext } from "react";
import { ModalContext } from "../../service/context/ModalContext";

export const ReminderFormShared = () => {
  const { newReminder, setModalOn } = useContext(ModalContext);
  const { title, description, _id } = newReminder;
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-4">
        <div className="relative my-6 mx-auto max-w-[1000px] sm:w-[30%]">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">Share Reminder</h3>
            </div>
            {/*body*/}

            <form className="m-auto py-5 px-12 w-full">
              <label className="text-gray-600 font-medium">Title</label>
              <input
                className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                name="title"
                value={title}
                placeholder="Shopping List, etc."
                autoFocus
                // onChange={handleChange("title")}
              />
              <label className="text-gray-600 font-medium block mt-4">
                Description
              </label>
              <textarea
                value={description}
                rows={5}
                className="border-solid border-gray-300 border py-2 px-2 w-full rounded text-gray-700"
                name="description"
                // onChange={handleChange("description")}
              />
            </form>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  setModalOn(false);
                }}
              >
                Close
              </button>
              <button
                className={`bg-application-color hover:bg-hover-color text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                type="button"
                onClick={(e) => {}}
              >
                {_id ? "Save Reminder" : "Add Reminder"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
