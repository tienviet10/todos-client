import React, { useContext } from "react";
import { AiFillDelete, AiFillEdit, AiOutlineFileDone } from "react-icons/ai";
import { ReminderModalContext } from "../../../service/context/ReminderModalContext";
import {
  MAIN_PAGE_EXAMPLE,
  REMINDER_STATUS,
} from "../../../shared/constant/config";

// When there is no reminders, display this placeholder
export const EmptyListDisplay = () => {
  const { setModalOn } = useContext(ReminderModalContext);
  return (
    <div className="flex flex-col max-w-[800px] w-full mx-auto text-center justify-center pt-4 sm:pt-20">
      <p
        className={`text-application-color font-bold p-2 text-[0.8rem] sm:text-[1.3rem]`}
      >
        WORK SMART AND NOT MISS A THING
      </p>
      <h1 className="md:text-7xl sm:text-6xl text-3xl font-bold md:py-6">
        REMIND ME - REME
      </h1>
      <div className="flex justify-center items-center">
        <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
          Fast and Easy
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 sm:mt-10">
        {MAIN_PAGE_EXAMPLE.map((cart) => (
          <div key={cart._id} className="flex justify-center">
            <div
              className={
                cart.status === REMINDER_STATUS.ACTIVE
                  ? "block p-6 pb-2 rounded-lg shadow-lg bg-white w-full m-4 border-l-4 border-l-green-500"
                  : "block p-6 pb-2 rounded-lg shadow-lg bg-white w-full m-4 border-l-4 border-l-red-500"
              }
            >
              <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                {cart.title}
              </h5>
              <p className="text-gray-700 text-base mb-4">{cart.description}</p>
              <div className="flex gap-6 justify-center mt-7">
                <AiOutlineFileDone
                  disabled
                  className="hover:cursor-default"
                  color="#6366f1"
                  size={25}
                />
                <AiFillEdit
                  disabled
                  className="hover:cursor-default"
                  size={25}
                />
                <AiFillDelete
                  disabled
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
      <p className="text-[20px] mt-10">
        <span className="text-application-color font-semibold">ADD </span> your{" "}
        <span className="text-application-color font-semibold">FIRST </span>
        <span className="text-application-color font-semibold">REMINDER </span>
        below.
      </p>
      <div className="pb-10">
        <button
          onClick={() => setModalOn(true)}
          className={`bg-application-color hover:shadow-lg hover:bg-hover-color w-[200px] rounded-md font-bold my-6 mx-auto py-3 text-white`}
        >
          Add Reminder
        </button>
      </div>
    </div>
  );
};
