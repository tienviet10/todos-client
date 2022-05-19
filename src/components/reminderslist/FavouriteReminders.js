import React, { useContext } from "react";
import { ModalContext } from "../../service/context/ModalContext";
import { ReminderContext } from "../../service/context/ReminderContext";
import moment from "moment";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineFileDone,
  //AiOutlineStar,
  AiFillStar,
} from "react-icons/ai";

export const FavouriteReminders = () => {
  const { favoriteReminders, discardRecord, updateRecord } =
    useContext(ReminderContext);
  const { setModalOn, setNewReminder } = useContext(ModalContext);

  const editStatus = (item) => {
    const currentStatus = item.status;
    currentStatus === "active"
      ? (item.status = "deactive")
      : (item.status = "active");
    updateRecord(item);
  };

  const editFavorite = (item) => {
    item.favorite = false;
    updateRecord(item);
  };

  return (
    <div>
      {favoriteReminders && favoriteReminders.length > 0 && (
        <>
          <h2 className="max-w-[1240px] w-full mx-auto pt-4 sm:pt-5 text-2xl font-bold px-4">
            Favourites:
          </h2>
          <div className="grid sm:grid-cols-3 max-w-[1240px] w-full mx-auto text-center">
            {favoriteReminders &&
              favoriteReminders.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-center"
                  onDoubleClick={() => editStatus(item)}
                >
                  <div
                    className={
                      item.status === "active"
                        ? "block px-6 py-2 rounded-lg shadow-lg bg-white w-full m-4 border-l-2 border-l-green-500"
                        : "block px-6 py-2 rounded-lg shadow-lg bg-white w-full m-4 border-l-2 border-l-red-500"
                    }
                  >
                    <AiFillStar
                      className="hover:cursor-pointer float-right mr-[-5%]"
                      size={25}
                      onClick={() => editFavorite(item)}
                    />

                    <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                      {item.title}
                    </h5>
                    <p className="text-gray-700 text-base mb-4">
                      {item.description}
                    </p>
                    <div className="flex gap-6 justify-center mt-7">
                      <AiOutlineFileDone
                        className="hover:cursor-pointer"
                        color="#6366f1"
                        size={25}
                        onClick={() => editStatus(item)}
                      />
                      <AiFillEdit
                        className="hover:cursor-pointer"
                        size={25}
                        onClick={() => {
                          setModalOn(true);
                          setNewReminder({
                            title: item.title,
                            description: item.description,
                            status: "active",
                            favorite: item.favorite,
                            _id: item._id,
                          });
                        }}
                      />
                      <AiFillDelete
                        className="hover:cursor-pointer"
                        color="red"
                        size={25}
                        onClick={() => discardRecord(item._id)}
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
      )}
    </div>
  );
};
