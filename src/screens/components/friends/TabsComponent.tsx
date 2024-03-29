import { TabsComponentType } from "../../../shared/types/friends/Friends";

export const TabsComponent:React.FC<TabsComponentType> = ({
  openTab,
  changeTab,
  tabNumber,
  tabName,
}) => {

  return (
    // Tabs at the top for switching in Friends section
    <li className="flex-auto -mb-px mr-2 last:mr-0 text-center">
      <a
        className={
          "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
          (openTab === tabNumber
            ? "text-white bg-application-color"
            : "text-application-color bg-white")
        }
        onClick={(e)=> changeTab(e,tabNumber)}
        data-toggle="tab"
        href={"#link" + tabNumber}
        role="tablist"
      >
        {tabName}
      </a>
    </li>
  );
};
