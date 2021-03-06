import React from "react";
import { AiFillDelete, AiFillEdit, AiOutlineFileDone } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  MAIN_PAGE_EXAMPLE,
  NAV_TABS,
  REMINDER_STATUS,
} from "../shared/constant/config";

export const Landing = () => {
  const navigate = useNavigate();
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
      <p className="text-[20px] mt-10">Join ReMe today!</p>

      <button
        onClick={() => navigate(NAV_TABS[5].href)}
        className={`bg-red-500 hover:shadow-lg hover:bg-red-600 w-[200px] rounded-md font-bold mt-10 mb-3 mx-auto py-3 text-white`}
      >
        SIGN UP
      </button>

      <div className="text-center cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 pb-10 mx-auto">
        <p onClick={() => navigate(NAV_TABS[6].href)}>
          Already have an account!
        </p>
      </div>
    </div>
  );
};
