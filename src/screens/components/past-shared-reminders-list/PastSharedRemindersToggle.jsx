import React, { useContext } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { PastSharedRemindersContext } from "../../../service/context/PastSharedRemindersContext";
import { PastSharedReminders } from "./PastSharedReminders";

export const PastSharedRemindersToggle = () => {
  const { isPastSharedRemindersOn, setIsPastSharedRemindersOn } = useContext(
    PastSharedRemindersContext
  );

  return (
    <div className="pb-10">
      {isPastSharedRemindersOn ? (
        <div className="grid max-w-[1240px] w-full mx-auto text-left pb-10">
          <div
            className="flex gap-2 text-xl hover:cursor-pointer mx-auto text-center text-blue-600 font-bold pt-0 sm:pt-10"
            onClick={() => setIsPastSharedRemindersOn(false)}
          >
            <p>Close Past Reminders</p>
            <div className="my-auto">
              <AiOutlineArrowUp size={23} />
            </div>
          </div>
          <PastSharedReminders />
        </div>
      ) : (
        <div className="grid max-w-[500px] w-full mx-auto text-center pb-10">
          <div
            className="flex gap-2 text-xl hover:cursor-pointer mx-auto text-center text-blue-600 font-bold pt-0 sm:pt-10"
            onClick={() => {
              setIsPastSharedRemindersOn(true);
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
