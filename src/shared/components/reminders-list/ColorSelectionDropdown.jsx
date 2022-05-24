import React from "react";
import { classNames, returnAppropriateBtnColor } from "./color-choice";

export const ColorSelectionDropdown = ({ item, saveNewChosenColor }) => {
  return (
    <select
      id="colorChoice"
      className={classNames(
        returnAppropriateBtnColor(item.color),
        "rounded-full appearance-none w-[25px] h-[25px]"
      )}
      onChange={(e) => saveNewChosenColor(e, item)}
      value={item.color ? item.color : "white"}
    >
      <option value="white" className="bg-white"></option>
      <option value="blue" className="bg-blue-100"></option>
      <option value="red" className="bg-red-100"></option>
      <option value="orange" className="bg-orange-100"></option>
      <option value="yellow" className="bg-yellow-100"></option>
      <option value="lime" className="bg-lime-100"></option>
      <option value="purple" className="bg-purple-100"></option>
      <option value="pink" className="bg-pink-100"></option>
    </select>
  );
};
