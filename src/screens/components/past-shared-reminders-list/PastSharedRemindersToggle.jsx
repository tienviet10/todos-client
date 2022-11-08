import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { PastSharedRemindersContext } from "../../../service/context/PastSharedRemindersContext";
import { PastSharedReminders } from "./PastSharedReminders";

export const PastSharedRemindersToggle = () => {
  const { isPastSharedRemindersOn, setIsPastSharedRemindersOn } = useContext(
    PastSharedRemindersContext
  );
  const { t } = useTranslation();

  return (
    <div className="pb-10">
      {isPastSharedRemindersOn ? (
        <div className="grid max-w-[1240px] w-full mx-auto text-left pb-10">
          <div
            className="flex gap-2 text-xl hover:cursor-pointer mx-auto text-center text-blue-600 font-bold pt-0 sm:pt-10"
            onClick={() => setIsPastSharedRemindersOn(false)}
          >
            <p>{t("close_past_reminders")}</p>
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
