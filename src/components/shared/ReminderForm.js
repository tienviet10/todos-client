import React, { useContext, useState } from "react";
import { ModalContext } from "../../service/context/ModalContext";
import { ReminderContext } from "../../service/context/ReminderContext";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const ReminderForm = ({ selectedTab }) => {
  const { addRecord, updateRecord } = useContext(ReminderContext);
  const { newReminder, setNewReminder, setModalOn } = useContext(ModalContext);
  const { title, description, _id, favorite: favFromEdit } = newReminder;

  const [favorite, setFavorite] = useState(favFromEdit);

  const handleFavoriteChange = () => {
    setNewReminder({
      ...newReminder,
      favorite: !favorite,
    });
    setFavorite(!favorite);
  };

  const handleChange = (name) => (e) => {
    setNewReminder({
      ...newReminder,
      [name]: e.target.value,
    });
  };

  return (
    <div>
      {selectedTab && selectedTab === "Reminder" ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-4">
            <div className="relative my-6 mx-auto max-w-[1000px] sm:w-[30%]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">New Reminder</h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    data-modal-toggle="defaultModal"
                    onClick={() => setModalOn(false)}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                {/*body*/}

                <form className="m-auto py-5 px-12 w-full">
                  <label className="text-gray-600 font-medium">Title</label>
                  <div className="flex">
                    <input
                      className="border-solid border-gray-300 border mr-2 py-2 px-4 w-full rounded text-gray-700"
                      name="title"
                      value={title}
                      placeholder="Shopping List, etc."
                      autoFocus
                      onChange={handleChange("title")}
                    />
                    {favorite ? (
                      <AiFillStar
                        className="hover:cursor-pointer float-right mr-[-1%] my-auto"
                        size={25}
                        onClick={() => handleFavoriteChange()}
                      />
                    ) : (
                      <AiOutlineStar
                        className="hover:cursor-pointer float-right mr-[-1%] my-auto"
                        size={25}
                        onClick={() => handleFavoriteChange()}
                      />
                    )}
                  </div>

                  <label className="text-gray-600 font-medium block mt-4">
                    Description
                  </label>
                  <textarea
                    value={description}
                    rows={5}
                    className="border-solid border-gray-300 border py-2 px-2 w-full rounded text-gray-700"
                    name="description"
                    onChange={handleChange("description")}
                  />
                </form>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setNewReminder({
                        title: "",
                        description: "",
                        status: "active",
                        favorite: false,
                        _id: "",
                      });
                      setModalOn(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className={`bg-application-color hover:bg-hover-color text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type="button"
                    onClick={(e) => {
                      newReminder._id === ""
                        ? addRecord(newReminder)
                        : updateRecord(newReminder, false);
                      setNewReminder({
                        title: "",
                        description: "",
                        status: "active",
                        favorite: false,
                        _id: "",
                      });
                      setModalOn(false);
                    }}
                  >
                    {_id ? "Save Reminder" : "Add Reminder"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : selectedTab === "Share" ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-4">
            <div className="relative my-6 mx-auto max-w-[1000px] sm:w-[30%]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Share Reminder</h3>
                </div>
                {/*body*/}

                <form className="m-auto py-5 px-12 w-full">
                  <label className="text-gray-600 font-medium">Title</label>
                  <input
                    className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                    name="title"
                    value={title}
                    placeholder="Shopping List, etc."
                    autoFocus
                    // onChange={handleChange("title")}
                  />
                  <label className="text-gray-600 font-medium block mt-4">
                    Description
                  </label>
                  <textarea
                    value={description}
                    rows={5}
                    className="border-solid border-gray-300 border py-2 px-2 w-full rounded text-gray-700"
                    name="description"
                    // onChange={handleChange("description")}
                  />
                </form>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      // setNewReminder({
                      //   title: "",
                      //   description: "",
                      //   status: "active",
                      //   _id: "",
                      // });
                      setModalOn(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className={`bg-application-color hover:bg-hover-color text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type="button"
                    onClick={(e) => {
                      // newReminder._id === ""
                      //   ? addRecord(newReminder)
                      //   : updateRecord(newReminder);
                      // setModalOn(false);
                    }}
                  >
                    {_id ? "Save Reminder" : "Add Reminder"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        <div>Hi</div>
      )}
    </div>
  );
};

export default ReminderForm;
