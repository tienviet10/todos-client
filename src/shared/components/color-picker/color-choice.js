import { COLOR_LIST } from "../../constant/config";

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const returnAppropriateBgColor = (itemColor) => {
  return itemColor === COLOR_LIST.blue
    ? "bg-blue-100"
    : itemColor === COLOR_LIST.red
    ? "bg-red-100"
    : itemColor === COLOR_LIST.orange
    ? "bg-orange-100"
    : itemColor === COLOR_LIST.yellow
    ? "bg-yellow-100"
    : itemColor === COLOR_LIST.lime
    ? "bg-lime-100"
    : itemColor === COLOR_LIST.purple
    ? "bg-purple-100"
    : itemColor === COLOR_LIST.pink
    ? "bg-pink-100"
    : "bg-white";
};

export const returnAppropriateBtnColor = (itemColor) => {
  return itemColor === COLOR_LIST.blue
    ? "bg-blue-300"
    : itemColor === COLOR_LIST.red
    ? "bg-red-300"
    : itemColor === COLOR_LIST.orange
    ? "bg-orange-300"
    : itemColor === COLOR_LIST.yellow
    ? "bg-yellow-300"
    : itemColor === COLOR_LIST.lime
    ? "bg-lime-300"
    : itemColor === COLOR_LIST.purple
    ? "bg-purple-300"
    : itemColor === COLOR_LIST.pink
    ? "bg-pink-300"
    : "bg-slate-200";
};
