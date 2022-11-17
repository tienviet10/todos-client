import { format, formatDistance } from "date-fns";
import { AiFillDelete, AiFillEdit, AiOutlineFileDone } from "react-icons/ai";
import { IoRepeatOutline } from "react-icons/io5";
import {
  classNames,
  returnAppropriateBgColor,
} from "../../../shared/components/color-picker/color-choice";
import { ColorSelectionDropdown } from "../../../shared/components/color-picker/ColorSelectionDropdown";
import { SharedReminder } from "../../../shared/types/Reminder";
import { UserData } from "../../../shared/types/User";
import { UserIconOnReminder } from "./UserIconOnReminder";

export const SharedRemindersList = ({
  title,
  remindersList,
  moveReminderToPast,
  saveNewChosenColor,
  handleDetailsScreen,
  editReminder,
  execDeletion,
  user,
}: {
  title: string;
  remindersList: SharedReminder[];
  moveReminderToPast: (item: SharedReminder) => void;
  saveNewChosenColor: (color: string, item: SharedReminder) => void;
  handleDetailsScreen: (item: SharedReminder) => void;
  editReminder: (item: SharedReminder) => void;
  execDeletion: (itemId: string) => void;
  user: UserData;
}) => {
  return (
    <>
      {remindersList.length > 0 && (
        <div className="mb-2">
          {/* Reminders */}
          <h2 className="max-w-[1240px] w-full mx-auto pt-4 sm:pt-5 text-2xl font-bold px-4 text-white">
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
                    returnAppropriateBgColor(item?.color as string),
                    "relative block px-6 py-3 rounded-lg shadow-lg bg-white w-full m-4 border-l-4 border-l-green-500 "
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
                    <div className="absolute right-2 inset-y-3 flex -space-x-3 p-1 overflow-hidden h-8">
                      {item.groupUsers.editor.length > 1 && (
                        <UserIconOnReminder
                          user={item.groupUsers.editor[1]}
                          color="bg-cyan-300"
                        />
                      )}
                      {item.groupUsers.editor.length > 0 && (
                        <UserIconOnReminder
                          user={item.groupUsers.editor[0]}
                          color="bg-lime-300"
                        />
                      )}
                      {user?.user && (
                        <UserIconOnReminder
                          user={user?.user}
                          color="bg-rose-300"
                        />
                      )}
                    </div>

                    {/* Keep title center */}
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
                      onClick={() => execDeletion(item?._id as string)}
                    />
                  </div>

                  {/* Time Elapse since the reminder was created */}
                  <div className="py-1 px-6 border-t border-gray-300 mt-4">
                    {formatDistance(
                      Date.parse(item?.createdAt as string),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
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
