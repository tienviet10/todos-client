export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const returnAppropriateBgColor = (itemColor) => {
  return itemColor === "blue"
    ? "bg-blue-100"
    : itemColor === "red"
    ? "bg-red-100"
    : itemColor === "orange"
    ? "bg-orange-100"
    : itemColor === "yellow"
    ? "bg-yellow-100"
    : itemColor === "lime"
    ? "bg-lime-100"
    : itemColor === "purple"
    ? "bg-purple-100"
    : itemColor === "pink"
    ? "bg-pink-100"
    : "bg-white";
};

export const returnAppropriateBtnColor = (itemColor) => {
  return itemColor === "blue"
    ? "bg-blue-300"
    : itemColor === "red"
    ? "bg-red-300"
    : itemColor === "orange"
    ? "bg-orange-300"
    : itemColor === "yellow"
    ? "bg-yellow-300"
    : itemColor === "lime"
    ? "bg-lime-300"
    : itemColor === "purple"
    ? "bg-purple-300"
    : itemColor === "pink"
    ? "bg-pink-300"
    : "bg-slate-200";
};
