import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
  const SocialStyle =
    "rounded-full border-2 border-whit p-2 hover:cursor-pointer";
  return (
    <div className="flex flex-col items-center justify-start px-[5rem] bg-[#020917] h-[45rem] pt-[18rem] mt-[-10rem]">
      <div className="flex flex-col max-w-[1100px] w-full mx-auto text-center justify-center">
        {/* <CenterMenu /> */}
        {/* Social icons */}
        <p className="text-[1.5rem]">Contact Me : </p>
        <div className="flex w-[100%] justify-center space-x-10 mt-10">
          <a
            className={SocialStyle}
            href="https://github.com/tienviet10/todos-client/"
          >
            <AiFillGithub size={30} />
          </a>{" "}
          <a
            className={SocialStyle}
            href="https://www.linkedin.com/in/viettran94/"
          >
            <AiFillLinkedin size={30} />
          </a>
        </div>
        {/* detail */}
        <span className="text-[1rem] text-gray-400 px-[15rem] text-center mt-[4rem]">
          Copyright &copy;2022. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
