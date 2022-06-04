import React, { useContext, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { PastRemindersContext } from "../../../service/context/PastRemindersContext";
import { PastReminders } from "./PastReminders";

export const PastReminderToggle = () => {
  const [togglePastReminder, setTogglePastReminder] = useState(false);
  const { refetchPastReminders } = useContext(PastRemindersContext);

  return (
    <div>
      {togglePastReminder ? (
        <div className="grid max-w-[1240px] w-full mx-auto text-left pb-10">
          <div
            className="flex gap-2 text-xl hover:cursor-pointer mx-auto text-center text-blue-600 font-bold pt-0 sm:pt-10"
            onClick={() => setTogglePastReminder(false)}
          >
            <p>Close Past Reminders</p>
            <div className="my-auto">
              <AiOutlineArrowUp size={23} />
            </div>
          </div>
          <PastReminders />
        </div>
      ) : (
        <div className="grid max-w-[500px] w-full mx-auto text-center pb-10">
          <div
            className="flex gap-2 text-xl hover:cursor-pointer mx-auto text-center text-blue-600 font-bold pt-0 sm:pt-10"
            onClick={() => {
              refetchPastReminders();
              setTogglePastReminder(true);
            }}
          >
            <p>Open Past Reminders</p>
            <div className="my-auto">
              <AiOutlineArrowDown size={23} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
