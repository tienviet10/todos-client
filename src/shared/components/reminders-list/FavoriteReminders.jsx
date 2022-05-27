import { format, formatDistance } from "date-fns";
import React, { useContext } from "react";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillStar,
  AiOutlineFileDone,
} from "react-icons/ai";
import { ConfirmationContext } from "../../../service/context/ConfirmationToProceedContext";
import { DetailOfAReminderContext } from "../../../service/context/DetailOfAReminderContext";
import { ModalContext } from "../../../service/context/ModalContext";
import { PastRemindersContext } from "../../../service/context/PastRemindersContext";
import { ReminderContext } from "../../../service/context/ReminderContext";
import { REMINDER_STATUS } from "../../constant/config";
import { classNames, returnAppropriateBgColor } from "./color-choice";
import { ColorSelectionDropdown } from "./ColorSelectionDropdown";

export const FavoriteReminders = () => {
  const { allReminders, updateRecord, discardRecord } =
    useContext(ReminderContext);
  const { setModalOn, setNewReminder } = useContext(ModalContext);
  const { addRecordFromActive } = useContext(PastRemindersContext);
  const { setReminderDetails, setDetailOn } = useContext(
    DetailOfAReminderContext
  );
  const { confirm } = useContext(ConfirmationContext);

  const editStatus = (item) => {
    item.status === REMINDER_STATUS.ACTIVE
      ? updateRecord({ ...item, status: REMINDER_STATUS.INACTIVE }, false)
      : updateRecord({ ...item, status: REMINDER_STATUS.ACTIVE }, false);
    //updateRecord(item, false);
  };

  const editFavorite = (item) => {
    //item.favorite = false;
    updateRecord({ ...item, favorite: false }, false);
  };

  const handleDetailsScreen = (item) => {
    setReminderDetails(item);
    setDetailOn(true);
  };

  const execDeletion = (itemId) => {
    confirm({
      onSuccess: () => discardRecord(itemId),
    });
  };

  const editReminder = (item) => {
    setModalOn(true);
    setNewReminder({
      title: item.title,
      description: item.description,
      status: REMINDER_STATUS.ACTIVE,
      favorite: item.favorite,
      remindedAt: item.remindedAt ? new Date(item.remindedAt) : null,
      _id: item._id,
    });
  };

  const moveReminderToPast = (item) => {
    editStatus(item);
    addRecordFromActive(item);
  };

  const saveNewChosenColor = (e, item) => {
    updateRecord({ ...item, color: e.target.value }, false);
  };

  return (
    <div>
      {allReminders && allReminders.length > 0 && (
        <>
          <h2 className="max-w-[1240px] w-full mx-auto pt-4 sm:pt-5 text-2xl font-bold px-4">
            Favorites:
          </h2>
          <div className="grid sm:grid-cols-3 max-w-[1240px] w-full mx-auto text-center">
            {allReminders
              .filter((item) => item.favorite)
              .map((item) => (
                <div
                  key={item._id}
                  className="flex justify-center"
                  onDoubleClick={() => moveReminderToPast(item)}
                >
                  <div
                    className={classNames(
                      returnAppropriateBgColor(item.color),
                      "block px-6 py-3 rounded-lg shadow-lg bg-white w-full m-4 border-l-4 border-l-green-500"
                    )}
                  >
                    <div className="flex w-full items-center justify-between">
                      <ColorSelectionDropdown
                        item={item}
                        saveNewChosenColor={saveNewChosenColor}
                      />
                      <h5
                        className="text-gray-900 text-xl leading-tight font-medium mb-2 truncate px-10 max-w-[180px] sm:max-w-[330px]"
                        onClick={() => handleDetailsScreen(item)}
                      >
                        {item.title}
                      </h5>
                      <AiFillStar
                        className="hover:cursor-pointer"
                        size={25}
                        onClick={() => editFavorite(item)}
                      />
                    </div>
                    <div
                      className="font-medium mb-8 text-sm"
                      onClick={() => handleDetailsScreen(item)}
                    >
                      {"("}
                      <span>
                        {item.remindedAt
                          ? format(new Date(item.remindedAt), "PPPPp")
                          : "----No-Date----"}
                      </span>
                      {")"}
                    </div>
                    <div className="w-full flex justify-center mb-4">
                      <p
                        className="text-gray-700 text-base px-6 truncate max-w-[180px] sm:max-w-[280px]"
                        onClick={() => handleDetailsScreen(item)}
                      >
                        {item.description}
                      </p>
                    </div>
                    <div className="flex gap-6 justify-center mt-8">
                      <AiOutlineFileDone
                        className="hover:cursor-pointer"
                        color="#6366f1"
                        size={25}
                        onClick={() => moveReminderToPast(item)}
                      />
                      <AiFillEdit
                        className="hover:cursor-pointer"
                        size={25}
                        onClick={() => editReminder(item)}
                      />
                      <AiFillDelete
                        className="hover:cursor-pointer"
                        color="red"
                        size={25}
                        onClick={() => execDeletion(item._id)}
                      />
                    </div>
                    <div className="py-1 px-6 border-t border-gray-300 text-gray-600 mt-4">
                      {formatDistance(Date.parse(item.createdAt), new Date(), {
                        addSuffix: true,
                      })}
                      {/* {moment(item.createdAt).fromNow()} */}
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

// import { formatDistance } from "date-fns";
// import React, { useContext } from "react";
// import {
//   AiFillDelete,
//   AiFillEdit,
//   AiFillStar,
//   AiOutlineFileDone,
// } from "react-icons/ai";
// import { ConfirmationContext } from "../../../service/context/ConfirmationToProceedContext";
// import { DetailOfAReminderContext } from "../../../service/context/DetailOfAReminderContext";
// import { ModalContext } from "../../../service/context/ModalContext";
// import { PastRemindersContext } from "../../../service/context/PastRemindersContext";
// import { ReminderContext } from "../../../service/context/ReminderContext";
// import { REMINDER_STATUS } from "../../constant/config";

// export const FavoriteReminders = () => {
//   const { favoriteReminders, updateRecord, discardRecord } =
//     useContext(ReminderContext);
//   const { setModalOn, setNewReminder } = useContext(ModalContext);
//   const { addRecordFromActive } = useContext(PastRemindersContext);
//   const { setReminderDetails, setDetailOn } = useContext(
//     DetailOfAReminderContext
//   );
//   const { confirm } = useContext(ConfirmationContext);

//   const editStatus = (item) => {
//     item.status === REMINDER_STATUS.ACTIVE
//       ? updateRecord({ ...item, status: REMINDER_STATUS.INACTIVE }, false)
//       : updateRecord({ ...item, status: REMINDER_STATUS.ACTIVE }, false);
//     //updateRecord(item, false);
//   };

//   const editFavorite = (item) => {
//     //item.favorite = false;
//     updateRecord({ ...item, favorite: false }, false);
//   };

//   const handleDetailsScreen = (item) => {
//     setReminderDetails(item);
//     setDetailOn(true);
//   };

//   const execDeletion = (itemId) => {
//     confirm({
//       onSuccess: () => discardRecord(itemId),
//     });
//   };

//   const editReminder = (item) => {
//     setModalOn(true);
//     setNewReminder({
//       title: item.title,
//       description: item.description,
//       status: REMINDER_STATUS.ACTIVE,
//       favorite: item.favorite,
//       _id: item._id,
//     });
//   };

//   const moveReminderToPast = (item) => {
//     editStatus(item);
//     addRecordFromActive(item);
//   };

//   return (
//     <div>
//       {favoriteReminders && favoriteReminders.length > 0 && (
//         <>
//           <h2 className="max-w-[1240px] w-full mx-auto pt-4 sm:pt-5 text-2xl font-bold px-4">
//             Favorites:
//           </h2>
//           <div className="grid sm:grid-cols-3 max-w-[1240px] w-full mx-auto text-center">
//             {favoriteReminders.map((item) => (
//               <div
//                 key={item._id}
//                 className="flex justify-center"
//                 onDoubleClick={() => moveReminderToPast(item)}
//               >
//                 <div className="block px-6 py-2 rounded-lg shadow-lg bg-white w-full m-4 border-l-4 border-l-green-500">
//                   <AiFillStar
//                     className="hover:cursor-pointer float-right mr-[-5%]"
//                     size={25}
//                     onClick={() => editFavorite(item)}
//                   />

//                   <h5
//                     className="text-gray-900 text-xl leading-tight font-medium mb-2 truncate px-10 max-w-[300px] sm:max-w-[330px]"
//                     onClick={() => handleDetailsScreen(item)}
//                   >
//                     {item.title}
//                   </h5>
//                   <p
//                     className="text-gray-700 text-base px-6 mb-4 truncate max-w-[300px] sm:max-w-[330px]"
//                     onClick={() => handleDetailsScreen(item)}
//                   >
//                     {item.description}
//                   </p>
//                   <div className="flex gap-6 justify-center mt-7">
//                     <AiOutlineFileDone
//                       className="hover:cursor-pointer"
//                       color="#6366f1"
//                       size={25}
//                       onClick={() => moveReminderToPast(item)}
//                     />
//                     <AiFillEdit
//                       className="hover:cursor-pointer"
//                       size={25}
//                       onClick={() => editReminder(item)}
//                     />
//                     <AiFillDelete
//                       className="hover:cursor-pointer"
//                       color="red"
//                       size={25}
//                       onClick={() => execDeletion(item._id)}
//                     />
//                   </div>
//                   <div className="py-1 px-6 border-t border-gray-300 text-gray-600 mt-4">
//                     {formatDistance(Date.parse(item.createdAt), new Date(), {
//                       addSuffix: true,
//                     })}
//                     {/* {moment(item.createdAt).fromNow()} */}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };
