import { classNames } from "../../../shared/components/color-picker/color-choice";
import { UserIconOnReminderType } from "../../../shared/types/reminders-shared-reminders-components/RemindersComponents";

export const UserIconOnReminder:React.FC<UserIconOnReminderType> = ({
  user,
  color,
}) => {
  return user?.picture ? (
    <img
      className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
      src={user?.picture}
      alt="User 2 Profile Icon"
    />
  ) : (
    <div
      className={classNames(
        color,
        "inline-block h-6 w-6 rounded-full ring-2 ring-white"
      )}
    >
      {user?.username?.charAt(0).toUpperCase()}
    </div>
  );
};
