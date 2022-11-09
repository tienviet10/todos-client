import React from "react";
import { useTranslation } from "react-i18next";

const Benefits: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="experience bg-[#020917] h-[71rem] sm:h-[55rem] pt-[14rem] sm:pt-[18rem] mt-[-10rem] relative z-[2] rounded-b-[5rem]">
      <div className="flex flex-col max-w-[1100px] w-full mx-auto items-center justify-center">
        {/* title icon */}
        <img src="images/squiggly_line.png" alt="" className="w-[5rem]" />
        {/* heading */}
        <div className="headline mt-7 flex flex-col gap-1 items-center px-1 text-[1rem] sm:text-[2rem] text-center">
          <span>{t("second_intro_1")}</span>
          <span>
            <b>{t("app_name")}</b>
          </span>
        </div>
        {/* features  */}
        <div className="feature flex flex-col sm:flex-row items-center justify-around mt-[4rem] sm:mt-[6rem] w-[100%]">
          <div className="feature flex items-center justify-center flex-col relative text-center mx-12">
            {/* icon */}
            <div className="icon bg-[#081730] rounded-2xl p-4">
              <img src="images/personal_main.png" alt="" className="w-[3rem]" />
            </div>

            <span className="mt-5">{t("personal")}</span>

            <span className="text-[#707070] mt-4">{t("personal_intro")}</span>
          </div>
          <div className="feature flex items-center justify-center flex-col relative text-center mx-12 mt-[3rem] sm:mt-0">
            {/* icon */}
            <div className="icon bg-[#081730] rounded-2xl p-4">
              <img src="images/team_main.png" alt="" className="w-[3rem]" />
            </div>

            <span className="mt-5">{t("group")}</span>

            <span className="text-[#707070] mt-4">{t("group_intro")}</span>
          </div>
          <div className="feature flex items-center justify-center flex-col relative text-center mx-12 mt-[3rem] sm:mt-0">
            {/* icon */}
            <div className="icon bg-[#081730] rounded-2xl p-4">
              <img src="images/family_main.png" alt="" className="w-[3rem]" />
            </div>

            <span className="mt-5">{t("family")}</span>

            <span className="text-[#707070] mt-4">{t("family_intro")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
