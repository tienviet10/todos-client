import { format, formatDistance } from "date-fns";
import { AiFillDelete, AiFillEdit, AiOutlineFileDone } from "react-icons/ai";
import { IoRepeatOutline } from "react-icons/io5";
import {
  classNames,
  returnAppropriateBgColor,
} from "../../../shared/components/color-picker/color-choice";
import { ColorSelectionDropdown } from "../../../shared/components/color-picker/ColorSelectionDropdown";

export const SharedRemindersList = ({
  title,
  remindersList,
  moveReminderToPast,
  saveNewChosenColor,
  handleDetailsScreen,
  editReminder,
  execDeletion,
}) => {
  return (
    <>
      {remindersList.length > 0 && (
        <div className="mb-2">
          {/* Reminders */}
          <h2 className="max-w-[1240px] w-full mx-auto pt-4 sm:pt-5 text-2xl font-bold px-4">
            {title}:
          </h2>
          <div className="grid sm:grid-cols-3 max-w-[1240px] w-full mx-auto text-center">
            {remindersList.map((item) => (
              // Card
              <div
                key={item._id}
                className="flex justify-center"
                onDoubleClick={() => moveReminderToPast(item)}
              >
                <div
                  className={classNames(
                    returnAppropriateBgColor(item.color),
                    "block px-6 py-3 rounded-lg shadow-lg bg-white w-full m-4 border-l-4 border-l-green-500 "
                  )}
                >
                  <div className="flex w-full items-center justify-between mb-2">
                    {/* Color choice for reminders */}
                    <ColorSelectionDropdown
                      item={item}
                      saveNewChosenColor={saveNewChosenColor}
                    />

                    {/* Reminder title */}
                    <div
                      className="text-gray-900 text-xl font-medium truncate max-w-[180px] sm:max-w-[200px] mx-auto text-center"
                      onClick={() => handleDetailsScreen(item)}
                    >
                      {item.title}
                    </div>

                    {/* Icons of shared people */}
                    <div className="w-5"></div>
                  </div>

                  <div onClick={() => handleDetailsScreen(item)}>
                    {/* Date time of the reminder */}
                    <div className="font-medium text-sm text-gray-500">
                      {item.remindedAt
                        ? format(new Date(item.remindedAt), "PPPP")
                        : "----No-Date----"}
                    </div>

                    {/* Repeat Icon if the reminder is on repeat */}
                    <div className="flex justify-center font-medium mb-5 text-sm h-4 text-gray-500">
                      {item.remindedAt &&
                        format(new Date(item.remindedAt), "p")}
                      <div className="ml-2 text-center">
                        {item.remindedAt &&
                          item.repeat &&
                          item.repeat !== "none" && (
                            <IoRepeatOutline className="inline-block align-text-bottom text-black" />
                          )}
                      </div>
                    </div>

                    {/* Reminder description */}
                    <div className="flex w-full justify-center mb-4">
                      <p className="text-gray-700 text-base px-6 truncate max-w-[180px] sm:max-w-[280px]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Button choice (done, edit, delete) */}
                  <div className="flex gap-6 justify-center mt-8">
                    <AiOutlineFileDone
                      className="hover:cursor-pointer"
                      color="#6366f1"
                      size={25}
                      onClick={() => moveReminderToPast(item)}
                    />
                    <AiFillEdit
                      className="hover:cursor-pointer"
                      size={25}
                      onClick={() => editReminder(item)}
                    />
                    <AiFillDelete
                      className="hover:cursor-pointer"
                      color="red"
                      size={25}
                      onClick={() => execDeletion(item._id)}
                    />
                  </div>

                  {/* Time Elapse since the reminder was created */}
                  <div className="py-1 px-6 border-t border-gray-300 mt-4">
                    {formatDistance(Date.parse(item.createdAt), new Date(), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
