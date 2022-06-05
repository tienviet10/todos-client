import { format } from "date-fns";
import React, { useContext } from "react";
import { AiFillCaretUp, AiFillDelete, AiOutlineFileDone } from "react-icons/ai";
import { ConfirmationContext } from "../../../service/context/ConfirmationToProceedContext";
import { DetailOfAReminderContext } from "../../../service/context/DetailOfAReminderContext";
import { PastRemindersContext } from "../../../service/context/PastRemindersContext";
import { ReminderContext } from "../../../service/context/ReminderContext";
import { REMINDER_STATUS } from "../../constant/config";
import { reminderWithIDLink } from "../../service/url-link";
import { CloseButton } from "../general/CloseButton";
import LoaderFullscreen from "../general/LoaderFullscreen";

export const DetailOfAReminderWindow = ({ selectedTab }) => {
  const { updateRecord, discardRecord: discardRecordActiveReminder } =
    useContext(ReminderContext);
  const { discardRecord: discardRecordPastReminder } =
    useContext(PastRemindersContext);
  const { reminderDetails, setDetailOn } = useContext(DetailOfAReminderContext);
  const { title, description, remindedAt } = reminderDetails;
  const { confirm } = useContext(ConfirmationContext);

  const execDeletion = (reminderDetails) => {
    confirm({
      onSuccess:
        reminderDetails.status === REMINDER_STATUS.ACTIVE
          ? () =>
              discardRecordActiveReminder(
                reminderWithIDLink(reminderDetails._id)
              )
          : () =>
              discardRecordPastReminder(
                reminderWithIDLink(reminderDetails._id)
              ),
    });

    setDetailOn(false);
  };

  const moveReminderToPast = (reminderDetails) => {
    updateRecord({
      from: "currentToPast",
      url: reminderWithIDLink(reminderDetails._id),
      data: { ...reminderDetails, status: REMINDER_STATUS.INACTIVE },
    });
    setDetailOn(false);
  };

  const restoreReminder = (reminderDetails) => {
    const yesterdayEndDate = new Date(
      new Date(new Date().setHours(23, 59, 59)).setDate(
        new Date().getDate() - 1
      )
    );

    updateRecord({
      from: "past",
      url: reminderWithIDLink(reminderDetails._id),
      data: { ...reminderDetails, status: REMINDER_STATUS.ACTIVE },
      remindedAt:
        new Date(reminderDetails._id) < yesterdayEndDate
          ? null
          : reminderDetails.remindedAt,
    });
    setDetailOn(false);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-4">
        <div className="relative my-6 mx-auto max-w-[1000px] sm:w-[60%] max-h-[90%] shadow-2xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">Details Reminder</h3>
              <CloseButton takeAction={() => setDetailOn(false)} />
            </div>
            {/*body*/}
            {title === "" && description === "" ? (
              <LoaderFullscreen />
            ) : (
              <>
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
                    Remind At
                  </label>
                  <div className="flex">
                    <p
                      className="border-solid border-gray-300 border mr-2 py-2 px-4 w-full rounded text-gray-700 overflow-auto max-h-[100px] sm:max-h-[200px]"
                      name="title"
                    >
                      {remindedAt
                        ? format(new Date(remindedAt), "PPPPp")
                        : "----No-Date----"}
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
                  {reminderDetails.status === REMINDER_STATUS.ACTIVE ? (
                    <AiOutlineFileDone
                      className="hover:cursor-pointer"
                      color="#6366f1"
                      size={25}
                      onClick={() => moveReminderToPast(reminderDetails)}
                    />
                  ) : (
                    <AiFillCaretUp
                      className="hover:cursor-pointer"
                      size={25}
                      color="green"
                      onClick={() => restoreReminder(reminderDetails)}
                    />
                  )}

                  <AiFillDelete
                    className="hover:cursor-pointer"
                    color="red"
                    size={25}
                    onClick={() => execDeletion(reminderDetails)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
