import { t } from "i18next";
import React from "react";
import { LabelText } from "../../../../shared/components/LabelText";

export const TitleDescriptionFields = ({
  title,
  handleChange,
  description,
  _id,
  textTitle,
  textDes,
}) => {
  return (
    <form className="m-auto mt-3 px-12 w-full">
      <LabelText text={textTitle} />
      <input
        autoFocus={_id ? true : false}
        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-white mt-1 mb-3 bg-[#1b3663]"
        name="title"
        value={title}
        placeholder={t("placeholder_add_reminder")}
        onChange={handleChange("title")}
      />

      <LabelText text={textDes} />
      <textarea
        value={description}
        rows={5}
        className="border-solid border-gray-300 border p-2 w-full rounded text-white resize-none mt-1 bg-[#1b3663]"
        name="description"
        onChange={handleChange("description")}
      />
    </form>
  );
};
