import { format } from "date-fns";
import React from "react";
import { AiFillCaretUp, AiFillDelete, AiOutlineFileDone } from "react-icons/ai";
import { useManageDisplayDetailRemindersState } from "../../../../service/reminders-manage-state/manage-display-detail-reminders";
import { CloseButton } from "../../../../shared/components/CloseButton";
import LoaderFullscreen from "../../../../shared/components/loading-spinner/LoaderFullscreen";
import { REMINDER_STATUS } from "../../../../shared/constant/config";

export const DetailsForReminders = () => {
  const {
    setDetailOn,
    reminderDetails,
    moveReminderToPast,
    restoreReminder,
    execDeletion,
    t,
  } = useManageDisplayDetailRemindersState();
  const { title, description, remindedAt } = reminderDetails;
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center overflow-x-hidden overflow-y-auto mx-4 outline-none focus:outline-none z-50">
        <div className="relative my-6 mx-auto max-w-[800px] sm:w-[60%] max-h-[75%] shadow-2xl">
          <div className="relative flex flex-col border-0 rounded-lg shadow-lg w-full bg-[#1c3d78] outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold text-white">
                {t("details_reminder")}
              </h3>
              <CloseButton takeAction={() => setDetailOn(false)} />
            </div>

            {/*body*/}
            {title === "" && description === "" ? (
              <LoaderFullscreen />
            ) : (
              <>
                <div className="m-auto py-5 px-12 w-full">
                  {/* Title */}
                  <label className="text-white font-medium">{t("title")}</label>
                  <div className="flex">
                    <p
                      className="border-solid border-gray-300 border mr-2 py-2 px-4 w-full rounded text-white overflow-auto max-h-[100px] sm:max-h-[200px]"
                      name="title"
                    >
                      {title}
                    </p>
                  </div>

                  {/* Remind time */}
                  <label className="text-white font-medium block mt-4">
                    {t("remind_at")}
                  </label>
                  <div className="flex">
                    <p
                      className="border-solid border-gray-300 border mr-2 py-2 px-4 w-full rounded text-white overflow-auto max-h-[100px] sm:max-h-[200px]"
                      name="title"
                    >
                      {remindedAt
                        ? format(new Date(remindedAt), "PPPPp")
                        : "----No-Date----"}
                    </p>
                  </div>

                  {/* Description */}
                  <label className="text-white font-medium block mt-4">
                    {t("desc")}
                  </label>
                  <p
                    className="border-solid border-gray-300 border py-2 px-2 w-full rounded text-white overflow-auto max-h-[200px] sm:max-h-[500px]"
                    name="description"
                  >
                    {description}
                  </p>
                </div>

                {/* Button Choices */}
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
