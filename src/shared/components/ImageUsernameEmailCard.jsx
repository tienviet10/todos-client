import React from "react";

export const ImageUsernameEmailCard = ({
  username,
  picture,
  email,
  children,
}) => {
  return (
    <div className="bg-white p-4 shadow-lg rounded-md mt-4">
      <div className="flex items-center">
        <img
          src={
            picture && picture !== ""
              ? picture
              : "images/600_background_image.jpg"
          }
          alt=""
          className="w-12 h-12 rounded-full"
        />
        <div className="flex items-start justify-between w-full">
          <div className="pl-3 w-full">
            <p className="text-md sm:text-xl font-medium leading-5 text-gray-800 truncate max-w-[160px] sm:max-w-[220px]">
              {username}
            </p>
            <p className="text-xs sm:text-sm leading-normal pt-2 text-gray-500 truncate max-w-[160px] sm:max-w-[220px]">
              {email}
            </p>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};
