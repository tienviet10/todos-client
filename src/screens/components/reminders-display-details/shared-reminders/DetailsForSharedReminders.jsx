import { format } from "date-fns";
import React from "react";
import { AiFillCaretUp, AiFillDelete, AiOutlineFileDone } from "react-icons/ai";
import { useManageDisplayDetailSharedRemindersState } from "../../../../service/reminders-manage-state/manage-display-detail-shared-reminders";
import { CloseButton } from "../../../../shared/components/CloseButton";
import LoaderFullscreen from "../../../../shared/components/loading-spinner/LoaderFullscreen";
import { REMINDER_STATUS } from "../../../../shared/constant/config";

export const DetailsForSharedReminders = () => {
  const {
    setDetailOn,
    sharedReminderDetails,
    moveReminderToPast,
    restoreReminder,
    execDeletion,
  } = useManageDisplayDetailSharedRemindersState();
  const { title, description, remindedAt, status, groupUsers } =
    sharedReminderDetails;

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center overflow-x-hidden overflow-y-auto mx-4 outline-none focus:outline-none z-50">
        <div className="relative my-6 mx-auto max-w-[800px] sm:w-[60%] max-h-[75%] shadow-2xl">
          <div className="relative flex flex-col border-0 rounded-lg shadow-lg w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">
                Details Shared Reminder
              </h3>
              <CloseButton takeAction={() => setDetailOn(false)} />
            </div>

            {/*body*/}
            {title === "" && description === "" ? (
              <LoaderFullscreen />
            ) : (
              <>
                <div className="m-auto py-5 px-12 w-full">
                  {/* Collaborators */}
                  <div className="flex mb-4">
                    <label className="text-gray-600 font-medium mr-3">
                      Collaborator:
                    </label>
                    <ul className="flex overflow-hidden overflow-x-auto text-sm my-auto">
                      {groupUsers.editor.map((selectedUser, index) => (
                        <li
                          key={index}
                          className="flex flex-shrink-0 w-auto h-[26px] items-center justify-center text-white rounded-md px-1 mr-3 bg-application-color"
                        >
                          <div className="px-2">{selectedUser.username}</div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Title */}
                  <label className="text-gray-600 font-medium">Title:</label>
                  <div className="flex">
                    <p
                      className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700 overflow-auto max-h-[100px] sm:max-h-[200px]"
                      name="title"
                    >
                      {title}
                    </p>
                  </div>

                  {/* Remind time */}
                  <label className="text-gray-600 font-medium block">
                    Remind At:
                  </label>
                  <div className="flex">
                    <p
                      className="border-solid border-gray-300 border py-2 px-4 w-full mb-4 rounded text-gray-700 overflow-auto max-h-[100px] sm:max-h-[200px]"
                      name="title"
                    >
                      {remindedAt
                        ? format(new Date(remindedAt), "PPPPp")
                        : "----No-Date----"}
                    </p>
                  </div>

                  {/* Description */}
                  <label className="text-gray-600 font-medium block">
                    Description:
                  </label>
                  <p
                    className="border-solid border-gray-300 border py-2 px-2 w-full mb-4 rounded text-gray-700 overflow-auto max-h-[200px] sm:max-h-[500px]"
                    name="description"
                  >
                    {description}
                  </p>
                </div>

                {/* Button Choices */}
                <div className="flex gap-16 justify-center my-7">
                  {status === REMINDER_STATUS.ACTIVE ? (
                    <AiOutlineFileDone
                      className="hover:cursor-pointer"
                      color="#6366f1"
                      size={25}
                      onClick={() => moveReminderToPast(sharedReminderDetails)}
                    />
                  ) : (
                    <AiFillCaretUp
                      className="hover:cursor-pointer"
                      size={25}
                      color="green"
                      onClick={() => restoreReminder(sharedReminderDetails)}
                    />
                  )}

                  <AiFillDelete
                    className="hover:cursor-pointer"
                    color="red"
                    size={25}
                    onClick={() => execDeletion(sharedReminderDetails)}
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
