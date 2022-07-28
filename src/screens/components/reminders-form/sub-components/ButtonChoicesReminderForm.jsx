import React from "react";

export const ButtonChoicesReminderForm = ({
  exitTheForm,
  saveOrAddReminder,
  _id,
}) => {
  return (
    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
      <button
        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => exitTheForm()}
      >
        Close
      </button>
      <button
        className="bg-application-color hover:bg-hover-color text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={(e) => saveOrAddReminder()}
      >
        {_id ? "Save Reminder" : "Add Reminder"}
      </button>
    </div>
  );
};
