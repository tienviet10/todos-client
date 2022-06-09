import React from "react";
import { RemindersList } from "./RemindersList";

export const MainReminders = ({ ...props }) => {
  return <RemindersList title="Reminders" {...props} />;
};

///-----------------------------------------------------------------------------------

// import React from "react";
// import { useManageRemindersState } from "./manage-reminders-state";
// import { RemindersList } from "./RemindersList";

// export const MainReminders = ({ mainRemindersList }) => {
//   const {
//     editFavorite,
//     handleDetailsScreen,
//     execDeletion,
//     moveReminderToPast,
//     editReminder,
//     saveNewChosenColor,
//   } = useManageRemindersState();

//   return (
//     <RemindersList
//       title="Reminders"
//       remindersList={mainRemindersList}
//       moveReminderToPast={moveReminderToPast}
//       saveNewChosenColor={saveNewChosenColor}
//       handleDetailsScreen={handleDetailsScreen}
//       editFavorite={editFavorite}
//       editReminder={editReminder}
//       execDeletion={execDeletion}
//     />
//   );
// };

///-----------------------------------------------------------------------------------

// import { format, formatDistance } from "date-fns";
// import React, { useContext } from "react";
// import {
//   AiFillDelete,
//   AiFillEdit,
//   AiOutlineFileDone,
//   AiOutlineStar,
// } from "react-icons/ai";
// import { IoRepeatOutline } from "react-icons/io5";
// import { ConfirmationContext } from "../../../service/context/ConfirmationToProceedContext";
// import { DetailOfAReminderContext } from "../../../service/context/DetailOfAReminderContext";
// import { ModalContext } from "../../../service/context/ModalContext";
// import { ReminderContext } from "../../../service/context/ReminderContext";
// import { REMINDER_STATUS } from "../../constant/config";
// import { reminderWithIDLink } from "../../service-link/url-link";
// import { classNames, returnAppropriateBgColor } from "./color-choice";
// import { ColorSelectionDropdown } from "./ColorSelectionDropdown";

// export const MainReminders = ({ mainRemindersList }) => {
//   const {
//     updateRecord,
//     discardRecord: discardRecordActiveReminder,
//   } = useContext(ReminderContext);
//   const { setModalOn, setNewReminder } = useContext(ModalContext);
//   const { setReminderDetails, setDetailOn } = useContext(
//     DetailOfAReminderContext
//   );
//   const { confirm } = useContext(ConfirmationContext);

//   const editFavorite = (item, favVal) => {
//     updateRecord({
//       from: "current",
//       url: reminderWithIDLink(item._id),
//       data: { ...item, favorite: favVal },
//     });
//   };

//   const handleDetailsScreen = (item) => {
//     setReminderDetails(item);
//     setDetailOn(true);
//   };

//   const execDeletion = (itemId) => {
//     confirm({
//       onSuccess: () => discardRecordActiveReminder(reminderWithIDLink(itemId)),
//     });
//   };

//   const moveReminderToPast = (item) => {
//     updateRecord({
//       from: "currentToPast",
//       url: reminderWithIDLink(item._id),
//       data: { ...item, status: REMINDER_STATUS.INACTIVE },
//     });
//   };

//   const editReminder = (item) => {
//     setNewReminder({
//       title: item.title,
//       repeat: item.repeat,
//       description: item.description,
//       color: item.color,
//       status: REMINDER_STATUS.ACTIVE,
//       favorite: item.favorite,
//       remindedAt: item.remindedAt ? new Date(item.remindedAt) : null,
//       _id: item._id,
//     });
//     setModalOn(true);
//   };

//   const saveNewChosenColor = (color, item) => {
//     updateRecord({
//       from: "current",
//       url: reminderWithIDLink(item._id),
//       data: { ...item, color: color },
//     });
//   };

//   //const mainRemindersList = allReminders.filter((item) => !item.favorite);

