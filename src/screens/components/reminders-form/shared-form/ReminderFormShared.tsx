import { useManageAddSharedReminderFormState } from "../../../../service/reminders-manage-state/manage-add-shared-reminder-form";
import { CloseButton } from "../../../../shared/components/CloseButton";
import { ButtonChoicesReminderForm } from "../sub-components/ButtonChoicesReminderForm";
import { ChooseDateField } from "../sub-components/ChooseDateField";
import { RepeatField } from "../sub-components/RepeatField";
import { TitleDescriptionFields } from "../sub-components/TitleDescriptionFields";
import { AddCollaborators } from "./AddCollaboratorsField";

export const ReminderFormShared = () => {
  const {
    newSharedReminder,
    exitTheForm,
    handleChange,
    setReminderDate,
    saveOrAddReminder,
    searchUser,
    handleDeleteTagOnCurrentUsers,
    handleDeleteTagOnPendingUsers,
    setSearchUser,
    loadingUserBackend,
    filteredData,
    handleSelectUserFromSuggestion,
    t,
  } = useManageAddSharedReminderFormState();

  const {
    title,
    description,
    _id,
    remindedAt,
    repeat,
    groupUsers,
    pendingRequest,
  } = newSharedReminder;

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center overflow-x-hidden overflow-y-auto  mx-4 outline-none focus:outline-none z-50">
        <div className="relative flex flex-col my-6 mx-auto max-w-[800px] border-0 rounded-lg shadow-lg w-full bg-[#1b3663] outline-none sm:w-[60%] focus:outline-none">
          {/* Close reminder */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-2xl font-semibold text-white">
              {_id ? t("edit_shared_reminder") : t("new_shared_reminder")}
            </h3>
            <CloseButton takeAction={() => exitTheForm()} />
          </div>

          {/* Add Users for collaboration */}
          <AddCollaborators
            _id={_id}
            users={groupUsers.editor}
            pendingRequest={pendingRequest}
            handleDeleteTagOnCurrentUsers={handleDeleteTagOnCurrentUsers}
            handleDeleteTagOnPendingUsers={handleDeleteTagOnPendingUsers}
            searchUser={searchUser}
            loadingUserBackend={loadingUserBackend}
            filteredData={filteredData}
            handleSelectUserFromSuggestion={handleSelectUserFromSuggestion}
            setSearchUser={setSearchUser}
            text={t("add_user_shared_reminder")}
          />

          {/* Title and Description of Reminder */}
          <TitleDescriptionFields
            _id={_id}
            title={title}
            handleChange={handleChange}
            description={description}
            textTitle={t("title")}
            textDes={t("desc")}
          />

          {/*Choose date */}
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
