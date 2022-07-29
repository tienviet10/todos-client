import React from "react";
import { LabelText } from "../../../../shared/components/LabelText";

export const TitleDescriptionFields = ({
  title,
  handleChange,
  description,
  _id,
}) => {
  return (
    <form className="m-auto mt-3 px-12 w-full">
      <LabelText text="Title:" />
      <input
        autoFocus={_id ? true : false}
        className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700 mt-1 mb-3"
        name="title"
        value={title}
        placeholder="Shopping List, etc."
        onChange={handleChange("title")}
      />

      <LabelText text="Description:" />
      <textarea
        value={description}
        rows={5}
        className="border-solid border-gray-300 border p-2 w-full rounded text-gray-700 resize-none mt-1"
        name="description"
        onChange={handleChange("description")}
      />
    </form>
  );
};