//   return (
//     <>
//       {mainRemindersList.length > 0 && (
//         <div>
//           <h2 className="max-w-[1240px] w-full mx-auto pt-4 sm:pt-5 text-2xl font-bold px-4">
//             Reminders:
//           </h2>
//           <div className="grid sm:grid-cols-3 max-w-[1240px] w-full mx-auto text-center">
//             {mainRemindersList.map((item) => (
//               <div
//                 key={item._id}
//                 className="flex justify-center"
//                 onDoubleClick={() => moveReminderToPast(item)}
//               >
//                 <div
//                   className={classNames(
//                     returnAppropriateBgColor(item.color),
//                     "block px-6 py-3 rounded-lg shadow-lg bg-white w-full m-4 border-l-4 border-l-green-500 "
//                   )}
//                 >
//                   <div className="flex w-full items-center justify-between mb-2">
//                     <ColorSelectionDropdown
//                       item={item}
//                       saveNewChosenColor={saveNewChosenColor}
//                     />
//                     <div
//                       className="text-gray-900 text-xl font-medium truncate max-w-[180px] sm:max-w-[330px]"
//                       onClick={() => handleDetailsScreen(item)}
//                     >
//                       {item.title}
//                     </div>
//                     <AiOutlineStar
//                       className="hover:cursor-pointer"
//                       size={25}
//                       onClick={() => editFavorite(item, true)}
//                     />
//                   </div>
//                   <div
//                     className="font-medium text-sm text-gray-500"
//                     onClick={() => handleDetailsScreen(item)}
//                   >
//                     {item.remindedAt
//                       ? format(new Date(item.remindedAt), "PPPP")
//                       : "----No-Date----"}
//                   </div>
//                   <div
//                     className="flex justify-center font-medium mb-5 text-sm h-4 text-gray-500"
//                     onClick={() => handleDetailsScreen(item)}
//                   >
//                     {item.remindedAt && format(new Date(item.remindedAt), "p")}
//                     <div className="ml-2 text-center">
//                       {item.remindedAt &&
//                         item.repeat &&
//                         item.repeat !== "none" && (
//                           <IoRepeatOutline className="inline-block align-text-bottom text-black" />
//                         )}
//                     </div>
//                   </div>
//                   <div className="w-full flex justify-center mb-4">
//                     <p
//                       className="text-gray-700 text-base px-6 truncate max-w-[180px] sm:max-w-[280px]"
//                       onClick={() => handleDetailsScreen(item)}
//                     >
//                       {item.description}
//                     </p>
//                   </div>

//                   <div className="flex gap-6 justify-center mt-8">
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

//                   <div className="py-1 px-6 border-t border-gray-300 mt-4">
//                     {formatDistance(Date.parse(item.createdAt), new Date(), {
//                       addSuffix: true,
//                     })}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

///-----------------------------------------------------------------------------------

// import { formatDistance } from "date-fns";
// import React, { useContext } from "react";
// import {
//   AiFillDelete,
//   AiFillEdit,
//   AiOutlineFileDone,
//   AiOutlineStar,
// } from "react-icons/ai";
// import { ConfirmationContext } from "../../../service/context/ConfirmationToProceedContext";
// import { DetailOfAReminderContext } from "../../../service/context/DetailOfAReminderContext";
// import { ModalContext } from "../../../service/context/ModalContext";
// import { PastRemindersContext } from "../../../service/context/PastRemindersContext";
// import { ReminderContext } from "../../../service/context/ReminderContext";
// import { REMINDER_STATUS } from "../../constant/config";

// export const MainReminders = () => {
//   const { reminders, updateRecord, discardRecord } =
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
//   };

//   const editFavorite = (item) => {
//     updateRecord({ ...item, favorite: true }, false);
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

//   const moveReminderToPast = (item) => {
//     editStatus(item);
//     addRecordFromActive(item);
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

//   return (
//     <>
//       {reminders && reminders.length > 0 && (
//         <div>
//           <h2 className="max-w-[1240px] w-full mx-auto pt-4 sm:pt-5 text-2xl font-bold px-4">
//             Reminders:
//           </h2>
//           <div className="grid sm:grid-cols-3 max-w-[1240px] w-full mx-auto text-center">
//             {reminders.map((item) => (
//               <div
//                 key={item._id}
//                 className="flex justify-center"
//                 onDoubleClick={() => moveReminderToPast(item)}
//               >
//                 <div className="block px-6 py-2 rounded-lg shadow-lg bg-white w-full m-4 border-l-4 border-l-green-500">
//                   <AiOutlineStar
//                     className="hover:cursor-pointer float-right mr-[-5%]"
//                     size={25}
//                     onClick={() => editFavorite(item)}
//                   />

//                   <h5
//                     className="text-gray-900 text-xl font-medium mb-2 truncate max-w-[300px] sm:max-w-[330px]"
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
//                   {/* <select id="nname" className="mt-4">
//                   <option value="volvo">Volvo</option>
//                   <option value="saab">Saab</option>
//                   <option value="mercedes">Merc</option>
//                   <option value="audi">Audi</option>
//                 </select> */}
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
//         </div>
//       )}
//     </>
//   );
// };
