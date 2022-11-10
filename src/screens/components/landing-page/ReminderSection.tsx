import React from "react";
import { useTranslation } from "react-i18next";
import { AiFillDelete, AiFillEdit, AiOutlineFileDone } from "react-icons/ai";
import {
  MAIN_PAGE_EXAMPLE,
  REMINDER_STATUS,
} from "../../../shared/constant/config";

const ReminderSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="relative h-[60rem] bg-[#081730] pt-[22rem] sm:pt-[16rem] pb-[7rem] mt-[-15rem] z-[1] flex items-center justify-between rounded-b-[5rem]">
      <div className="flex flex-col max-w-[1100px] w-full mx-auto items-center text-center justify-center pt-0 sm:pt-20">
        {/* title icon */}
        <img src="images/squiggly_line.png" alt="" className="w-[5rem]" />
        {/* heading */}
        <div className="headline mt-7 mb-10 flex flex-col items-center text-[1.2rem] sm:text-[2rem] px-1">
          <span>{t("third_intro_1")}</span>
          <span>
            <b>{t("third_intro_2")}</b>
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 sm:mt-10 w-[80%]">
          {MAIN_PAGE_EXAMPLE.map((cart) => (
            <div key={cart._id} className="flex justify-center">
              <div
                className={
                  cart.status === REMINDER_STATUS.ACTIVE
                    ? "block p-6 pb-2 rounded-lg shadow-lg bg-[#93c5fd] w-full m-4 border-l-4 border-l-green-500"
                    : "block p-6 pb-2 rounded-lg shadow-lg bg-[#d8b4fe] w-full m-4 border-l-4 border-l-red-500"
                }
              >
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                  {cart.title}
                </h5>
                <p className="text-gray-700 text-base mb-4">
                  {cart.description}
                </p>
                <div className="flex gap-6 justify-center mt-7">
                  <AiOutlineFileDone
                    className="hover:cursor-default"
                    color="#6366f1"
                    size={25}
                  />
                  <AiFillEdit
                    className="hover:cursor-default"
                    color="black"
                    size={25}
                  />
                  <AiFillDelete
                    className="hover:cursor-default"
                    color="red"
                    size={25}
                  />
                </div>
                <div className="py-1 px-6 border-t border-gray-300 text-gray-600 mt-4">
                  {cart.days}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReminderSection;
