import DateTimePicker from "react-datetime-picker";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useManageAddReminderFormState } from "../../../service/reminders-manage-state/manage-add-reminder-form";
import { CloseButton } from "../../../shared/components/CloseButton";

export const ReminderFormMain = () => {
  const {
    newReminder,
    exitTheForm,
    handleChange,
    favorite,
    handleFavoriteChange,
    setReminderDate,
    saveOrAddReminder,
  } = useManageAddReminderFormState();
  const { title, description, _id, remindedAt, repeat } = newReminder;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-4">
        <div className="relative my-6 mx-auto max-w-[800px] sm:w-[60%]">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">
                {_id ? "Edit Reminder" : "New Reminder"}
              </h3>
              <CloseButton takeAction={() => exitTheForm()} />
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
                className="border-solid border-gray-300 border py-2 px-2 w-full rounded text-gray-700 resize-none"
                name="description"
                onChange={handleChange("description")}
              />
            </form>

            {/*Choose date for desktop*/}
            <div className="flex flex-col px-12 text-gray-600 font-medium">
              <p>Remind At:</p>
              <DateTimePicker
                className="z-80"
                disableClock
                minDate={new Date()}
                onChange={setReminderDate}
                value={remindedAt}
                name="remindedAt"
              />
            </div>

            {/*Choose type of repeat*/}
            <div className="block px-12 mb-5 py-2">
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <span className="mr-3">Repeated: </span>
                  <select
                    id="repeat"
                    value={repeat}
                    onChange={handleChange("repeat")}
                  >
                    <option value="none">None</option>
                    <option value="HOURLY">Hourly</option>
                    <option value="DAILY">Daily</option>
                    <option value="WEEKLY">Weekly</option>
                    <option value="MONTHLY">Monthly</option>
                    <option value="YEARLY">Yearly</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Button Choices */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => exitTheForm()}
              >
                Close
              </button>
              <button
                className={`bg-application-color hover:bg-hover-color text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                type="button"
                onClick={(e) => saveOrAddReminder()}
              >
                {_id ? "Save Reminder" : "Add Reminder"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
