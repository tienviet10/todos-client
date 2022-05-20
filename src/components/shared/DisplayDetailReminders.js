import React, { useContext } from "react";
import { DetailOfAReminderContext } from "../../service/context/DetailOfAReminderContext";
import { ReminderContext } from "../../service/context/ReminderContext";
import { AiOutlineFileDone, AiFillDelete, AiFillCaretUp } from "react-icons/ai";
import { PastRemindersContext } from "../../service/context/PastRemindersContext";

const DetailOfAReminderWindow = ({ selectedTab }) => {
  const { updateRecord, discardRecord } = useContext(ReminderContext);
  const { addRecordFromActive, discardRecord: discardRecordPastReminder } =
    useContext(PastRemindersContext);
  const { reminderDetails, setDetailOn } = useContext(DetailOfAReminderContext);
  const { title, description } = reminderDetails;

  const editStatus = (item) => {
    const currentStatus = item.status;
    currentStatus === "active"
      ? (item.status = "deactive")
      : (item.status = "active");
    updateRecord(item, false);
  };

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-4">
        <div className="relative my-6 mx-auto max-w-[1000px] sm:w-[30%] max-h-[90%]">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">Details Reminder</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="defaultModal"
                onClick={() => setDetailOn(false)}
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
            {/*body*/}

            <div className="m-auto py-5 px-12 w-full">
              <label className="text-gray-600 font-medium">Title</label>
              <div className="flex">
                <p
                  className="border-solid border-gray-300 border mr-2 py-2 px-4 w-full rounded text-gray-700 overflow-auto max-h-[100px] sm:max-h-[200px]"
                  name="title"
                >
                  {title}
                </p>
              </div>

              <label className="text-gray-600 font-medium block mt-4">
                Description
              </label>
              <p
                className="border-solid border-gray-300 border py-2 px-2 w-full rounded text-gray-700 overflow-auto max-h-[200px] sm:max-h-[500px]"
                name="description"
              >
                {description}
              </p>
            </div>
            {/*footer*/}
            <div className="flex gap-16 justify-center my-7">
              {reminderDetails.status === "active" ? (
                <AiOutlineFileDone
                  className="hover:cursor-pointer"
                  color="#6366f1"
                  size={25}
                  onClick={() => {
                    editStatus(reminderDetails);
                    setDetailOn(false);
                    addRecordFromActive(reminderDetails);
                  }}
                />
              ) : (
                <AiFillCaretUp
                  className="hover:cursor-pointer"
                  size={25}
                  color="green"
                  onClick={() => {
                    const newUpdate = { ...reminderDetails, status: "active" };
                    discardRecordPastReminder(newUpdate._id, false);
                    updateRecord(newUpdate, true);
                    setDetailOn(false);
                  }}
                />
              )}

              <AiFillDelete
                className="hover:cursor-pointer"
                color="red"
                size={25}
                onClick={() => {
                  if (reminderDetails.status === "active") {
                    discardRecord(reminderDetails._id);
                  } else if (reminderDetails.status === "deactive") {
                    discardRecordPastReminder(reminderDetails._id, true);
                  }
                  setDetailOn(false);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default DetailOfAReminderWindow;
