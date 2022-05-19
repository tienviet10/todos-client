import React from "react";
import { useRestPastReminder } from "../../service/reminders/pastreminders";
import {
  AiFillDelete,
  AiFillCaretUp,
  //AiOutlineStar,
} from "react-icons/ai";
import moment from "moment";
import Loader from "../shared/Loader";

export const PastReminders = () => {
  const { pastReminders, error, loading, discardRecord } =
    useRestPastReminder();

  if (loading)
    return (
      <div className="mt-10">
        <Loader />
      </div>
    );
  if (error)
    return <div className="mt-10 mx-auto">Something went wrong...</div>;

  return (
    <div>
      {pastReminders && pastReminders.length > 0 ? (
        <>
          <h2 className="max-w-[1240px] w-full mx-auto pt-10 sm:pt-5 text-2xl font-bold px-4">
            Past Reminders:
          </h2>
          <div className="grid sm:grid-cols-3 max-w-[1240px] w-full mx-auto text-center">
            {pastReminders.map((item) => (
              <div
                key={item._id}
                className="flex justify-center"
                onDoubleClick={() => {}}
              >
                <div
                  className={
                    item.status === "active"
                      ? "block px-6 py-2 rounded-lg shadow-lg bg-white w-full m-4 border-l-2 border-l-green-500"
                      : "block px-6 py-2 rounded-lg shadow-lg bg-white w-full m-4 border-l-2 border-l-red-500"
                  }
                >
                  <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                    {item.title}
                  </h5>
                  <p className="text-gray-700 text-base mb-4">
                    {item.description}
                  </p>
                  <div className="flex gap-6 justify-center mt-7">
                    <AiFillCaretUp
                      className="hover:cursor-pointer"
                      size={25}
                      color="green"
                      onClick={() => {}}
                    />
                    <AiFillDelete
                      className="hover:cursor-pointer"
                      color="red"
                      size={25}
                      onClick={() => {
                        discardRecord(item._id);
                      }}
                    />
                  </div>
                  <div className="py-1 px-6 border-t border-gray-300 text-gray-600 mt-4">
                    {moment(item.createdAt).fromNow()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-10 text-center text-xl">No Past reminders!</div>
      )}
    </div>
  );
};
