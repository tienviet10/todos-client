import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useManageAddReminderFormState } from "../../../../service/reminders-manage-state/manage-add-reminder-form";
import { CloseButton } from "../../../../shared/components/CloseButton";
import { LabelText } from "../../../../shared/components/LabelText";
import { ButtonChoicesReminderForm } from "../sub-components/ButtonChoicesReminderForm";
import { ChooseDateField } from "../sub-components/ChooseDateField";
import { RepeatField } from "../sub-components/RepeatField";

export const ReminderFormMain = () => {
  const {
    newReminder,
    exitTheForm,
    handleChange,
    favorite,
    handleFavoriteChange,
    setReminderDate,
    saveOrAddReminder,
    t,
  } = useManageAddReminderFormState();
  const { title, description, _id, remindedAt, repeat } = newReminder;

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center overflow-x-hidden overflow-y-auto mx-4 outline-none focus:outline-none z-50">
        <div className="relative flex flex-col my-6 mx-auto max-w-[800px] sm:w-[60%] border-0 rounded-lg shadow-lg w-full bg-[#1b3663] outline-none focus:outline-none">
          {/* Close reminder */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-2xl font-semibold text-white">
              {_id ? t("edit_reminder") : t("new_reminder")}
            </h3>
            <CloseButton takeAction={() => exitTheForm()} />
          </div>

          {/* Add title and description */}
          <form className="m-auto mt-3 px-12 w-full">
            <LabelText text={t("title")} />
            <div className="flex mb-3">
              <input
                className="border-solid border-gray-300 border mr-2 py-2 px-4 w-full rounded text-white bg-[#1b3663]"
                name="title"
                value={title}
                placeholder={t("placeholder_add_reminder")}
                autoFocus
                onChange={handleChange}
                autoComplete="off"
              />
              {favorite ? (
                <AiFillStar
                  className="hover:cursor-pointer float-right mr-[-1%] my-auto"
                  size={25}
                  color="#ffffff"
                  onClick={() => handleFavoriteChange()}
                />
              ) : (
                <AiOutlineStar
                  className="hover:cursor-pointer float-right mr-[-1%] my-auto"
                  size={25}
                  color="#ffffff"
                  onClick={() => handleFavoriteChange()}
                />
              )}
            </div>

            <LabelText text={t("desc")} />
            <textarea
              value={description}
              rows={5}
              className="border-solid border-gray-300 border py-2 px-2 w-full rounded text-white resize-none bg-[#1b3663]"
              name="description"
              onChange={handleChange}
            />
          </form>

          {/*Choose date for desktop*/}
          <ChooseDateField
            setReminderDate={setReminderDate}
            remindedAt={remindedAt}
            text={t("remind_at")}
          />

          {/*Choose type of repeat*/}
          <RepeatField
            repeat={repeat}
            handleChange={handleChange}
            text={t("repeated")}
          />

          {/* Button Choices */}
          <ButtonChoicesReminderForm
            exitTheForm={exitTheForm}
            saveOrAddReminder={saveOrAddReminder}
            _id={_id}
          />
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
