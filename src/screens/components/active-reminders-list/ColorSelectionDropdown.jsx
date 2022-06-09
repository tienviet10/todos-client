import React, { useState } from "react";
import { TwitterPicker } from "react-color";
import { COLOR_LIST } from "../../../shared/constant/config";
import { classNames, returnAppropriateBtnColor } from "./color-choice";

export const ColorSelectionDropdown = ({ item, saveNewChosenColor }) => {
  const [isColorPickerOn, setIsColorPickerOn] = useState(false);

  return (
    <div className="static">
      <div
        className={classNames(
          returnAppropriateBtnColor(item.color),
          "rounded-full w-5 h-5"
        )}
        onClick={() => setIsColorPickerOn((prev) => !prev)}
      ></div>
      {isColorPickerOn && (
        <div className="absolute mt-0.5 ml-0 max-w-[200px]">
          <TwitterPicker
            colors={[
              COLOR_LIST.blue,
              COLOR_LIST.red,
              COLOR_LIST.orange,
              COLOR_LIST.yellow,
              COLOR_LIST.lime,
              COLOR_LIST.purple,
              COLOR_LIST.pink,
              COLOR_LIST.white,
            ]}
            onChangeComplete={(e) => {
              saveNewChosenColor(e.hex, item);
              setIsColorPickerOn(false);
            }}
          />
        </div>
      )}
    </div>

    // <select
    //   id="colorChoice"
    //   className={classNames(
    //     returnAppropriateBtnColor(item.color),
    //     "rounded-full appearance-none w-[25px] h-[25px]"
    //   )}
    //   onChange={(e) => saveNewChosenColor(e, item)}
    //   value={item.color ?? "white"}
    // >
    //   <option value="white" className="bg-white"></option>
    //   <option value="blue" className="bg-blue-100"></option>
    //   <option value="red" className="bg-red-100"></option>
    //   <option value="orange" className="bg-orange-100"></option>
    //   <option value="yellow" className="bg-yellow-100"></option>
    //   <option value="lime" className="bg-lime-100"></option>
    //   <option value="purple" className="bg-purple-100"></option>
    //   <option value="pink" className="bg-pink-100"></option>
    // </select>
  );
};
