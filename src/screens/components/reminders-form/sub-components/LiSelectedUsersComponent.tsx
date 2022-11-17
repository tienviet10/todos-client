import { AiFillDelete } from "react-icons/ai";
import { classNames } from "../../../../shared/components/color-picker/color-choice";
import { LiSelectedUsersComponentType } from "../../../../shared/types/reminders-form/ReminderForm";

export const LiSelectedUsersComponent:React.FC<LiSelectedUsersComponentType> = ({
  indexToDelete,
  username,
  handleDeleteTags,
  color,
} ) => {
  return (
    <li
      //className="flex flex-shrink-0 w-auto h-[22px] items-center justify-center text-white rounded-md mr-3 bg-application-color"
      className={classNames(
        color,
        "flex flex-shrink-0 w-auto h-[22px] items-center justify-center text-white rounded-md mr-3"
      )}
    >
      <div className="px-2">{username}</div>
      <div
        className={
          "flex h-[22px] hover:cursor-pointer rounded-r-md bg-red-400 px-1"
        }
        onClick={() => handleDeleteTags(indexToDelete)}
      >
        <AiFillDelete size={15} className="my-auto" />
      </div>
    </li>
  );
};
