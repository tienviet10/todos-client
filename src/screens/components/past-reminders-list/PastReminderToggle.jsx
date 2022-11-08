import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { PastRemindersContext } from "../../../service/context/PastRemindersContext";
import { PastReminders } from "./PastReminders";

export const PastReminderToggle = () => {
  const { t } = useTranslation();
  const { isPastRemindersOn, setIsPastRemindersOn } =
    useContext(PastRemindersContext);

  return (
    <div className="pb-10">
      {isPastRemindersOn ? (
        <div className="grid max-w-[1240px] w-full mx-auto text-left pb-10">
          <div
            className="flex gap-2 text-xl mx-auto text-center text-blue-600 font-bold pt-0 hover:cursor-pointer sm:pt-10"
            onClick={() => setIsPastRemindersOn(false)}
          >
            <p>{t("close_past_reminders")}</p>
            <div className="my-auto">
              <AiOutlineArrowUp size={23} />
            </div>
          </div>
          <PastReminders />
        </div>
      ) : (
        <div className="grid max-w-[500px] w-full mx-auto text-center pb-10">
          <div
            className="flex gap-2 text-xl mx-auto text-center text-blue-600 font-bold pt-0 hover:cursor-pointer sm:pt-10"
            onClick={() => {
              setIsPastRemindersOn(true);
            }}
          >
            <p>{t("open_past_reminders")}</p>
            <div className="my-auto">
              <AiOutlineArrowDown size={23} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
