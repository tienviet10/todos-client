import { format } from "date-fns";
import React, { useContext } from "react";
import { DetailOfAReminderContext } from "../../../service/context/DetailOfAReminderContext";
import { SevenDaysSummaryContext } from "../../../service/context/SevenDaysSummaryContext";
import { CloseButton } from "../../../shared/components/CloseButton";
import {
  classNames,
  returnAppropriateBgColor,
} from "../../../shared/components/color-picker/color-choice";

export const SevenDaysSummary = () => {
  const { setIsSummaryOn, sevenDaysReminders } = useContext(
    SevenDaysSummaryContext
  );

  const { setReminderDetails, setDetailOn } = useContext(
    DetailOfAReminderContext
  );

  const handleDetailsScreen = (item) => {
    setReminderDetails(item);
    setDetailOn(true);
  };

  const todayReminders = sevenDaysReminders.filter(
    (item) =>
      new Date(item.remindedAt) <= new Date(new Date().setHours(23, 59, 59))
  );

  const remindersInTheNextSevenDays = sevenDaysReminders.filter(
    (item) =>
      new Date(item.remindedAt) > new Date(new Date().setHours(23, 59, 59))
  );

  return (
    <div>
      <div className="fixed inset-0 flex justify-center items-center overflow-x-hidden overflow-y-auto outline-none mx-4 mb-10 focus:outline-none sm:mb-6 z-40">
        <div className="relative my-6 mx-auto max-w-[1000px] w-[90%] sm:w-[80%] max-h-[90%]">
          <div className="relative bg-[#1b3663] rounded-lg shadow">
            {/* Title and close button */}
            <div className="flex justify-between items-start p-4 rounded-t border-b border-gray-600">
              <h3 className="text-xl font-semibold text-white">
                Seven Days Summary
              </h3>
              <CloseButton takeAction={() => setIsSummaryOn(false)} />
            </div>

            <div className="p-6 text-white">
              {/* Today reminders */}
              <div>
                <div className="font-semibold">Today: </div>
                <section className="container px-6 p-2 mx-auto">
                  <div className="grid gap-6 mb-4 md:grid-cols-2 lg:grid-cols-4">
                    {todayReminders.length > 0 ? (
                      todayReminders.map((record) => (
                        <div
                          key={record._id}
                          className={classNames(
                            record.color
                              ? returnAppropriateBgColor(record.color)
                              : "bg-white",
                            record.color ? "border-1" : "border-2 black",
                            "flex flex-col items-center justify-center px-4 py-1 rounded-lg shadow-sm hover:cursor-pointer"
                          )}
                          onClick={() => handleDetailsScreen(record)}
                        >
                          <p className="mb-2 text-sm font-medium text-gray-900 ">
                            {record.title}
                          </p>
                          <p className="text-sm font-normal text-gray-500">
                            {format(new Date(record.remindedAt), "p")}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-base text-gray-700">
                        No Reminders Today!
                      </p>
                    )}
                  </div>
                </section>
              </div>

              {/* Next week reminders */}
              <div>
                <div className="font-semibold">This week: </div>
                <section className="container px-6 p-2 mx-auto">
                  <div className="grid gap-6 mb-4 md:grid-cols-2 lg:grid-cols-4">
                    {remindersInTheNextSevenDays.length > 0 ? (
                      remindersInTheNextSevenDays.map((record) => (
                        <div
                          key={record._id}
                          className={classNames(
                            record.color
                              ? returnAppropriateBgColor(record.color)
                              : "bg-white",
                            record.color ? "border-1" : "border-2",
                            "flex flex-col items-center justify-center px-4 py-1 rounded-lg shadow-sm hover:cursor-pointer"
                          )}
                          onClick={() => handleDetailsScreen(record)}
                        >
                          <p className="mb-2 text-sm font-medium text-gray-900">
                            {record.title}
                          </p>
                          <p className="text-sm font-normal text-gray-500">
                            {format(new Date(record.remindedAt), "eeee")}
                          </p>
                          <p className="text-sm font-normal text-gray-500">
                            {format(new Date(record.remindedAt), "LLL d")}
                          </p>
                          <p className="text-sm font-normal text-gray-500">
                            At {format(new Date(record.remindedAt), "p")}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-base leading-relaxed text-[#cbced4]">
                        No Reminders
                      </p>
                    )}
                  </div>
                </section>
              </div>
            </div>

            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className={`bg-application-color text-white font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none mr-1 mb-1 focus:outline-none hover:shadow-lg hover:bg-hover-color ease-linear transition-all duration-150`}
                type="button"
                onClick={() => setIsSummaryOn(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-30 bg-black"></div>
    </div>
  );
};
