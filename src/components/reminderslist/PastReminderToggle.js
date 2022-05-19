import React, { useState } from "react";
import { PastReminders } from "./PastReminders";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

export const PastReminderToggle = () => {
  const [toglePastReminder, setTogglePastReminder] = useState(false);

  return (
    <div>
      {toglePastReminder ? (
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
            onClick={() => setTogglePastReminder(true)}
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
