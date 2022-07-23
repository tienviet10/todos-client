import React from "react";

export const TabsComponent = ({ openTab, changeTab, tabNumber, tabName }) => {
  return (
    // Tabs at the top for switching in Friends section
    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
      <a
        className={
          "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
          (openTab === tabNumber
            ? "text-white bg-application-color"
            : "text-application-color bg-white")
        }
        onClick={changeTab(tabNumber)}
        data-toggle="tab"
        href={"#link" + tabNumber}
        role="tablist"
      >
        {tabName}
      </a>
    </li>
  );
};
